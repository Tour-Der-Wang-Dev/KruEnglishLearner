# Hostinger Deployment Guide for Kru English Platform

## Prerequisites

### 1. Hostinger Account Setup
- Premium or Business hosting plan (required for Node.js support)
- Access to File Manager or FTP
- Database access (MySQL/PostgreSQL)
- SSL certificate enabled

### 2. Required Services
- **Database**: PostgreSQL (recommended) or MySQL
- **Domain**: Configure your domain to point to Hostinger
- **SSL**: Enable SSL certificate in Hostinger control panel

## Environment Configuration

### 1. Environment Variables
Create a `.env` file in your project root with production values:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@hostname:5432/database_name"

# Stripe Configuration
STRIPE_SECRET_KEY="sk_live_your_live_stripe_secret_key"
VITE_STRIPE_PUBLIC_KEY="pk_live_your_live_stripe_public_key"

# Zoom API Configuration
ZOOM_ACCOUNT_ID="your_zoom_account_id"
ZOOM_API_KEY="your_zoom_api_key"
ZOOM_API_SECRET="your_zoom_api_secret"

# OpenAI Configuration (optional)
OPENAI_API_KEY="sk-your_openai_api_key"

# Production Settings
NODE_ENV="production"
PORT=3000
SESSION_SECRET="your_very_secure_session_secret_here"
```

### 2. Database Setup
1. Create a PostgreSQL database in Hostinger control panel
2. Note down the connection details
3. Update DATABASE_URL in your .env file

## Build Process

### 1. Production Build Commands
```bash
# Install dependencies
npm install

# Build frontend
npm run build

# The built files will be in dist/ directory
```

### 2. File Structure After Build
```
project/
├── dist/
│   ├── public/          # Frontend assets
│   │   ├── index.html
│   │   ├── assets/
│   │   └── ...
│   └── index.js         # Backend bundle
├── package.json
├── .env
└── node_modules/
```

## Hostinger Deployment Steps

### Step 1: Upload Files
1. **Via File Manager:**
   - Login to Hostinger control panel
   - Open File Manager
   - Navigate to public_html directory
   - Upload your entire project folder
   - Extract if uploaded as ZIP

2. **Via FTP:**
   - Use FTP client (FileZilla, WinSCP)
   - Upload project to public_html directory

### Step 2: Install Dependencies
1. Access Terminal in Hostinger control panel
2. Navigate to your project directory:
   ```bash
   cd public_html/your-project
   ```
3. Install production dependencies:
   ```bash
   npm install --production
   ```

### Step 3: Build Application
```bash
# Build the application
npm run build
```

### Step 4: Configure Node.js Application
1. In Hostinger control panel, go to "Advanced" → "Node.js"
2. Create new Node.js application:
   - **Node.js version**: 18.x or higher
   - **Application root**: public_html/your-project
   - **Application startup file**: dist/index.js
   - **Application URL**: your domain

### Step 5: Environment Variables
In Node.js application settings, add environment variables:
- DATABASE_URL
- STRIPE_SECRET_KEY
- ZOOM_ACCOUNT_ID
- ZOOM_API_KEY
- ZOOM_API_SECRET
- OPENAI_API_KEY (optional)
- NODE_ENV=production
- SESSION_SECRET

### Step 6: Database Migration
If using PostgreSQL:
```bash
# Run migrations
npx drizzle-kit push:pg
```

### Step 7: Start Application
In Hostinger Node.js panel:
1. Click "Start" to run your application
2. Monitor logs for any errors
3. Test your application at your domain

## SSL Configuration

### 1. Enable SSL in Hostinger
1. Go to "Advanced" → "SSL"
2. Enable SSL for your domain
3. Force HTTPS redirect

### 2. Update Application URLs
Ensure all internal URLs use HTTPS in production.

## Domain Configuration

### 1. DNS Settings
Point your domain to Hostinger:
- A Record: Your Hostinger server IP
- CNAME: www → your domain

### 2. Application URL
Update any hardcoded URLs in your application to use your production domain.

## Performance Optimization

### 1. Static Files
- Frontend assets are served from dist/public
- Ensure proper caching headers
- Use CDN if needed

### 2. Database Optimization
- Use connection pooling
- Index frequently queried columns
- Regular maintenance

### 3. Monitoring
- Monitor application logs in Hostinger control panel
- Set up error tracking
- Monitor database performance

## Security Checklist

### 1. Environment Variables
- ✅ All sensitive data in environment variables
- ✅ No hardcoded secrets in code
- ✅ Strong session secret

### 2. SSL/HTTPS
- ✅ SSL certificate installed
- ✅ Force HTTPS redirect
- ✅ Secure cookie settings

### 3. Database Security
- ✅ Strong database password
- ✅ Limited database user permissions
- ✅ Regular backups enabled

## Troubleshooting

### Common Issues

1. **Application won't start**
   - Check Node.js version compatibility
   - Verify startup file path
   - Check environment variables
   - Review application logs

2. **Database connection errors**
   - Verify DATABASE_URL format
   - Check database credentials
   - Ensure database exists
   - Test connection from terminal

3. **Static files not loading**
   - Verify build process completed
   - Check file permissions
   - Ensure paths are correct

4. **Stripe/Zoom API errors**
   - Verify API keys are correct
   - Check environment variable names
   - Ensure live keys for production

### Logs and Debugging
```bash
# View application logs
tail -f /path/to/your/app/logs/app.log

# Check Node.js application status
pm2 status
pm2 logs
```

## Backup Strategy

### 1. Database Backups
- Set up automated daily backups in Hostinger
- Download backup files regularly
- Test restoration process

### 2. File Backups
- Regular full site backups
- Version control with Git
- Keep deployment scripts updated

## Maintenance

### 1. Regular Updates
- Update dependencies monthly
- Monitor security advisories
- Keep Node.js version current

### 2. Performance Monitoring
- Monitor response times
- Check error rates
- Database performance metrics

## Support Contacts

- **Hostinger Support**: Available 24/7 via chat
- **Technical Issues**: Check Hostinger knowledge base
- **Platform Issues**: Review application logs first

---

## Quick Deployment Checklist

- [ ] Hostinger account with Node.js support
- [ ] Database created and configured
- [ ] Environment variables set
- [ ] SSL certificate enabled
- [ ] Files uploaded to public_html
- [ ] Dependencies installed
- [ ] Application built successfully
- [ ] Node.js app configured and started
- [ ] Domain DNS configured
- [ ] Application tested and working
- [ ] Backups configured

## Post-Deployment Testing

1. **Homepage Loading**: Visit your domain
2. **Course Browsing**: Test pricing and course pages
3. **User Registration**: Test signup process
4. **Payment Flow**: Test Stripe integration
5. **Admin Panel**: Test admin authentication and features
6. **Zoom Integration**: Test meeting creation
7. **AI Chatbot**: Test chatbot responses
8. **Mobile Responsive**: Test on mobile devices

Your Kru English platform should now be live and fully functional on Hostinger!