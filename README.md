# URL Shortener

A full-stack URL shortening application built with React, Node.js, Express, and MongoDB.

## Features

- 🔗 **URL Shortening**: Convert long URLs into short, shareable links
- 👤 **User Authentication**: Secure registration and login system
- 🎨 **Custom Slugs**: Authenticated users can create custom short URLs
- 📊 **Analytics**: Track click counts for each shortened URL
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🔒 **Security**: JWT-based authentication with HTTP-only cookies
- ⚡ **Real-time Updates**: Live click count updates every 30 seconds
- 🎯 **User Dashboard**: Manage all your shortened URLs in one place

## Tech Stack

### Frontend

- **React 19** with Vite
- **TanStack Router** for routing
- **Redux Toolkit** for state management
- **TanStack Query** for data fetching
- **Tailwind CSS** for styling
- **Axios** for API calls

### Backend

- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcrypt** for password hashing
- **nanoid** for generating short URLs

## Project Structure

```
url-shortener/
├── FRONTEND/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── routing/        # Route configurations
│   │   ├── store/          # Redux store and slices
│   │   ├── api/            # API service functions
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── BACKEND/                 # Node.js backend API
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controller/     # Route controllers
│   │   ├── dao/            # Data access objects
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   └── package.json
└── docker-compose.yml      # Docker orchestration
```

## Development Setup

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd url-shortener
```

### 2. Backend Setup

```bash
cd BACKEND
npm install
```

Create `.env` file in BACKEND directory:

```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
APP_URL=http://localhost:5000/
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-jwt-secret
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd FRONTEND
npm install
```

Create `.env` file in FRONTEND directory:

```env
VITE_API_URL=http://localhost:5000
VITE_APP_URL=http://localhost:5000
```

### 4. Run Development Servers

**Backend:**

```bash
cd BACKEND
npm run dev
```

**Frontend:**

```bash
cd FRONTEND
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Making Changes

### Adding New Features

1. **Frontend Components**: Add new components in `FRONTEND/src/components/`
2. **Pages**: Create new pages in `FRONTEND/src/pages/`
3. **Routes**: Configure routes in `FRONTEND/src/routing/`
4. **API Endpoints**: Add backend routes in `BACKEND/src/routes/`
5. **Database Models**: Create models in `BACKEND/src/models/`

### Code Style Guidelines

- Use functional components with hooks
- Follow existing naming conventions
- Use Tailwind CSS for styling
- Keep components small and focused
- Use TypeScript-style prop validation where needed

### Testing Changes

1. **Start both servers** in development mode
2. **Test authentication flow**: Register → Login → Create URLs → Logout
3. **Test URL shortening**: Both with and without custom slugs
4. **Test responsive design**: Check mobile and desktop views
5. **Test error handling**: Invalid URLs, network errors, etc.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy with Docker

1. **Update production environment variables** in `.env.production`
2. **Run deployment script**:

```bash
chmod +x deploy.sh
./deploy.sh
```

### Environment Variables Reference

#### Backend (.env)

- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `APP_URL`: Backend URL for generating short links
- `FRONTEND_URL`: Frontend URL for CORS
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Environment (development/production)

#### Frontend (.env)

- `VITE_API_URL`: Backend API URL
- `VITE_APP_URL`: Backend URL for displaying short links

## Architecture

### Authentication Flow

1. **Registration/Login**: User credentials are validated and JWT token is generated
2. **Cookie Storage**: JWT token is stored in HTTP-only cookie for security
3. **Route Protection**: Protected routes check authentication before loading
4. **State Management**: Redux maintains authentication state across the app

### URL Shortening Process

1. **URL Validation**: Input URLs are validated for proper format
2. **Slug Generation**: Random nanoid or custom slug (for authenticated users)
3. **Database Storage**: URLs stored with user association and metadata
4. **Redirection**: Short URLs redirect to original URLs with click tracking

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### URL Management

