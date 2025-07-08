import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { contactFormSchema } from '@/utils/validation';
import { useSubmitContact } from '@/hooks/useApi';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Send } from 'lucide-react';
import type { ContactFormData } from '@/types';

interface ContactFormProps {
  onSuccess?: () => void;
  className?: string;
}

export function ContactForm({ onSuccess, className }: ContactFormProps) {
  const submitContactMutation = useSubmitContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitContactMutation.mutateAsync(data);
      reset();
      onSuccess?.();
    } catch (error) {
      // Error is handled by the mutation hook
    }
  };

  const isLoading = isSubmitting || submitContactMutation.isPending;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>ติดต่อเรา</CardTitle>
        <CardDescription>
          ส่งข้อความหาเรา เราจะตอบกลับภายใน 24 ชั่วโมง
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">ชื่อ-นามสกุล *</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="กรุณากรอกชื่อ-นามสกุล"
                disabled={isLoading}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">อีเมล *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="example@email.com"
                disabled={isLoading}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
            <Input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="0xx-xxx-xxxx"
              disabled={isLoading}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">ข้อความ *</Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder="กรุณาระบุข้อความที่ต้องการสอบถาม..."
              rows={5}
              disabled={isLoading}
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <p className="text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                ส่งข้อความ
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}