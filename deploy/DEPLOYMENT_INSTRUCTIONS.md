# Kru English Platform - Hostinger Deployment Guide

## 🚀 Quick Start

### 1. Upload Files to Hostinger
1. Log into your Hostinger control panel
2. Open **File Manager**
3. Navigate to `public_html` directory
4. Upload all files from this deployment package
5. Extract if you uploaded as a ZIP file

### 2. Configure Node.js Application
1. In Hostinger control panel, go to **Advanced** → **Node.js**
2. Click **Create Application**
3. Configure:
   - **Application root**: `public_html` (or your upload directory)
   - **Startup file**: `dist/index.js`
   - **Node.js version**: 18.x or higher
   - **Application mode**: Production

### 3. Set Environment Variables
In the Node.js application settings, add these environment variables:

#### Required Variables:
```
DATABASE_URL=postgresql://username:password@hostname:5432/database_name
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=pk_live_your_stripe_public_key
NODE_ENV=production
SESSION_SECRET=your_very_secure_session_secret_here
```

#### Optional Variables (for full functionality):
```
ZOOM_ACCOUNT_ID=your_zoom_account_id
ZOOM_API_KEY=your_zoom_api_key
ZOOM_API_SECRET=your_zoom_api_secret
OPENAI_API_KEY=sk-your_openai_api_key
```

### 4. Install Dependencies
1. Open **Terminal** in Hostinger control panel
2. Navigate to your application directory:
   ```bash
   cd public_html
   ```
3. Install dependencies:
   ```bash
   npm install --production
   ```

### 5. Set Up Database
1. Create a PostgreSQL database in Hostinger control panel
2. Update the `DATABASE_URL` environment variable
3. Run database migration:
   ```bash
   npm run migrate
   ```

### 6. Start Your Application
1. In the Node.js application panel, click **Start**
2. Monitor the logs for any errors
3. Your application should now be running

### 7. Configure SSL (HTTPS)
1. Go to **Advanced** → **SSL**
2. Enable SSL certificate for your domain
3. Enable "Force HTTPS" to redirect all traffic to HTTPS

### 8. Test Your Application
Visit your domain and test:
- Homepage loads correctly
- Course pricing pages work
- Payment integration functions
- Admin panel (if configured)
- Contact forms submit

## 🔧 Configuration Details

### Database Configuration
The platform supports PostgreSQL (recommended) or MySQL. Update your `DATABASE_URL` to match your Hostinger database:

**PostgreSQL format:**
```
postgresql://username:password@hostname:5432/database_name
```

**MySQL format:**
```
mysql://username:password@hostname:3306/database_name
```

### Stripe Payment Configuration
1. Get your live API keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Use live keys (starting with `sk_live_` and `pk_live_`) for production
3. Set up webhooks in Stripe dashboard pointing to your domain

### Zoom Integration (Optional)
1. Create a Server-to-Server OAuth app in [Zoom Marketplace](https://marketplace.zoom.us/)
2. Get your Account ID, Client ID, and Client Secret
3. Add the credentials as environment variables

### AI Chatbot (Optional)
1. Get an API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add as `OPENAI_API_KEY` environment variable

## 🚨 Troubleshooting

### Application Won't Start
- Check the logs in Node.js application panel
- Verify all required environment variables are set
- Ensure startup file path is correct: `dist/index.js`
- Check Node.js version is 18.x or higher

### Database Connection Errors
- Verify `DATABASE_URL` format is correct
- Check database credentials in Hostinger panel
- Ensure database exists and is accessible
- Test connection from terminal if possible

### Payment Issues
- Verify Stripe keys are live versions (not test keys)
- Check environment variable names are exact
- Ensure SSL is enabled for secure payments

### Static Files Not Loading
- Verify files uploaded correctly to `public_html`
- Check file permissions (should be 644 for files, 755 for directories)
- Clear browser cache and test

### Domain/SSL Issues
- Ensure domain DNS points to Hostinger servers
- Wait for DNS propagation (up to 24 hours)
- Enable SSL certificate in Hostinger control panel

## 📞 Support

### Hostinger Support
- 24/7 chat support available in control panel
- Knowledge base: [Hostinger Help Center](https://support.hostinger.com/)
- Community forum for technical questions

### Application Logs
Check application logs in the Node.js panel for detailed error messages.

## 🎉 Success!

Once deployed successfully, your Kru English platform will be live with:
- ✅ Course browsing and pricing
- ✅ Secure payment processing
- ✅ Student enrollment system
- ✅ Admin management interface
- ✅ AI-powered support chat
- ✅ Zoom class integration
- ✅ Mobile-responsive design
- ✅ Thai/English language support

Your students can now access world-class English learning with native teachers!