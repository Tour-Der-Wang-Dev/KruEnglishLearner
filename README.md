# KruEnglishLearner - English Learning Platform

A comprehensive English learning platform built with React, TypeScript, and Node.js, featuring Stripe payment integration, AI-powered features, and Zoom integration for online classes.

## 🚀 Features

### Core Features
- **Interactive English Courses** - Multiple course types (General, Business, IELTS, Conversation, Kids)
- **Level Assessment** - Automated English level testing system
- **Payment Integration** - Secure Stripe payment processing
- **Online Classes** - Zoom integration for virtual classrooms
- **AI Chatbot** - OpenAI-powered learning assistant
- **Admin Dashboard** - Complete management system for courses and students
- **Responsive Design** - Mobile-first approach with Tailwind CSS

### Security Features
- **Input Validation** - Comprehensive validation with Zod schemas
- **Rate Limiting** - Protection against abuse and DDoS attacks
- **CORS Configuration** - Secure cross-origin resource sharing
- **Security Headers** - Helmet.js for security headers
- **Error Handling** - Robust error handling and logging
- **Webhook Security** - Stripe webhook signature verification

### Performance Features
- **Code Splitting** - Optimized bundle sizes
- **Compression** - Gzip compression for faster loading
- **Caching** - Static asset caching
- **Health Monitoring** - Built-in health check endpoints

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Beautiful UI components
- **React Hook Form** - Form handling with validation
- **Lucide Icons** - Modern icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server development
- **Drizzle ORM** - Type-safe database operations
- **PostgreSQL** - Robust relational database

### Integrations
- **Stripe** - Payment processing
- **OpenAI** - AI chatbot functionality
- **Zoom** - Video conferencing
- **PM2** - Process management

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality control
- **Docker** - Containerization support

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn
- PostgreSQL 12 or higher
- Stripe account (for payments)
- OpenAI API key (for AI features)
- Zoom API credentials (for video classes)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/kru-english-learner.git
cd kru-english-learner
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/kru_english"

# Stripe (use test keys for development)
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
VITE_STRIPE_PUBLIC_KEY="pk_test_your_stripe_public_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# Zoom API
ZOOM_ACCOUNT_ID="your_zoom_account_id"
ZOOM_API_KEY="your_zoom_client_id"
ZOOM_API_SECRET="your_zoom_client_secret"

# OpenAI
OPENAI_API_KEY="sk-your_openai_api_key"

# Security
SESSION_SECRET="your_secure_session_secret"
```

### 4. Database Setup
```bash
npm run db:push
```

### 5. Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🏗 Build and Deployment

### Development Build
```bash
npm run build
```

### Production Deployment

#### Option 1: Traditional Server Deployment
```bash
# Build the application
npm run build

