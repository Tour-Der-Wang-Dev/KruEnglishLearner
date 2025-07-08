# Quick Hostinger Setup Guide

## 1. Run Deployment Script
```bash
./hostinger-deploy.sh
```

## 2. Upload to Hostinger
1. Download the generated `kru-english-hostinger-deploy.tar.gz` file
2. Login to Hostinger File Manager
3. Navigate to `public_html` directory
4. Upload and extract the tar.gz file

## 3. Configure Node.js in Hostinger
1. Go to **Advanced** → **Node.js**
2. Create new application:
   - **Application root**: `public_html`
   - **Startup file**: `dist/index.js`
   - **Node version**: 18.x or higher

## 4. Set Environment Variables
Add these in Node.js application settings:

### Required Variables:
- `DATABASE_URL`: Your PostgreSQL connection string
- `STRIPE_SECRET_KEY`: Your live Stripe secret key (starts with `sk_live_`)
- `VITE_STRIPE_PUBLIC_KEY`: Your live Stripe public key (starts with `pk_live_`)
- `NODE_ENV`: `production`
- `SESSION_SECRET`: A secure random string

### Optional Variables:
- `ZOOM_ACCOUNT_ID`: Your Zoom account ID
- `ZOOM_API_KEY`: Your Zoom API key
- `ZOOM_API_SECRET`: Your Zoom API secret
- `OPENAI_API_KEY`: Your OpenAI API key

## 5. Install Dependencies
In Hostinger terminal:
```bash
cd public_html
npm install --production
```

## 6. Run Database Migration
```bash
npm run migrate
```

## 7. Start Application
Click **Start** in the Node.js application panel.

## 8. Enable SSL
Go to **Advanced** → **SSL** and enable SSL certificate.

## 9. Test Your Website
Visit your domain to ensure everything works:
- Homepage loading
- Course pricing
- Payment flow
- Admin panel (if configured)

## Troubleshooting

### Common Issues:
1. **App won't start**: Check logs in Node.js panel
2. **Database errors**: Verify DATABASE_URL format
3. **Payment errors**: Check Stripe keys are live versions
4. **SSL errors**: Ensure SSL is enabled and domain is configured

### Support:
- Hostinger support: Available 24/7 via chat
- Check application logs in Node.js panel
- Verify all environment variables are set correctly

Your Kru English platform is now ready for production on Hostinger!