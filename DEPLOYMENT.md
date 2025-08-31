# URL Shortener - Deployment Guide

## Prerequisites
- Docker and Docker Compose installed
- Domain names for frontend and backend (or use IP addresses)
- MongoDB Atlas account (or self-hosted MongoDB)

## Environment Configuration

### 1. Update Production Environment Variables

Edit `.env.production` in the root directory:

```env
# Database
MONGO_URI=your-mongodb-connection-string

# Backend URLs (your actual backend domain)
APP_URL=https://api.yourdomain.com
FRONTEND_URL=https://yourdomain.com

# Frontend URLs (same as backend URLs)
VITE_API_URL=https://api.yourdomain.com
VITE_APP_URL=https://api.yourdomain.com

# Security (generate a strong secret)
JWT_SECRET=your-super-secure-jwt-secret-for-production
```

### 2. Update Backend Production Environment

Edit `BACKEND/.env.production`:
- Update all URLs to match your production domains
- Use a strong JWT secret
- Ensure NODE_ENV=production

### 3. Update Frontend Production Environment

Edit `FRONTEND/.env.production`:
- Update VITE_API_URL to your backend domain
- Update VITE_APP_URL to your backend domain

## Deployment Options

### Option 1: Docker Compose (Recommended)

1. **Build and run with production environment:**
```bash
docker-compose --env-file .env.production up --build -d
```

2. **View logs:**
```bash
docker-compose logs -f
```

3. **Stop services:**
```bash
docker-compose down
```

### Option 2: Individual Docker Containers

1. **Build backend:**
```bash
cd BACKEND
docker build -t url-shortener-backend .
```

2. **Build frontend:**
```bash
cd FRONTEND
docker build --build-arg VITE_API_URL=https://api.yourdomain.com --build-arg VITE_APP_URL=https://api.yourdomain.com -t url-shortener-frontend .
```

3. **Run containers:**
```bash
# Backend
docker run -d -p 5000:5000 --env-file .env.production url-shortener-backend

# Frontend
docker run -d -p 80:80 url-shortener-frontend
```

### Option 3: Platform-Specific Deployment

#### Vercel (Frontend)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `VITE_API_URL=https://your-backend-domain.com`
   - `VITE_APP_URL=https://your-backend-domain.com`

#### Railway/Render/Heroku (Backend)
1. Connect your repository
2. Set environment variables:
   - `NODE_ENV=production`
   - `MONGO_URI=your-mongodb-uri`
   - `JWT_SECRET=your-jwt-secret`
   - `FRONTEND_URL=https://your-frontend-domain.com`
   - `APP_URL=https://your-backend-domain.com`

## Important Notes

1. **Security:**
   - Change the JWT_SECRET to a strong, random string
   - Use HTTPS in production
   - Keep your MongoDB credentials secure

2. **CORS:**
   - The backend is configured to accept requests from the FRONTEND_URL
   - Make sure the frontend and backend URLs match your actual domains

3. **Database:**
   - The app uses MongoDB Atlas by default
   - Make sure your MongoDB cluster allows connections from your deployment platform

4. **SSL/HTTPS:**
   - Use a reverse proxy (nginx, Cloudflare) or platform SSL for HTTPS
   - Update all URLs to use HTTPS in production

## Troubleshooting

- **CORS errors:** Check that FRONTEND_URL in backend matches your actual frontend domain
- **API connection issues:** Verify VITE_API_URL in frontend matches your backend domain
- **Authentication issues:** Ensure cookies work across your domains (same-site policy)
- **Database connection:** Check MongoDB Atlas IP whitelist and connection string
