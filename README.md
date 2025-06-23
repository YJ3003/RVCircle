# RVCircle - Academic Collaboration Made Simple

> The peer-learning platform RVCE students actually want to use

[![Live Demo](https://img.shields.io/badge/Live%20Demo-rv--circle.vercel.app-blue?style=for-the-badge)](https://rv-circle.vercel.app)

[![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## What is RVCircle?

RVCircle is a full-stack peer-learning platform built specifically for RVCE students. We were tired of scattered WhatsApp groups and outdated LMS systems, so we built something that actually works for how students collaborate today.

**The idea:** Create one place where students can get real help from real peers without jumping between different platforms.

## Features

### Authentication & Profiles
- Simple email/password signup using NextAuth.js
- User profiles include name, branch, and LinkedIn for easy networking
- Secure sessions stored in MongoDB

### Discussion System
- Separate sections for Academic Doubts and Project Discussions  
- Nested commenting system (think Reddit-style replies)
- Comments appear instantly with optimistic UI updates
- Clean interface that shows who's in what branch

### AI Summarization (Our Favorite Feature)
We built a custom Flask backend that can summarize entire discussion threads. Hit "Summarize Comments" and get a clean overview of long conversations - super helpful when you're catching up on discussions you missed.

### Personal Dashboard
- Edit your profile info
- Track your posts and contributions
- Minimal design that stays out of your way

### UI/UX
- Dark theme (because who wants bright white during late-night coding?)
- Works great on both desktop and mobile
- Built with TailwindCSS and shadcn/ui for a clean, professional look

## Tech Stack

**Frontend:** Next.js 13+, TypeScript, TailwindCSS, shadcn/ui, Zustand  
**Backend:** Node.js API routes, Flask for AI services  
**Database:** MongoDB with Mongoose  
**Auth:** NextAuth.js  
**Deployment:** Vercel + Render  

## Getting Started

### You'll need:
- Node.js 18+
- MongoDB (local or Atlas)
- Python 3.8+ for the Flask service

### Setup:

1. **Clone and install**
   ```bash
   git clone https://github.com/YJ3003/RVCircle.git
   cd RVCircle
   npm install
   ```

2. **Environment variables**
   Create `.env.local`:
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_BACKEND_URL=your_backend_website_url
   ```

3. **Run it**
   ```bash
   npm run dev
   ```

4. **Check it out**
   Open `http://localhost:3000`

## What's Next

We're working on some pretty cool stuff:

- **Smart search** - find specific topics and discussions easily
- **Tag-based filtering** - better organization of content  
- **File attachments** - share screenshots, diagrams, code files
- **Real-time notifications** - know when someone replies to your stuff
- **Usage analytics** - see how the platform is being used
- **Faculty integration** - verified badges for professors, read-only access

## Contributing

Want to help make this better? Here's how:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes and commit
4. Push and open a Pull Request

**Areas where we could use help:**
- UI/UX improvements and animations
- Performance optimizations  
- Testing and QA
- Documentation
- Accessibility features

## The Team

**Lead Developer:** [YJ3003](https://github.com/YJ3003)

**Team Members:**
- [zeenat-khan28](https://github.com/zeenat-khan28)
- [yashu-wini](https://github.com/yashu-wini)

This started as a 3-person team project at RVCE and turned into something we're genuinely proud of.

## Thanks

Big thanks to the RVCE student community for all the feedback and ideas. Also shoutout to the open-source community for building the amazing tools that made this possible.

---

**If you find RVCircle useful or think it's cool, consider giving it a star!**

*Built with care for the RVCE community*
