# Environment Variables Setup Guide

This guide will help you set up environment variables for the Sehani Organics project.

## 🔐 Security First

**IMPORTANT:** 
- `.env` files are already added to `.gitignore`
- NEVER commit `.env` files to Git
- Use `.env.example` as a template

## 📋 Local Development Setup

### Step 1: Create Backend .env File

```bash
cd backend
cp .env.example .env
```

Then edit `backend/.env` with your actual values:

```env
MONGODB_URI=mongodb://localhost:27017/sehani-organics
JWT_SECRET=your_generated_jwt_secret_here
PORT=3000
NODE_ENV=development
```

### Step 2: Generate JWT Secret

Run this command to generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it as your `JWT_SECRET` value.

### Step 3: Set Up MongoDB

**Option A: Local MongoDB (Development)**
```
MONGODB_URI=mongodb://localhost:27017/sehani-organics
```

**Option B: MongoDB Atlas (Production & Development)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user with username and password
4. Whitelist IP addresses:
   - For development: Add your current IP
   - For production (Vercel): Add `0.0.0.0/0` (all IPs)
5. Get your connection string from "Connect" → "Connect your application"
6. Replace `<password>` with your database user's password
7. Replace `<database>` with `sehani-organics`

Example Atlas connection string:
```
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/sehani-organics?retryWrites=true&w=majority
```

## 🚀 Vercel Deployment Setup

### Add Environment Variables to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your Sehani Organics project
3. Navigate to **Settings** → **Environment Variables**
4. Add the following variables:

| Variable | Value | Environments |
|----------|-------|--------------|
| `MONGODB_URI` | Your MongoDB Atlas connection string | Production, Preview, Development |
| `JWT_SECRET` | Your JWT secret (same as local) | Production, Preview, Development |
| `NODE_ENV` | `production` | Production only |

### Using Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Add environment variables
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add NODE_ENV

# Deploy
vercel --prod
```

## 🔍 Verify Setup

### Check Local Development

1. Start MongoDB (if using local):
   ```bash
   mongod --dbpath /tmp/mongodb/data --port 27017
   ```

2. Start backend:
   ```bash
   cd backend
   npm start
   ```

3. You should see:
   ```
   Server running on port 3000
   MongoDB Connected: [your-connection-host]
   ```

### Check Environment Variables in Replit

Your Replit environment already has `MONGODB_URI` configured in Secrets. You can access it through:
- Tools → Secrets panel in Replit

## 📝 Environment Variables Reference

### Backend (.env)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `MONGODB_URI` | ✅ Yes | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | ✅ Yes | Secret key for JWT tokens (min 32 chars) | `abc123def456...` |
| `PORT` | ❌ No | Server port (default: 3000) | `3000` |
| `NODE_ENV` | ❌ No | Environment mode | `development` or `production` |

## ⚠️ Troubleshooting

### "MONGODB_URI is undefined"
- Make sure `.env` file exists in the `backend` folder
- Check that `.env` has `MONGODB_URI=` with a valid connection string
- Restart your server after modifying `.env`

### "Authentication failed" (MongoDB)
- Verify your MongoDB username and password are correct
- Check if your IP address is whitelisted in MongoDB Atlas
- Ensure the database user has read/write permissions

### "JWT_SECRET not found"
- Generate a new secret using the command provided above
- Make sure it's at least 32 characters long

### Vercel Deployment Error
- Verify all environment variables are set in Vercel dashboard
- Check that `MONGODB_URI` points to MongoDB Atlas (not localhost)
- Redeploy after adding environment variables

## 🔒 Security Best Practices

1. ✅ Use strong, randomly generated JWT secrets
2. ✅ Keep `.env` files in `.gitignore`
3. ✅ Use different secrets for development and production
4. ✅ Rotate secrets periodically
5. ✅ Never share `.env` files or commit them to version control
6. ✅ Use environment-specific configurations
7. ✅ Limit MongoDB Atlas IP whitelist when possible

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [JWT Best Practices](https://jwt.io/introduction)
