# Orbit AI 🪐

**Orbit AI** is a robust, full-stack AI chat platform built with the MERN stack. It features a sleek dark-mode UI, persistent chat history, real-time AI responses powered by Gemini 2.0 Flash, and custom user personalization.

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-blue)
![Gemini AI](https://img.shields.io/badge/AI-Gemini%202.0%20Flash-orange)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4)

---

## 🚀 Live Demo

Check out the live application running in production:

- **Frontend (Client):** [https://orbit-ai-woad.vercel.app](https://orbit-ai-woad.vercel.app)
- **Backend (Server):** [https://orbit-ai-pj3j.onrender.com](https://orbit-ai-pj3j.onrender.com)

---

## ✨ Features

### 🤖 AI Chat Experience
- **Intelligent Conversations:** Powered by Google's **Gemini 2.0 Flash** model for fast and accurate responses.
- **Context Awareness:** The AI remembers previous messages in the conversation for a seamless flow.
- **Markdown Support:** Renders rich text including tables, lists, and bold text.
- **Syntax Highlighting:** Professional code block formatting with **VS Code style** coloring.

### 👤 User Features
- **Secure Authentication:** Complete Sign Up & Login system using **JWT**.
- **Chat History:** All conversations are saved to **MongoDB** and can be revisited or deleted.
- **Custom Wallpapers:** Users can upload custom background images (powered by **Cloudinary**).
- **Responsive Design:** Fully optimized for Desktop, Tablet, and Mobile devices.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS (Styling)
- React Markdown & Syntax Highlighter
- React Router DOM
- Context API (State Management)

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT) for Authentication
- BcryptJS (Password Hashing)
- Google Generative AI SDK

**DevOps & Deployment:**
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas
- **Storage:** Cloudinary

---

## 🔧 Environment Variables

To run this project locally, you will need to add the following environment variables to your `.env` file in the `server` folder:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_google_ai_studio_key
```

## 💻 Run Locally

**1. Clone the repository**
```bash
git clone [https://github.com/YOUR_USERNAME/orbit-ai.git](https://github.com/YOUR_USERNAME/orbit-ai.git)
cd orbit-ai
```

**2. Install Dependencies**
```bash
# Install Backend dependencies
cd server
npm install

# Install Frontend dependencies
cd ../client
npm install
```

**3. Configure Frontend**
Open client/src/config.js and ensure it points to your local server:
```bash
const config = {
  API_URL: "http://localhost:5000/api",
  // ... your cloudinary keys
};
```

**4. Start the Application**
```bash
Terminal 1 (Backend):
cd server
npm run dev

Terminal 2 (Frontend):
cd client
npm run dev
```

**5. Access the App**
```bash
Open your browser and navigate to:
http://localhost:5173
```