#!/bin/bash

# Hostinger Deployment Script for Kru English Platform
# This script prepares your application for deployment to Hostinger

echo "🚀 Preparing Kru English Platform for Hostinger Deployment"
echo "============================================================="

# Check if required files exist
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project root."
    exit 1
fi

# Create deployment directory
echo "📁 Creating deployment directory..."
rm -rf deploy
mkdir -p deploy

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🏗️  Building frontend..."
npx vite build --outDir dist/public

echo "🏗️  Building backend..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed. dist directory not found."
    exit 1
fi

# Copy necessary files to deploy directory
echo "📋 Copying files to deployment directory..."
cp -r dist deploy/
cp package.json deploy/
cp package-lock.json deploy/
cp .env.example deploy/

# Create production package.json
echo "📝 Creating production package.json..."
cat > deploy/package.json << 'EOF'
{
  "name": "kru-english-platform",
  "version": "1.0.0",
  "description": "Online English Learning Platform",
  "main": "dist/index.js",
  "scripts": {
    "start": "NODE_ENV=production node dist/index.js",
    "migrate": "NODE_ENV=production npx drizzle-kit push:pg"
  },
  "dependencies": {
    "@neondatabase/serverless": "^0.10.6",
    "@radix-ui/react-accordion": "^1.2.1",
    "@radix-ui/react-alert-dialog": "^1.1.2",
    "@radix-ui/react-aspect-ratio": "^1.1.1",
    "@radix-ui/react-avatar": "^1.1.1",
    "@radix-ui/react-checkbox": "^1.1.2",
    "@radix-ui/react-collapsible": "^1.1.1",
    "@radix-ui/react-context-menu": "^2.2.2",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.2",
    "@radix-ui/react-hover-card": "^1.1.2",
    "@radix-ui/react-label": "^2.1.1",
    "@radix-ui/react-menubar": "^1.1.2",
    "@radix-ui/react-navigation-menu": "^1.2.1",
    "@radix-ui/react-popover": "^1.1.2",
    "@radix-ui/react-progress": "^1.1.1",
    "@radix-ui/react-radio-group": "^1.2.1",
    "@radix-ui/react-scroll-area": "^1.2.0",
    "@radix-ui/react-select": "^2.1.2",
    "@radix-ui/react-separator": "^1.1.1",
    "@radix-ui/react-slider": "^1.2.1",
    "@radix-ui/react-slot": "^1.1.1",
    "@radix-ui/react-switch": "^1.1.1",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-toast": "^1.2.2",
    "@radix-ui/react-toggle": "^1.1.1",
    "@radix-ui/react-toggle-group": "^1.1.1",
    "@radix-ui/react-tooltip": "^1.1.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "connect-pg-simple": "^10.0.0",
    "date-fns": "^4.1.0",
    "drizzle-orm": "^0.36.4",
    "drizzle-zod": "^0.5.1",
    "express": "^4.21.1",
    "express-session": "^1.18.1",
    "jsonwebtoken": "^9.0.2",
    "lucide-react": "^0.468.0",
    "memorystore": "^1.7.0",
    "node-fetch": "^3.3.2",
    "openai": "^4.77.0",
    "passport": "^0.7.0",
    "passport-local": "^1.0.0",
    "stripe": "^17.3.1",
    "tailwind-merge": "^2.5.4",
    "zod": "^3.23.8",
    "zod-validation-error": "^3.4.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
EOF

# Create deployment instructions
echo "📄 Creating deployment instructions..."
cat > deploy/DEPLOYMENT_INSTRUCTIONS.md << 'EOF'
# Hostinger Deployment Instructions

## 1. Upload Files
- Upload all contents of this deploy/ directory to your Hostinger public_html folder
- Or upload to a subdirectory if deploying to a subdomain

## 2. Configure Node.js Application
In Hostinger control panel:
1. Go to Advanced → Node.js
2. Create new application:
   - Application root: public_html (or your upload directory)
   - Startup file: dist/index.js
   - Node version: 18.x or higher

## 3. Set Environment Variables
Add these environment variables in Node.js application settings:
- DATABASE_URL: Your PostgreSQL connection string
- STRIPE_SECRET_KEY: Your live Stripe secret key
- VITE_STRIPE_PUBLIC_KEY: Your live Stripe public key
- ZOOM_ACCOUNT_ID: Your Zoom account ID
- ZOOM_API_KEY: Your Zoom API key
- ZOOM_API_SECRET: Your Zoom API secret
- OPENAI_API_KEY: Your OpenAI API key (optional)
- NODE_ENV: production
- SESSION_SECRET: A secure random string

## 4. Install Dependencies
In terminal:
```bash
cd public_html
npm install --production
```

## 5. Run Database Migration
```bash
npm run migrate
```

## 6. Start Application
Click "Start" in the Node.js application panel.

## 7. Configure SSL
Enable SSL certificate in Hostinger control panel for HTTPS.

Your Kru English platform should now be live!
EOF

# Create archive for easy upload
echo "📦 Creating deployment archive..."
cd deploy
tar -czf ../kru-english-hostinger-deploy.tar.gz .
cd ..

# Display completion message
echo ""
echo "✅ Deployment package created successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Upload 'kru-english-hostinger-deploy.tar.gz' to your Hostinger account"
echo "2. Extract the archive in your public_html directory"
echo "3. Follow the instructions in DEPLOYMENT_INSTRUCTIONS.md"
echo "4. Configure your environment variables in Hostinger control panel"
echo "5. Start your Node.js application"
echo ""
echo "📁 Files ready in 'deploy/' directory:"
ls -la deploy/
echo ""
echo "🎉 Your Kru English platform is ready for Hostinger deployment!"