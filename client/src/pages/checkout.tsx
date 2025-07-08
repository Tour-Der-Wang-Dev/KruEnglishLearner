import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ courseId, amount }: { courseId: string, amount: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!customerInfo.name || !customerInfo.email) {
      toast({
        title: "กรุณากรอกข้อมูล",
        description: "โปรดกรอกชื่อและอีเมลให้ครบถ้วน",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/course-access`,
        receipt_email: customerInfo.email,
      },
    });

    if (error) {
      toast({
        title: "การชำระเงินล้มเหลว",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "การชำระเงินสำเร็จ!",
        description: "ขอบคุณสำหรับการสมัครเรียน คุณสามารถเข้าเรียนได้แล้ว",
      });
      setLocation('/course-access');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">ชื่อ-นามสกุล *</Label>
          <Input
            id="name"
            type="text"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
            placeholder="กรุณากรอกชื่อ-นามสกุล"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">อีเมล *</Label>
          <Input
            id="email"
            type="email"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
            placeholder="your@email.com"
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="phone">เบอร์โทร</Label>
        <Input
          id="phone"
          type="tel"
          value={customerInfo.phone}
          onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
          placeholder="0xx-xxx-xxxx"
        />
      </div>

      <div className="border-t pt-6">
        <Label className="text-base font-medium mb-4 block">ข้อมูลการชำระเงิน</Label>
        <PaymentElement />
      </div>

      <Button 
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
            กำลังดำเนินการ...
          </div>
        ) : (
          `ชำระเงิน ${parseInt(amount).toLocaleString()} บาท`
        )}
      </Button>

      <div className="text-sm text-gray-600 text-center">
        <p>การชำระเงินมีความปลอดภัยด้วยระบบ SSL Encryption</p>
        <p className="mt-1">ข้อมูลบัตรเครดิตของคุณจะไม่ถูกเก็บไว้ในระบบ</p>
      </div>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [courseInfo, setCourseInfo] = useState<any>(null);

  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('course') || '1';
  const amount = urlParams.get('amount') || '390';
  const plan = urlParams.get('plan');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        const response = await apiRequest("POST", "/api/create-payment-intent", { 
          courseId: parseInt(courseId),
          amount: parseInt(amount),
          userEmail: '',
          userName: ''
        });
        
        const data = await response.json();
        setClientSecret(data.clientSecret);
        
        // Get course info
        const courseResponse = await apiRequest("GET", `/api/courses/${courseId}`);
        const course = await courseResponse.json();
        setCourseInfo(course);
      } catch (error) {
        console.error('Error creating payment intent:', error);
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [courseId, amount]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" aria-label="Loading"/>
        </div>
        <Footer />
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="pt-6 text-center">
              <p className="text-red-600">เกิดข้อผิดพลาดในการสร้างการชำระเงิน</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              ชำระเงิน
            </h1>
            <p className="text-xl text-gray-600">กรุณากรอกข้อมูลเพื่อดำเนินการชำระเงิน</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>สรุปคำสั่งซื้อ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {courseInfo && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800">{courseInfo.name}</h4>
                    <p className="text-gray-600">{courseInfo.description}</p>
                    {plan && (
                      <p className="text-sm text-gray-500 mt-2">แพลน: {plan}</p>
                    )}
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>ราคารวม</span>
                    <span className="text-blue-600">{parseInt(amount).toLocaleString()} บาท</span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-800 mb-2">สิ่งที่คุณจะได้รับ:</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• เข้าถึงคลาสเรียนสดผ่าน Zoom</li>
                    <li>• เอกสารประกอบการเรียนฟรี</li>
                    <li>• วิดีโอย้อนหลัง 24/7</li>
                    <li>• การสนับสนุนจากทีมงาน</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลการชำระเงิน</CardTitle>
              </CardHeader>
              <CardContent>
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm courseId={courseId} amount={amount} />
                </Elements>
              </CardContent>
            </Card>
          </div>

          {/* Security Notice */}
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <i className="fas fa-shield-alt text-green-600 text-xl mr-3"></i>
              <div>
                <h4 className="font-semibold text-green-800">การชำระเงินปลอดภัย</h4>
                <p className="text-green-700 text-sm">
                  ระบบการชำระเงินของเราใช้เทคโนโลยี SSL และ PCI DSS เพื่อปกป้องข้อมูลของคุณ
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
