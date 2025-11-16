# Sehani Organics - MERN E-commerce Platform

## Overview
A full-stack e-commerce platform for Sehani Organics, a Pakistani company selling pure Sidr honey. This is a MERN (MongoDB, Express, React, Node.js) stack application with an admin panel and guest checkout functionality.

## Features
### Customer Features
- Browse products (250g, 500g, 1kg honey jars)
- Add to cart and manage cart items
- Guest checkout (no login required) or registered user checkout
- User registration and authentication
- WhatsApp contact button (bottom right corner)

### Admin Panel Features
- Dashboard with statistics (total orders, revenue, users, products)
- Product management (add, edit, delete, inventory control)
- Order management (view orders, update status)
- User management (view users, delete users)
- Admin credentials: username: `admin`, password: `admin`

## Project Architecture
- **Stack**: MERN (MongoDB, Express.js, React, Node.js)
- **Frontend**: React 18 + Vite, deployed on port 5000
- **Backend**: Express.js API, deployed on port 3000
- **Database**: MongoDB Atlas (cloud database)
- **Authentication**: JWT tokens with bcrypt password hashing
- **Deployment Target**: Vercel (serverless configuration)

## File Structure
```
/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection & seeding
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Product.js            # Product schema
│   │   └── Order.js              # Order schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes (login, register, admin)
│   │   ├── products.js           # Product CRUD routes
│   │   ├── orders.js             # Order routes
│   │   └── admin.js              # Admin dashboard routes
│   ├── server.js                 # Express app entry point
│   ├── package.json
│   └── .env                      # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── WhatsAppButton.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/              # React Context
│   │   │   ├── CartContext.jsx
│   │   │   └── AuthContext.jsx
│   │   ├── pages/                # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Checkout.jsx
│   │   │   └── admin/            # Admin pages
│   │   │       ├── AdminLogin.jsx
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── AdminProducts.jsx
│   │   │       ├── AdminOrders.jsx
│   │   │       └── AdminUsers.jsx
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── public/
│   │   └── images/               # Product images
│   ├── vite.config.js            # Vite configuration
│   ├── index.html
│   └── package.json
├── images/                       # Original images
├── vercel.json                   # Vercel deployment config
└── package.json                  # Root package.json
```

## Environment Variables Required
- `MONGODB_URI`: MongoDB connection string (MongoDB Atlas)
- `JWT_SECRET`: Secret key for JWT tokens (min 32 characters)
- `PORT`: Backend server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

## Running the Project
### Development Mode
The project runs automatically via configured workflows:
- **Backend**: `cd backend && npm start` (port 3000)
- **Frontend**: `cd frontend && npm run dev` (port 5000)

### Manual Start
```bash
# Backend
cd backend
npm install
npm start

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login (username/password: admin/admin)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create order (guest or authenticated)
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status (admin only)

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats (admin only)
- `GET /api/admin/users` - Get all users (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)

## Deployment to Vercel
The project is configured for Vercel serverless deployment:
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
3. Deploy automatically - `vercel.json` handles routing

## Recent Changes
- **2024-11-16**: Complete MERN stack implementation
  - Created Express backend with MongoDB integration
  - Built React frontend with Vite
  - Implemented JWT authentication
  - Added admin panel with full CRUD operations
  - Implemented guest checkout functionality
  - Added WhatsApp floating button
  - Configured for Vercel serverless deployment
  - Database auto-seeds with 3 honey products on first run

## User Preferences
None documented yet.

## Admin Access
- URL: `/admin/login`
- Username: `admin`
- Password: `admin`