# Start with PM2
npm run pm2:start
```

#### Option 2: Docker Deployment
```bash
# Build and run with Docker Compose
npm run deploy:docker
```

#### Option 3: Hostinger Deployment
```bash
# Use the automated deployment script
npm run deploy:hostinger yourdomain.com
```

For detailed deployment instructions, see [Hostinger Deployment Guide](./hostinger-deployment-guide.md).

## 📁 Project Structure

```
kru-english-learner/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── types/         # TypeScript type definitions
│   └── public/            # Static assets
├── server/                # Backend Node.js application
│   ├── routes/           # API route handlers
│   ├── services/         # Business logic services
│   ├── middleware/       # Express middleware
│   └── storage/          # Database operations
├── shared/               # Shared types and schemas
├── docs/                 # Documentation
└── deployment/           # Deployment configurations
```

## 🔧 Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type checking
- `npm run db:push` - Push database schema

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - TypeScript type checking
- `npm run pre-commit` - Run all quality checks

### Deployment
- `npm run deploy:hostinger` - Deploy to Hostinger
- `npm run deploy:docker` - Deploy with Docker
- `npm run pm2:start` - Start with PM2
- `npm run pm2:stop` - Stop PM2 processes
- `npm run pm2:restart` - Restart PM2 processes
- `npm run pm2:logs` - View PM2 logs

### Maintenance
- `npm run backup:db` - Backup database
- `npm run test:health` - Test health endpoint

## 🔐 Security Features

### Input Validation
- Zod schema validation for all API endpoints
- XSS protection with input sanitization
- SQL injection prevention with parameterized queries

### Rate Limiting
- General API rate limiting (100 requests/15 minutes)
- Strict rate limiting for sensitive endpoints (5 requests/15 minutes)
- Payment-specific rate limiting (10 requests/hour)

### Security Headers
- Helmet.js for security headers
- CORS configuration for allowed origins
- Content Security Policy (CSP)

### Authentication & Authorization
- Session-based authentication
- Role-based access control
- Secure password handling

## 💳 Payment Integration

### Stripe Configuration
The application uses Stripe for secure payment processing:

1. **Payment Intents** - Secure payment processing
2. **Webhooks** - Real-time payment confirmations
3. **Refunds** - Automated refund processing
4. **Customer Management** - Stripe customer creation and management

### Supported Payment Methods
- Credit/Debit Cards
- Digital Wallets (Apple Pay, Google Pay)
- Bank Transfers (where available)

## 🎯 AI Features

### Chatbot Integration
- OpenAI GPT-powered conversational AI
- Context-aware responses
- Learning assistance and guidance
- Multi-language support

## 📹 Video Integration

### Zoom Integration
- Automated meeting creation
- Calendar integration
- Recording management
- Participant management

## 📊 Monitoring and Analytics

### Health Monitoring
- `/health` endpoint for system status
- PM2 process monitoring
- Database connection monitoring
- External service health checks

### Logging
- Structured logging with Morgan
- Error tracking and reporting
- Performance monitoring
- Security event logging

## 🚀 Performance Optimization

### Frontend Optimization
- Code splitting and lazy loading
- Image optimization
- Bundle size optimization
- Caching strategies

### Backend Optimization
- Database query optimization
- Response compression
- Connection pooling
- Caching layers

## 🔧 Configuration

### Environment Variables
See `.env.example` for all available configuration options.

### Database Configuration
The application uses PostgreSQL with Drizzle ORM for type-safe database operations.

### Security Configuration
Security settings can be configured through environment variables and the security middleware.

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Course Endpoints
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `GET /api/schedules/:courseType` - Get course schedules

### Payment Endpoints
- `POST /api/create-payment-intent` - Create payment intent
- `POST /api/confirm-payment` - Confirm payment
- `POST /api/cancel-payment` - Cancel payment
- `POST /api/refund-payment` - Process refund

### Contact & Support
- `POST /api/contact` - Submit contact form
- `POST /api/level-test` - Submit level test

### Admin Endpoints
- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/admin/students` - Student management
- `GET /api/admin/courses` - Course management

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Check DATABASE_URL format
   - Verify database server is running
   - Check network connectivity

2. **Stripe Payment Issues**
   - Verify Stripe keys are correct
   - Check webhook endpoint configuration
   - Review Stripe dashboard for errors

3. **Build Issues**
   - Clear node_modules and reinstall
   - Check TypeScript errors
   - Verify environment variables

4. **Performance Issues**
   - Check PM2 process status
   - Monitor memory usage
   - Review database query performance

### Getting Help
- Check the logs: `npm run pm2:logs`
- Review health status: `curl http://localhost:3000/health`
- Check database connectivity
- Review environment configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run quality checks: `npm run pre-commit`
5. Submit a pull request

### Code Style
- Follow ESLint configuration
- Use Prettier for formatting
- Write TypeScript with strict types
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Stripe for secure payment processing
- OpenAI for AI capabilities
- Zoom for video conferencing
- All open-source contributors

## 📞 Support

For support and questions:
- Email: support@kruenglish.com
- Documentation: [docs.kruenglish.com](https://docs.kruenglish.com)
- Issues: [GitHub Issues](https://github.com/yourusername/kru-english-learner/issues)

---

**Built with ❤️ for English learners everywhere**

"# KruEnglishLearner" 
