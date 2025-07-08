# Kru English - Online English Learning Platform

## Overview

This is a modern, full-stack web application for an online English learning platform called "Kru English". The platform allows students to enroll in live English classes via Zoom, access course materials, make payments, and manage their learning journey. The application is built with React frontend, Express.js backend, and PostgreSQL database using Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **UI Components**: Radix UI primitives with custom Tailwind CSS styling (shadcn/ui system)
- **State Management**: TanStack Query (React Query) for server state
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript throughout
- **API Pattern**: RESTful API with centralized route handling
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Payment Processing**: Stripe integration for secure payments
- **Session Management**: Express sessions with PostgreSQL store

### Database Architecture
- **Database**: PostgreSQL with Neon serverless hosting
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Tables**: Users, courses, enrollments, teachers, schedules, level tests, contacts
- **Relationships**: Properly normalized with foreign key constraints

## Key Components

### Pages Structure
- **Home Page**: Hero section, features, testimonials, and CTA sections
- **Pricing Page**: Three course plans (General English, CEFR, Combo) with discount tiers
- **Level Test Page**: Interactive A1-A2 English proficiency assessment
- **Checkout Page**: Stripe-powered payment processing with customer information collection
- **Course Access Page**: Post-purchase dashboard with schedule, materials, and Zoom links
- **Contact Page**: Contact form and business information

### UI Components
- Comprehensive component library based on Radix UI primitives
- Custom styled components using Tailwind CSS
- Responsive design patterns throughout
- Form components with validation using React Hook Form and Zod
- Interactive elements with proper accessibility support

### Layout Components
- **Navbar**: Sticky navigation with active route highlighting and mobile menu
- **Footer**: Company information, social links, and site navigation
- **Section Components**: Reusable hero, features, testimonials, and pricing sections

## Data Flow

### User Journey
1. **Discovery**: Users land on homepage and explore features/pricing
2. **Assessment**: Optional level test to determine appropriate course
3. **Purchase**: Stripe checkout flow with course selection and customer data
4. **Access**: Post-payment redirection to course dashboard with materials and schedule
5. **Learning**: Ongoing access to live classes, recordings, and downloadable materials

### Payment Flow
1. Course selection with pricing tier choice
2. Customer information collection (name, email, phone)
3. Stripe Payment Element integration for secure card processing
4. Payment confirmation and user record creation
5. Enrollment record creation with course access provisioning

### Data Storage
- User profiles with Stripe customer integration
- Course catalog with pricing and feature information
- Enrollment tracking with payment intent linkage
- Teacher profiles with scheduling information
- Contact form submissions and level test results

## External Dependencies

### Payment Processing
- **Stripe**: Complete payment infrastructure with webhooks for subscription management
- **Payment Methods**: Credit/debit cards through Stripe Elements

### Database Hosting
- **Neon**: Serverless PostgreSQL with connection pooling
- **Connection**: @neondatabase/serverless for edge-compatible database access

### UI and Styling
- **Radix UI**: Accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **shadcn/ui**: Pre-built component system with consistent styling

### Development Tools
- **Vite**: Fast build tool with HMR and optimized production builds
- **TypeScript**: Type safety across frontend and backend
- **ESLint/Prettier**: Code quality and formatting
- **Drizzle Kit**: Database schema management and migrations

## Deployment Strategy

### Development Environment
- Vite dev server for frontend with hot module replacement
- Express server with TypeScript compilation via tsx
- Environment variables for database and Stripe configuration
- Replit-specific plugins for development experience

### Production Build
- Vite builds optimized frontend assets to `dist/public`
- ESBuild compiles backend TypeScript to `dist/index.js`
- Serve static files through Express in production
- Database migrations applied via Drizzle Kit

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string (Neon)
- `STRIPE_SECRET_KEY`: Stripe API key for payment processing
- `VITE_STRIPE_PUBLIC_KEY`: Stripe publishable key for frontend

### Hosting Strategy
- Single-deployment full-stack application
- Express serves both API routes and static frontend assets
- PostgreSQL database hosted on Neon with connection pooling
- Production-ready with proper error handling and logging

## Changelog

- July 08, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.