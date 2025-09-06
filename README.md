# URL Shortener

A full-stack URL shortening application built with React, Node.js, Express, and MongoDB.

## 🚀 Quick Deploy for Portfolio/Testing

### Step 1: Backend Deployment (Render.com - Free)

1. **Push your code to GitHub**
2. **Go to [Render.com](https://render.com)** and sign up
3. **Create New Web Service** and connect your GitHub repo
4. **Configure settings:**
   - Root Directory: `BACKEND`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Add Environment Variables:**
   ```
   NODE_ENV=production
   MONGO_URI=
   JWT_SECRET=
   FRONTEND_URL=https://your-app-name.netlify.app
   APP_URL=https://your-backend-name.onrender.com
   ```
6. **Deploy** - Copy the backend URL (e.g., `https://your-backend-name.onrender.com`)

### Step 2: Frontend Deployment (Netlify - Free)

1. **Go to [Netlify](https://netlify.com)** and sign up
2. **Connect your GitHub repo**
3. **Configure build settings:**
   - Base directory: `FRONTEND`
   - Build command: `npm run build`
   - Publish directory: `FRONTEND/dist`
4. **Add Environment Variables in Netlify:**
   ```
   VITE_API_URL=https://your-backend-name.onrender.com
   VITE_APP_URL=https://your-backend-name.onrender.com
   ```
5. **Deploy** - Your app will be live at `https://your-app-name.netlify.app`

### Step 3: Update Backend with Frontend URL

1. **Go back to Render dashboard**
2. **Update the FRONTEND_URL environment variable:**
   ```
   FRONTEND_URL=https://your-app-name.netlify.app
   ```
3. **Redeploy the backend**

## ✅ That's it! Your app is now live and ready for portfolio sharing.

---

## 🛠 Development Setup (Local)

### Prerequisites
- Node.js 18+
- MongoDB Atlas account

### Backend Setup
```bash
cd BACKEND
npm install
```

Create `.env` file:
```env
PORT=5000
MONGO_URI=mongodb+srv://abhishekpandya5:QGnpJ8GNSKkWOkAt@cluster0.9yfazy9.mongodb.net/
APP_URL=http://localhost:5000/
FRONTEND_URL=http://localhost:5173
JWT_SECRET=mySecretKey123
NODE_ENV=development
```

### Frontend Setup
```bash
cd FRONTEND
npm install
```

### Run Development
```bash
# Terminal 1 - Backend
cd BACKEND && npm run dev

# Terminal 2 - Frontend  
cd FRONTEND && npm run dev
```

## 📱 Features

- 🔗 **URL Shortening**: Convert long URLs into short links
- 👤 **User Authentication**: Register/login to create custom URLs
- 🎨 **Custom Slugs**: Create personalized short URLs
- 📊 **Analytics**: Track click counts
- 📱 **Responsive**: Works on all devices

## 🔧 Tech Stack

**Frontend:** React, Redux, TanStack Router, Tailwind CSS  
**Backend:** Node.js, Express, MongoDB, JWT  
**Deployment:** Netlify + Render.com (Free tiers)

## 🐛 Troubleshooting

**CORS Issues:** Make sure FRONTEND_URL in backend matches your Netlify URL  
**API Not Working:** Check VITE_API_URL in Netlify environment variables  
**Authentication Issues:** Verify JWT_SECRET is set in backend environment  

## 📝 Making Changes

1. **Frontend**: Edit files in `FRONTEND/src/`
2. **Backend**: Edit files in `BACKEND/src/`
3. **Push to GitHub** - Both Netlify and Render will auto-deploy
4. **Environment Variables**: Update in platform dashboards if needed

Perfect for portfolio projects and testing! 🎯
