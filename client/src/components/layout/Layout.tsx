import { ReactNode } from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  includeNavbar?: boolean;
  includeFooter?: boolean;
}

export function Layout({ 
  children, 
  className,
  includeNavbar = true,
  includeFooter = true 
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {includeNavbar && <Navbar />}
      
      <main className={cn('flex-1', className)}>
        {children}
      </main>
      
      {includeFooter && <Footer />}
    </div>
  );
}

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export function PageLayout({ 
  children, 
  title, 
  description, 
  className 
}: PageLayoutProps) {
  return (
    <Layout>
      <div className={cn('container mx-auto px-4 py-8', className)}>
        {(title || description) && (
          <div className="mb-8">
            {title && (
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-gray-600">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </Layout>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Section({ children, className, containerClassName }: SectionProps) {
  return (
    <section className={cn('py-16', className)}>
      <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', containerClassName)}>
        {children}
      </div>
    </section>
  );
}