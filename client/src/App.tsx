import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Suspense, lazy } from "react";
import { PageLoading } from "@/components/common/LoadingSpinner";

// Lazy load pages for better performance
const Home = lazy(() => import("@/pages/home"));
const Pricing = lazy(() => import("@/pages/pricing"));
const LevelTest = lazy(() => import("@/pages/level-test"));
const Checkout = lazy(() => import("@/pages/checkout"));
const CourseAccess = lazy(() => import("@/pages/course-access"));
const Contact = lazy(() => import("@/pages/contact"));
const AdminSettings = lazy(() => import("@/pages/admin-settings"));
const Profile = lazy(() => import("@/pages/profile"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/level-test" component={LevelTest} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/course-access" component={CourseAccess} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin-settings" component={AdminSettings} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
