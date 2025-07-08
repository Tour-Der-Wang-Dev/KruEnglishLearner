# Kru English - Online English Learning Platform

## Overview

This is a modern, full-stack web application for an online English learning platform called "Kru English". The platform allows students to enroll in live English classes via Zoom, access course materials, make payments, and manage their learning journey. The application is built with React frontend, Express.js backend, and PostgreSQL database using Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and lazy loading
- **Routing**: Wouter with proper error boundaries and loading states
- **UI Components**: Radix UI primitives with comprehensive type safety
- **State Management**: TanStack Query with structured query key factory
- **Service Layer**: API client with service factory pattern and interface segregation
- **Styling**: Tailwind CSS with utility formatters and design system
- **Performance**: Lazy loading, caching, debouncing, and performance monitoring
- **Build Tool**: Vite with optimized builds and code splitting

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript throughout
- **API Pattern**: RESTful API with centralized route handling and validation middleware
- **Service Layer**: Dependency injection with interface segregation (IEmailService, IPaymentService)
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Payment Processing**: Stripe service abstraction with proper error handling
- **Session Management**: Express sessions with PostgreSQL store
- **Validation**: Zod-based request validation middleware

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
- **Type-Safe Component Library**: Comprehensive component system with TypeScript interfaces
- **Layout Components**: Reusable Layout, PageLayout, and Section components for consistent structure
- **Form Components**: ContactForm and validation utilities with Zod schemas
- **Common Components**: ErrorBoundary, LoadingSpinner, and performance-optimized components
- **Business Components**: ContactInfo and other domain-specific components
- **UI Kit**: PricingCard, FeatureCard, TestimonialCard with proper prop interfaces

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

### Video Conferencing
- **Zoom API**: Server-to-server OAuth integration for automated meeting creation
- **Features**: Recurring class scheduling, automatic link generation, meeting management
- **Authentication**: Account-based OAuth with secure token management

### AI Integration
- **OpenAI API**: GPT-4o integration for intelligent chatbot responses
- **Features**: Multilingual support, course guidance, platform assistance
- **Fallback**: Rule-based responses when AI service is unavailable

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
- `ZOOM_ACCOUNT_ID`: Zoom account identifier for server-to-server apps
- `ZOOM_API_KEY`: Zoom client ID for OAuth authentication
- `ZOOM_API_SECRET`: Zoom client secret for secure API access
- `OPENAI_API_KEY`: OpenAI API key for AI chatbot functionality

### Hosting Strategy
- Single-deployment full-stack application
- Express serves both API routes and static frontend assets
- PostgreSQL database hosted on Neon with connection pooling
- Production-ready with proper error handling and logging

## Recent Changes

- July 08, 2025: **Real Zoom API Integration** - Comprehensive Zoom meeting automation
  - Implemented ZoomService with OAuth 2.0 server-to-server authentication
  - Created automated class link generation with recurring meeting support
  - Added admin Zoom management interface with meeting CRUD operations
  - Integrated Zoom link generation directly into course creation workflow
  - Added bulk meeting creation and real-time connection testing
  - Enhanced course management with automatic Zoom link provisioning
- July 08, 2025: **Enhanced AI Chatbot Integration**
  - Upgraded sidebar with intelligent AI assistant using OpenAI API
  - Implemented comprehensive rule-based fallback responses
  - Added multilingual support for Thai/English AI conversations
  - Created detailed course information and platform guidance responses
  - Enhanced admin workspace with AI-powered features
- July 08, 2025: **Professional Admin Workspace** - Complete administrative interface
  - Created comprehensive admin sidebar with Thai red color scheme
  - Implemented course management with CRUD operations and Zoom integration
  - Added student management dashboard with payment status tracking
  - Built admin dashboard with payment analytics and system monitoring
  - Enhanced admin interface following Thai design specifications
- January 08, 2025: **Major Code Refactoring** - Comprehensive architecture improvements for better maintainability
  - Created type-safe API service layer with SOLID principles
  - Implemented proper separation of concerns across all components
  - Added comprehensive error handling and loading states
  - Enhanced performance with lazy loading and caching utilities
  - Improved testability with dependency injection patterns
- July 08, 2025: Fixed all TypeScript LSP errors in storage and routes files
- July 08, 2025: Enhanced type safety in data storage methods
- July 08, 2025: Initial setup and MVP completion

## Changelog

- July 08, 2025. Initial setup and full platform development

## User Preferences

Preferred communication style: Simple, everyday language.