- `POST /api/create` - Create short URL (body: {url, slug?})
- `POST /api/user/urls` - Get user's URLs (requires auth)
- `GET /:id` - Redirect to original URL and increment clicks

## Development Workflow

### Making Changes

#### Frontend Changes

1. **Components**: Add/modify components in `FRONTEND/src/components/`
2. **Styling**: Use Tailwind CSS classes for consistent styling
3. **State Management**: Use Redux for global state, local state for component-specific data
4. **API Calls**: Add new API functions in `FRONTEND/src/api/`
5. **Routing**: Configure new routes in `FRONTEND/src/routing/`

#### Backend Changes

1. **Models**: Define database schemas in `BACKEND/src/models/`
2. **Routes**: Add API endpoints in `BACKEND/src/routes/`
3. **Controllers**: Implement business logic in `BACKEND/src/controller/`
4. **Services**: Add reusable business logic in `BACKEND/src/services/`
5. **Middleware**: Create custom middleware in `BACKEND/src/middleware/`

### Testing Your Changes

1. **Start development servers**:

   ```bash
   # Terminal 1 - Backend
   cd BACKEND && npm run dev

   # Terminal 2 - Frontend
   cd FRONTEND && npm run dev
   ```

2. **Test core functionality**:

   - URL shortening (with and without custom slugs)
   - User registration and login
   - Dashboard functionality
   - Logout and authentication state

3. **Test responsive design** on different screen sizes

4. **Check browser console** for any errors or warnings

## Deployment Options

### Option 1: Docker Compose (Recommended)

**Quick Deploy:**

```bash
# 1. Update production environment variables
cp .env.production.example .env.production
# Edit .env.production with your actual domains and secrets

# 2. Deploy
chmod +x deploy.sh
./deploy.sh
```

**Manual Docker Compose:**

```bash
# Build and start
docker-compose --env-file .env.production up --build -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Option 2: Cloud Platform Deployment

#### Vercel (Frontend) + Railway/Render (Backend)

**Frontend on Vercel:**

1. Connect GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables:
   - `VITE_API_URL=https://your-backend-url.com`
   - `VITE_APP_URL=https://your-backend-url.com`

**Backend on Railway/Render:**

1. Connect GitHub repository
2. Set start command: `npm start`
3. Add environment variables:
   - `NODE_ENV=production`
   - `MONGO_URI=your-mongodb-uri`
   - `JWT_SECRET=your-strong-secret`
   - `FRONTEND_URL=https://your-vercel-app.vercel.app`
   - `APP_URL=https://your-backend-url.com`

#### Netlify (Frontend) + Heroku (Backend)

**Frontend on Netlify:**

1. Connect repository and set build settings
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard

**Backend on Heroku:**

1. Create Heroku app: `heroku create your-app-name`
2. Set environment variables: `heroku config:set VAR_NAME=value`
3. Deploy: `git push heroku main`

### Option 3: VPS/Server Deployment

1. **Setup server** with Node.js and nginx
2. **Clone repository** on server
3. **Install dependencies** and build frontend
4. **Configure nginx** as reverse proxy
5. **Use PM2** for process management:
   ```bash
   npm install -g pm2
   pm2 start BACKEND/app.js --name url-shortener-backend
   pm2 startup
   pm2 save
   ```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes following the development workflow
4. Test thoroughly in development environment
5. Update documentation if needed
6. Commit: `git commit -m "Add feature description"`
7. Push: `git push origin feature-name`
8. Create a Pull Request with detailed description

## Troubleshooting

### Common Issues

**CORS Errors:**

- Check `FRONTEND_URL` in backend .env matches your frontend domain
- Ensure `withCredentials: true` in axios configuration

**Authentication Issues:**

- Verify JWT_SECRET is the same across all environments
- Check cookie settings in browser developer tools

**Database Connection:**

- Verify MongoDB URI is correct
- Check MongoDB Atlas IP whitelist

**Build Errors:**

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

## License

This project is open source and available under the [MIT License](LICENSE).
