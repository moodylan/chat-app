# 💬 Chat Now!

A simple chat app built with React, Firebase Firestore, and Firebase Authentication.

Users can sign in with Google, send messages, and chat live with others in real time.

> 🚀 [Live Demo](https://chat-app-ce41b.web.app)

---

## 🔧 Features

- ✅ Google Sign-In via Firebase Authentication
- ✅ Real-time messaging using Firestore
- ✅ Profanity filter using `bad-words`
- ✅ Responsive UI with message bubbles
- ✅ Firebase Hosting deployment

---

## 🛠 Tech Stack

- React (Create React App)
- Firebase Firestore
- Firebase Auth
- `bad-words` for content filtering

---

## 📁 Getting Started (Local Dev)

1. Clone the repo
git clone https://github.com/moodylan/chat-app.git
cd chat-app

2. Install dependencies
npm install

3. Create a .env file in the root and add your Firebase config:
REACT_APP_API_KEY=...
REACT_APP_AUTH_DOMAIN=...
REACT_APP_PROJECT_ID=...
REACT_APP_STORAGE_BUCKET=...
REACT_APP_MESSAGING_SENDER_ID=...
REACT_APP_APP_ID=...
REACT_APP_MEASUREMENT_ID=...

4. Run the app locally:
npm start

## 📦 Build & Deploy
npm run build
firebase deploy --only hosting