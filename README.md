# Sehani Organics - E-commerce Platform

A full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application for selling pure Sidr honey from Pakistan.

## Features

### Customer Features
- Browse products with detailed information
- Add products to cart (persisted in localStorage)
- Guest checkout (no login required)
- User registration and login
- View order history (for registered users)
- WhatsApp contact button
- Responsive mobile-friendly design

### Admin Panel Features
- Dashboard with real-time statistics
- Product management (CRUD operations)
- Inventory management
- Order management with status updates
- User management
- Revenue tracking

## Tech Stack

- **Frontend**: React 18, Vite, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT + bcrypt
- **Deployment**: Vercel (Serverless)

## Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (free tier available)
- Vercel account (for deployment)

## Local Development

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd sehani-organics
```

### 2. Set up Backend
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_min_32_chars
PORT=3000
NODE_ENV=development
```

### 3. Set up Frontend
```bash
cd frontend
npm install
```

### 4. Run the Application
Start backend (from backend directory):
```bash
npm start
```

Start frontend (from frontend directory):
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5000
- Backend: http://localhost:3000

## Deployment to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy on Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure environment variables in Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key

5. Deploy!

Vercel will automatically:
- Build the frontend
- Configure serverless functions for the backend
- Route API requests to backend
- Route other requests to frontend

### 3. Update MongoDB Connection
Make sure your MongoDB Atlas allows connections from Vercel's IP addresses:
- In MongoDB Atlas, go to Network Access
- Add IP Address: `0.0.0.0/0` (allow all) or specific Vercel IPs

## Admin Access

- URL: `your-domain.com/admin/login`
- Username: `admin`
- Password: `admin`

**Important**: Change the admin credentials in production!

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status (admin only)

### Admin
- `GET /api/admin/dashboard` - Get dashboard statistics (admin only)
- `GET /api/admin/users` - Get all users (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)

## Project Structure

```
sehani-organics/
├── backend/
│   ├── config/          # Database configuration
│   ├── middleware/      # Authentication middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   └── server.js        # Express app
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # React context (Cart, Auth)
│   │   ├── pages/       # Page components
│   │   └── App.jsx      # Main app
│   ├── public/          # Static assets
│   └── vite.config.js   # Vite configuration
├── vercel.json          # Vercel deployment config
└── README.md
```

## Default Products

The application automatically seeds 3 products on first run:
- Pure Sidr Honey - 250g (800 PKR)
- Pure Sidr Honey - 500g (1600 PKR)
- Pure Sidr Honey - 1kg (3200 PKR)

## WhatsApp Integration

The WhatsApp button is configured with:
- Phone: +92 300 1234567
- Message: "Hello! I am interested in your Pure Sidr Honey products."

Update these in `frontend/src/components/WhatsAppButton.jsx`

## Security Notes

1. **Change Default Admin Password**: Update admin credentials in production
2. **Environment Variables**: Never commit `.env` files
3. **CORS**: Configure CORS properly for production
4. **MongoDB**: Use MongoDB Atlas with proper network access rules
5. **JWT Secret**: Use a strong, random secret key (min 32 characters)

## License

MIT

## Support

For support, email info@sehaniorganics.com or contact via WhatsApp.
