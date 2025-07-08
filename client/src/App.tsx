import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Suspense, lazy, useState } from "react";
import { PageLoading } from "@/components/common/LoadingSpinner";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Sidebar from "@/components/layout/sidebar";

// Lazy load pages for better performance
const Home = lazy(() => import("@/pages/home"));
const Pricing = lazy(() => import("@/pages/pricing"));
const LevelTest = lazy(() => import("@/pages/level-test"));
const Checkout = lazy(() => import("@/pages/checkout"));
const CourseAccess = lazy(() => import("@/pages/course-access"));
const Contact = lazy(() => import("@/pages/contact"));
const AdminSettings = lazy(() => import("@/pages/admin-settings"));
const AdminDashboard = lazy(() => import("@/pages/admin-dashboard"));
const Profile = lazy(() => import("@/pages/profile"));
const ContactNew = lazy(() => import("@/pages/contact-new"));
const NotFound = lazy(() => import("@/pages/not-found"));

function AppContent() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex min-h-screen bg-thai-cream">
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />
      
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Suspense fallback={<PageLoading />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/level-test" component={LevelTest} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/course-access" component={CourseAccess} />
            <Route path="/contact" component={Contact} />
            <Route path="/contact-new" component={ContactNew} />
            <Route path="/admin-settings" component={AdminSettings} />
            <Route path="/admin-dashboard" component={AdminDashboard} />
            <Route path="/admin-courses" component={lazy(() => import("@/pages/admin-courses"))} />
            <Route path="/admin-students" component={lazy(() => import("@/pages/admin-students"))} />
            <Route path="/admin-zoom" component={lazy(() => import("@/pages/admin-zoom"))} />
            <Route path="/profile" component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <TooltipProvider>
            <AppContent />
            <Toaster />
          </TooltipProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
