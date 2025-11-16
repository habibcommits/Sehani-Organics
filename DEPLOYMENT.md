# Deployment Guide - Sehani Organics

## Quick Deploy to Vercel (Recommended)

### Prerequisites
1. GitHub account
2. Vercel account (free tier available)
3. MongoDB Atlas account (free tier available)

### Step 1: Prepare MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account
2. Create a new cluster (M0 Free tier is sufficient)
3. Create a database user:
   - Go to Database Access
   - Add New Database User
   - Choose password authentication
   - Save username and password
4. Configure network access:
   - Go to Network Access
   - Add IP Address: `0.0.0.0/0` (allow from anywhere)
5. Get your connection string:
   - Go to Database → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sehani?retryWrites=true&w=majority`

### Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Sehani Organics MERN app"
git remote add origin https://github.com/yourusername/sehani-organics.git
git push -u origin main
```

### Step 3: Deploy on Vercel

1. Go to [Vercel](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: **Other**
   - Build Command: `npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `npm install`

5. Add Environment Variables (click "Environment Variables"):
   ```
   MONGODB_URI=mongodb+srv://...your connection string...
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters
   NODE_ENV=production
   ```

6. Click "Deploy"

### Step 4: Verify Deployment

After deployment completes:
1. Visit your Vercel URL (e.g., `your-app.vercel.app`)
2. Check products page loads correctly
3. Test admin login at `/admin/login` (admin/admin)
4. Verify cart and checkout functionality

## Environment Variables Explained

### MONGODB_URI
Your MongoDB Atlas connection string. Format:
```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

### JWT_SECRET
A secret key for JWT token generation. Must be at least 32 characters. Generate with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### NODE_ENV
Set to `production` for deployment, `development` for local testing.

## Troubleshooting

### MongoDB Connection Issues
- Verify your IP is whitelisted (0.0.0.0/0 allows all)
- Check username/password in connection string
- Ensure database user has read/write permissions

### API Routes Not Working
- Verify `vercel.json` is in the root directory
- Check Vercel function logs for errors
- Ensure all environment variables are set correctly

### Frontend Not Loading
- Check build logs for errors
- Verify `frontend/dist` directory exists after build
- Check browser console for errors

### Images Not Displaying
- Ensure images are in `frontend/public/images/`
- Check image paths in database match `/images/filename.png`
- Verify images were copied during build

## Custom Domain

To add a custom domain:
1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your domain
4. Update DNS records as instructed by Vercel

## Security Recommendations

### Production Checklist
- [ ] Change default admin password (update in backend/routes/auth.js)
- [ ] Use strong JWT_SECRET (32+ random characters)
- [ ] Enable MongoDB IP whitelist (specific IPs instead of 0.0.0.0/0)
- [ ] Add rate limiting to API routes
- [ ] Enable CORS only for your domain
- [ ] Set up MongoDB backup schedule
- [ ] Configure MongoDB alerts for unusual activity

## Monitoring

### Vercel Analytics
Enable in your Vercel dashboard to track:
- Page views
- Performance metrics
- Error rates

### MongoDB Monitoring
Use MongoDB Atlas built-in monitoring:
- Database connections
- Query performance
- Storage usage
- Alerts for downtime

## Cost Estimation

### Free Tier Limits
- **Vercel**: 100GB bandwidth, unlimited projects
- **MongoDB Atlas**: 512MB storage, shared cluster
- **Total Cost**: $0/month for small traffic

### When to Upgrade
- Vercel: >100GB bandwidth/month
- MongoDB: >512MB data or need better performance
- Expected cost: $9/month Vercel + $9/month MongoDB M10 = ~$18/month

## Support

For deployment issues:
- Vercel: [Vercel Documentation](https://vercel.com/docs)
- MongoDB: [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- Project Issues: Create an issue on GitHub

## Next Steps After Deployment

1. **Test thoroughly**: Test all features in production
2. **Update WhatsApp number**: Edit `frontend/src/components/WhatsAppButton.jsx`
3. **Change admin credentials**: Update default admin password
4. **Add products**: Use admin panel to add more products
5. **Configure payments**: Integrate payment gateway if needed
6. **Set up analytics**: Enable Vercel Analytics
7. **Add email notifications**: Configure order confirmation emails
8. **Backup strategy**: Set up MongoDB backup schedule

## Rollback Strategy

If deployment fails:
1. Vercel keeps previous deployments available
2. Click "Deployments" in Vercel dashboard
3. Find the last working deployment
4. Click "..." → "Promote to Production"

## Local Testing Before Deploy

Always test locally before deploying:
```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev
```

Visit http://localhost:5000 to test locally.
