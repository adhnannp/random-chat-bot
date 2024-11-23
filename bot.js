require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.YOUR_BOT_TOKEN, { 
    polling: true, 
});

bot.setMyCommands([
    { command: '/start', description: 'Start a new random chat' },
    { command: '/newchat', description: 'Find a new chat partner' },
    { command: '/end', description: 'End the current chat' },
    { command: '/clear', description: 'Clear all previous messages' },
]);

const seenUsers = new Set();
const waitingQueue = [];
const activeChats = {};

// Respond to the /start command or any message
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;
    const lastName = msg.from.last_name || '';
    const userId = msg.from.id;

    if (!seenUsers.has(userId)) {
        seenUsers.add(userId);

        const welcomeMessage = `
🌟 **Hello, ${firstName} ${lastName ? lastName : ''}!** 🌟

👋 I'm **BE RIGHT**, your friendly **random chat bot**!  
I'm here to connect you with someone random for casual and fun conversations. 🎉  

📌 **A few important notes:**
1️⃣ This is a **random chat bot** for entertainment purposes only.  
2️⃣ **Never share personal information** for your safety. 🚫  
3️⃣ Use these commands to navigate:
   - **/start**: Start a new random chat session 🔄  
   - **/newchat**: Exit the current chat and find a new partner 🔁  
   - **/end**: End the random chat session ❌  

✨ **Let’s start chatting!** Type /start to find a partner. 😊
        `;

        bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
    }
});

// Handle /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    if (activeChats[chatId]) {
        bot.sendMessage(chatId, "❗ You're already in a chat! Type /end to leave or /newchat to find a new partner.");
        return;
    }

    if (waitingQueue.length > 0) {
        const partnerId = waitingQueue.shift();
        activeChats[chatId] = partnerId;
        activeChats[partnerId] = chatId;

        bot.sendMessage(chatId, "🎉 You've been connected! Say hi to your chat partner.");
        bot.sendMessage(partnerId, "🎉 You've been connected! Say hi to your chat partner.");
    } else {
        waitingQueue.push(chatId);
        bot.sendMessage(chatId, "⌛ Waiting for a chat partner... Please hold on.");
    }
});

// Handle /newchat
bot.onText(/\/newchat/, (msg) => {
    const chatId = msg.chat.id;

    if (activeChats[chatId]) {
        const partnerId = activeChats[chatId];
        delete activeChats[chatId];
        delete activeChats[partnerId];

        bot.sendMessage(chatId, "🔄 You've exited the current chat. Searching for a new partner...");
        bot.sendMessage(partnerId, "❌ Your partner has left the chat. Type /start to find a new partner.");

        // Automatically add the user back to the queue
        if (waitingQueue.length > 0) {
            const newPartnerId = waitingQueue.shift();
            activeChats[chatId] = newPartnerId;
            activeChats[newPartnerId] = chatId;

            bot.sendMessage(chatId, "🎉 You've been connected with a new partner! Say hi.");
            bot.sendMessage(newPartnerId, "🎉 You've been connected with a new partner! Say hi.");
        } else {
            waitingQueue.push(chatId);
            bot.sendMessage(chatId, "⌛ Waiting for a new chat partner...");
        }
    } else {
        bot.sendMessage(chatId, "❌ You're not in a chat. Type /start to find a partner.");
    }
});

// Forward messages between users
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    if (activeChats[chatId]) {
        const partnerId = activeChats[chatId];
        if (msg.text) {
            bot.sendMessage(partnerId, `💬 ${msg.text}`);
        } else if (msg.sticker) {
            bot.sendSticker(partnerId, msg.sticker.file_id);
        } else if (msg.photo) {
            bot.sendPhoto(partnerId, msg.photo[msg.photo.length - 1].file_id);
        } else if (msg.voice) {
            bot.sendVoice(partnerId, msg.voice.file_id);
        }
    }
});

// Handle /end
bot.onText(/\/end/, (msg) => {
    const chatId = msg.chat.id;

    if (activeChats[chatId]) {
        const partnerId = activeChats[chatId];
        delete activeChats[chatId];
        delete activeChats[partnerId];

        bot.sendMessage(chatId, "❌ Chat ended. Type /start to find a new partner.");
        bot.sendMessage(partnerId, "❌ Your partner has left the chat. Type /start to find a new partner.");
    } else {
        bot.sendMessage(chatId, "❌ You're not in a chat. Type /start to find a partner.");
    }
});

bot.onText(/\/clear/, (msg) => {
    const chatId = msg.chat.id;
    clearMessages(chatId);
});

function clearMessages(chatId) {
    if (userMessages[chatId] && userMessages[chatId].length > 0) {
        userMessages[chatId].forEach((messageId) => {
            bot.deleteMessage(chatId, messageId).catch((err) => {
                console.error(`Failed to delete message ${messageId}:`, err);
            });
        });

        userMessages[chatId] = []; // Clear message history
        bot.sendMessage(chatId, "✅ All previous messages have been cleared.");
    } else {
        bot.sendMessage(chatId, "⚠️ No messages to clear.");
    }
}