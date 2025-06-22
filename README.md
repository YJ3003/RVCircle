# 🎓 RVCircle - Academic Collaboration Made Simple

> **The peer-learning platform RVCE students actually want to use**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-rv--circle.vercel.app-blue?style=for-the-badge)](https://rv-circle.vercel.app)

[![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## 🚀 What is RVCircle?

RVCircle is a **full-stack peer-learning platform** designed specifically for RVCE students to collaborate, share doubts, and work together on projects. Think of it as a modern, student-friendly forum that actually understands what college life is like.

**🎯 Core Mission:** Create a centralized hub where students can get real help from real peers, without the hassle of outdated LMS systems or scattered WhatsApp groups.

---

## ✨ Features That Actually Matter

### 🔐 **Smart Authentication**
- Clean email + password signup with **NextAuth.js**
- Collects relevant student info: name, branch, LinkedIn profile
- Secure session management with MongoDB storage

### 💬 **Intelligent Discussion System**
- **Academic Doubts** and **Project Discussions** in separate sections
- **Nested commenting system** (replies to replies, just like Reddit)
- Real-time optimistic UI - comments appear instantly
- User profiles show **name**, **branch**, and **LinkedIn** for easy networking

### 🧠 **AI-Powered Summarization** *(The Cool Part)*
- Hit "Summarize Comments" on any discussion thread
- Custom Flask backend processes all nested comments
- Get a clean, readable summary of the entire conversation
- Perfect for catching up on long discussions quickly

### 👤 **Personal Dashboard**
- Edit your profile info on the fly
- Track your contributions and engagement
- Clean, minimal interface that doesn't get in your way

### 🎨 **Modern UI/UX**
- Dark theme that's easy on the eyes during late-night study sessions
- Fully responsive - works great on laptop and mobile
- Built with **TailwindCSS** and **shadcn/ui** for that clean, professional look

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | Next.js 13+, TypeScript, TailwindCSS, shadcn/ui, Zustand |
| **Backend** | Node.js (Next.js API routes), Flask (AI Services) |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | NextAuth.js |
| **Deployment** | Vercel (Frontend), Render (Flask API) |
| **State Management** | Zustand for global state |

---

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Python 3.8+ (for Flask AI service)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YJ3003/RVCircle.git
   cd RVCircle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with:
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   # Add other required environment variables
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` and start collaborating! 🎉

---

## 📱 Screenshots

*Coming soon - we're working on making the README even more visual!*

---

## 🔮 What's Coming Next

- 🔍 **Smart search** for finding specific doubts and discussions
- 🏷️ **Tag-based filtering** to organize content better
- 📎 **Media attachments** for sharing screenshots, diagrams, and files
- 🔔 **Real-time notifications** when someone replies to your posts
- 📊 **Analytics dashboard** for tracking platform usage
- 🧑‍🏫 **Faculty integration** with verified badges and read-only access

---

## 🤝 Contributing

We'd love your help making RVCircle even better! Here's how you can contribute:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Areas where we'd love help:
- 🎨 UI/UX improvements and animations
- 🔧 Performance optimizations
- 🧪 Testing and quality assurance
- 📝 Documentation and tutorials
- 🌐 Accessibility improvements

---

## 👨‍💻 Built By

**[YJ3003](https://github.com/YJ3003)** - *Full-stack development, AI integration, and overall architecture*

---

## 🙏 Acknowledgments

- RVCE student community for inspiration and feedback
- The open-source community for amazing tools and libraries
- Everyone who believes in making education more collaborative and accessible

---

**⭐ If RVCircle helped you or you think it's cool, consider giving it a star!**

---

*Made with ❤️ for the RVCE community*
