
# 🌟 Telegram Bot with Welcome Message and Interaction 🌟

This project is a simple and interactive Telegram bot built with Node.js. It welcomes new users with a personalized message and allows users to ask questions or interact with the bot.

---

## 📋 Features

- Sends a **beautiful welcome message** to new users.
- Responds to text messages with personalized replies.
- **Interactive commands** such as `/start` for a guided introduction.
- Built using the **Telegram Bot API** with the `node-telegram-bot-api` library.
- Highly customizable for further functionality.

---

## 🛠️ Setup and Installation

Follow these steps to set up the bot on your local machine:

### **1. Clone the Repository**
```bash
git clone https://github.com/your-repo/telegram-bot.git
cd telegram-bot
```

### **2. Install Dependencies**
Ensure you have Node.js installed, then run:
```bash
npm install
```

### **3. Create a `.env` File**
Add a `.env` file in the project root with the following content:
```env
YOUR_BOT_TOKEN=your-telegram-bot-token
```
Replace `your-telegram-bot-token` with the API token you received from [BotFather](https://core.telegram.org/bots#botfather).

### **4. Start the Bot**
Run the bot using:
```bash
npm start
```

---

## 🚀 How to Use

### **Start the Bot**
1. Open your Telegram app.
2. Search for your bot using its username.
3. Type `/start` to see a beautiful welcome message.

### **Interact with the Bot**
- Send any text, and the bot will reply with a personalized response.
- Modify the code to add more commands and features!

---

## 🧩 Code Structure

- **`index.js`**: Main bot logic.
- **`.env`**: Stores the bot token securely.
- **`package.json`**: Manages dependencies and scripts.

---

## 🌟 Example Messages

### **Welcome Message for New Users**
```
🌟 Hello, John Doe!

My name is YourBotName, and I'm here to assist you with anything you need. You can ask me questions, get information, or just chat with me anytime! 😊

How can I help you today?
```

### **Response to Text**
```
Hello, John! You said: "What's the weather today?"
```

---

## 🛠️ Customization

1. **Modify Welcome Message**: Update the `welcomeMessage` variable in `index.js` to change how the bot greets users.
2. **Add More Commands**: Use `bot.onText()` to define new commands.
3. **Extend Functionality**: Integrate APIs (e.g., weather, news, etc.) for more dynamic responses.

---

## 📚 Resources

- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [node-telegram-bot-api Library](https://github.com/yagop/node-telegram-bot-api)
- [Node.js Official Documentation](https://nodejs.org/en/docs/)

---

## ❤️ Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request. For major changes, open an issue to discuss your ideas first.

---

## 📧 Contact

For questions or feedback, contact [Adhnan P](mailto:adhnanusman1234@gamil.com).
