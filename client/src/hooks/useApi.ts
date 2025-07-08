import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ServiceFactory } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

// Query key factory for consistent cache management
export const queryKeys = {
  courses: ['courses'] as const,
  course: (id: number) => ['courses', id] as const,
  profile: ['profile'] as const,
  enrollments: ['enrollments'] as const,
  levelTest: (userId: number) => ['level-test', userId] as const,
  subscription: ['subscription'] as const,
} as const;

// Custom hooks for data fetching - following Single Responsibility Principle
export function useCourses() {
  return useQuery({
    queryKey: queryKeys.courses,
    queryFn: () => ServiceFactory.getCourseService().getCourses(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCourse(id: number) {
  return useQuery({
    queryKey: queryKeys.course(id),
    queryFn: () => ServiceFactory.getCourseService().getCourse(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: () => ServiceFactory.getUserService().getProfile(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useEnrollments() {
  return useQuery({
    queryKey: queryKeys.enrollments,
    queryFn: () => ServiceFactory.getUserService().getEnrollments(),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

export function useLevelTestResults(userId: number) {
  return useQuery({
    queryKey: queryKeys.levelTest(userId),
    queryFn: () => ServiceFactory.getLevelTestService().getResults(userId),
    enabled: !!userId,
  });
}

export function useSubscription() {
  return useQuery({
    queryKey: queryKeys.subscription,
    queryFn: () => ServiceFactory.getPaymentService().getSubscription(),
  });
}

// Custom hooks for mutations - following Single Responsibility Principle
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: any) => ServiceFactory.getUserService().updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useCreatePaymentIntent() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: any) => ServiceFactory.getPaymentService().createPaymentIntent(data),
    onError: (error: Error) => {
      toast({
        title: "Payment Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useSubmitLevelTest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (answers: any[]) => ServiceFactory.getLevelTestService().submitTest(answers),
    onSuccess: (data, variables) => {
      // Invalidate level test results
      queryClient.invalidateQueries({ queryKey: ['level-test'] });
      toast({
        title: "Test Submitted",
        description: "Your level test has been submitted successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useSubmitContact() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: any) => ServiceFactory.getContactService().submitContact(data),
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully. We'll get back to you soon!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Send Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useCreateSubscription() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: any) => ServiceFactory.getPaymentService().createSubscription(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subscription });
      queryClient.invalidateQueries({ queryKey: queryKeys.enrollments });
      toast({
        title: "Subscription Created",
        description: "Your subscription has been created successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Subscription Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}