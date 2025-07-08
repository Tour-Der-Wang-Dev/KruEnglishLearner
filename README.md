# Kru English - Modern English Learning Platform

A modern, interactive English learning platform built with React, TypeScript, and Express. Offering live Zoom classes with native English teachers, comprehensive course materials, and globally recognized certifications.

## 🌟 Features

- **Live Zoom Classes**: Interactive real-time lessons with native English teachers
- **Multiple Course Levels**: From beginner to advanced with CEFR certification paths
- **24/7 Access**: Recorded classes available for review anytime
- **Free Materials**: Comprehensive learning resources included
- **Level Assessment**: Built-in proficiency testing system
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with Shadcn UI components and Tailwind CSS

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Wouter** - Lightweight client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - High-quality React components
- **Lucide React** - Beautiful SVG icons
- **TanStack Query** - Server state management

### Backend
- **Express.js** - Node.js web application framework
- **TypeScript** - Type-safe server development
- **PostgreSQL** - Database with Neon serverless hosting
- **Drizzle ORM** - Type-safe database operations
- **Stripe** - Secure payment processing
- **Express Sessions** - User session management

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kru-english
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file with:
DATABASE_URL=your_postgresql_url
STRIPE_SECRET_KEY=your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. Start the development server:
```bash
npm run dev
```

## 🌐 Features Overview

### Course Plans
- **General English** (390-590 THB) - 4 live classes per month
- **CEFR Certification** (990-1,490 THB) - 8 classes + certification prep
- **Combo Package** (1,490-2,990 THB) - 12 classes + materials

### Payment Integration
- Secure Stripe payment processing
- Multiple pricing tiers with discounts
- Instant course access after payment

### Level Testing
- A1-A2 proficiency assessment
- Personalized course recommendations
- Progress tracking

### User Experience
- Thai-focused content and support
- LINE integration for communication
- Mobile-responsive design
- Intuitive navigation

## 🔧 Development

### Project Structure
```
├── client/src/          # React frontend
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utilities and constants
├── server/             # Express backend
│   ├── routes.ts       # API routes
│   ├── storage.ts      # Data layer
│   └── index.ts        # Server entry point
└── shared/             # Shared types and schemas
```

### Key Routes
- `/` - Homepage with hero and features
- `/pricing` - Course plans and pricing
- `/level-test` - English proficiency assessment
- `/checkout` - Payment processing
- `/course-access` - Student dashboard
- `/contact` - Contact form and information

## 🎯 Target Audience

This platform is specifically designed for Thai students learning English, featuring:
- Thai language support in UI elements
- Pricing in Thai Baht (THB)
- Integration with LINE for communication
- Cultural considerations for Thai learners

## 🚀 Deployment

The application is ready for deployment on Replit or any Node.js hosting platform. The build process creates optimized production assets and serves them through Express.

## 📱 Mobile Support

Fully responsive design ensures excellent user experience across all devices, from desktop computers to mobile phones.

## 🔒 Security

- Secure payment processing with Stripe
- Environment variable configuration
- Session-based authentication
- Input validation and sanitization

## 📞 Support

For technical support or questions, contact the development team or refer to the in-app contact form with LINE integration.