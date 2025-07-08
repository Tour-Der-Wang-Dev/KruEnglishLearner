import { useState, useEffect } from 'react';
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  Clock,
  ArrowLeft,
  Loader2
} from 'lucide-react';

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutFormProps {
  amount: number;
  courseName: string;
  planDuration: string;
  onSuccess: () => void;
  onBack: () => void;
}

const CheckoutForm = ({ amount, courseName, planDuration, onSuccess, onBack }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success' | 'error'>('form');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentStep('processing');

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/course-access?success=true`,
        },
        redirect: 'if_required'
      });

      if (error) {
        setPaymentStep('error');
        toast({
          title: t('payment.failed'),
          description: error.message,
          variant: "destructive",
        });
      } else {
        setPaymentStep('success');
        toast({
          title: t('payment.success'),
          description: "Thank you for your purchase!",
        });
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (err) {
      setPaymentStep('error');
      toast({
        title: t('payment.failed'),
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getStepProgress = () => {
    switch (paymentStep) {
      case 'form': return 25;
      case 'processing': return 75;
      case 'success': return 100;
      case 'error': return 50;
      default: return 0;
    }
  };

  if (paymentStep === 'success') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="text-center p-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {t('payment.success')}
          </h3>
          <p className="text-gray-600 mb-6">
            คุณจะได้รับอีเมลยืนยันและลิงก์เข้าคลาสในอีกสักครู่
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>คอร์ส: {courseName}</p>
            <p>แพลน: {planDuration}</p>
            <p>จำนวนเงิน: ฿{amount.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Progress Bar */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-thai-cream">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {paymentStep === 'form' && 'กรอกข้อมูลการชำระเงิน'}
            {paymentStep === 'processing' && 'กำลังดำเนินการชำระเงิน'}
            {paymentStep === 'error' && 'เกิดข้อผิดพลาด'}
          </span>
          <span className="text-sm text-gray-500">{getStepProgress()}%</span>
        </div>
        <Progress value={getStepProgress()} className="h-2" />
      </div>

      {/* Order Summary */}
      <Card className="border-thai-cream">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-thai-red">
            <CreditCard className="h-5 w-5" />
            สรุปการสั่งซื้อ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-gray-800">{courseName}</h4>
                <p className="text-sm text-gray-600">{planDuration}</p>
                <Badge variant="secondary" className="mt-1">
                  ส่วนลดพิเศษ 20%
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-lg line-through text-gray-400">
                  ฿{(amount * 1.25).toLocaleString()}
                </p>
                <p className="text-2xl font-bold text-thai-red">
                  ฿{amount.toLocaleString()}
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>ราคาคอร์ส</span>
                <span>฿{amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>ส่วนลด</span>
                <span className="text-green-600">-฿{(amount * 0.25).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>รวมทั้งสิ้น</span>
                <span>฿{amount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card className="border-thai-cream">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-thai-red">
            <Shield className="h-5 w-5" />
            ข้อมูลการชำระเงิน
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4 text-green-500" />
            ข้อมูลของคุณปลอดภัยด้วย SSL Encryption
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 border border-thai-cream rounded-lg bg-thai-cream bg-opacity-20">
              <PaymentElement 
                options={{
                  layout: 'tabs',
                  paymentMethodOrder: ['card', 'ideal', 'sepa_debit']
                }}
              />
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="h-4 w-4" />
              การชำระเงินจะใช้เวลาประมาณ 1-2 นาที
            </div>
            
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1 border-thai-red text-thai-red hover:bg-thai-red hover:text-white"
                disabled={isProcessing}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                กลับ
              </Button>
              
              <Button
                type="submit"
                disabled={!stripe || isProcessing}
                className="flex-1 bg-thai-red hover:bg-thai-rose text-white"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {t('payment.processing')}
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    ชำระเงิน ฿{amount.toLocaleString()}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default function EnhancedCheckout({ amount, courseName, planDuration, onSuccess, onBack }: CheckoutFormProps) {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Create PaymentIntent as soon as the component loads
    apiRequest("POST", "/api/create-payment-intent", { amount })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error creating payment intent:', error);
        setIsLoading(false);
      });
  }, [amount]);

  if (isLoading || !clientSecret) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-thai-red mx-auto mb-4" />
          <p className="text-gray-600">กำลังเตรียมหน้าชำระเงิน...</p>
        </div>
      </div>
    );
  }

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#60121f',
      colorBackground: '#f8f1ed',
      colorText: '#2a2a2a',
      colorDanger: '#df1b41',
      borderRadius: '8px',
    },
  };

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      <CheckoutForm 
        amount={amount}
        courseName={courseName}
        planDuration={planDuration}
        onSuccess={onSuccess}
        onBack={onBack}
      />
    </Elements>
  );
}