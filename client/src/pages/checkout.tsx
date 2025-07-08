import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/contexts/LanguageContext';
import EnhancedCheckout from '@/components/payment/enhanced-checkout';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({
    courseName: 'General English Course',
    planDuration: '1 เดือน',
    amount: 390
  });

  // Get plan details from URL params or use default
  const urlParams = new URLSearchParams(window.location.search);
  const plan = urlParams.get('plan') || 'general';
  const duration = urlParams.get('duration') || '1-month';

  // Plan configurations
  const planConfigs = {
    'general-1-month': { courseName: 'General English', planDuration: '1 เดือน', amount: 390 },
    'general-3-months': { courseName: 'General English', planDuration: '3 เดือน', amount: 1050 },
    'general-6-months': { courseName: 'General English', planDuration: '6 เดือน', amount: 1950 },
    'cefr-1-month': { courseName: 'CEFR Platinum', planDuration: '1 เดือน', amount: 790 },
    'cefr-3-months': { courseName: 'CEFR Platinum', planDuration: '3 เดือน', amount: 2100 },
    'cefr-6-months': { courseName: 'CEFR Platinum', planDuration: '6 เดือน', amount: 3900 },
    'combo-1-month': { courseName: 'Combo Small Group', planDuration: '1 เดือน', amount: 1390 },
    'combo-3-months': { courseName: 'Combo Small Group', planDuration: '3 เดือน', amount: 3900 },
    'combo-6-months': { courseName: 'Combo Small Group', planDuration: '6 เดือน', amount: 7200 }
  };

  const planKey = `${plan}-${duration}` as keyof typeof planConfigs;
  const currentPlan = planConfigs[planKey] || planConfigs['general-1-month'];

  // Set plan on component mount
  React.useEffect(() => {
    setSelectedPlan(currentPlan);
  }, [currentPlan]);

  const handleSuccess = () => {
    toast({
      title: t('payment.success'),
      description: "คุณจะได้รับอีเมลยืนยันและสามารถเข้าถึงคอร์สได้ทันที"
    });
    setLocation('/course-access?success=true');
  };

  const handleBack = () => {
    setLocation('/pricing');
  };

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-thai-cream py-8">
        <div className="container mx-auto px-4">
          <EnhancedCheckout
            amount={selectedPlan.amount}
            courseName={selectedPlan.courseName}
            planDuration={selectedPlan.planDuration}
            onSuccess={handleSuccess}
            onBack={() => setShowCheckout(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-thai-cream py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-thai-red mb-2">
            {t('payment.title')}
          </h1>
          <p className="text-gray-600">
            กรุณาตรวจสอบรายละเอียดและดำเนินการชำระเงิน
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="border-thai-cream shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-thai-red">
                <ShoppingCart className="h-5 w-5" />
                สรุปคำสั่งซื้อ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-thai-cream bg-opacity-30 p-4 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {selectedPlan.courseName}
                </h3>
                <p className="text-gray-600 mb-4">แพลน: {selectedPlan.planDuration}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>ราคาเต็ม</span>
                    <span className="line-through text-gray-400">
                      ฿{(selectedPlan.amount * 1.25).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>ส่วนลด 20%</span>
                    <span>-฿{(selectedPlan.amount * 0.25).toLocaleString()}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold text-thai-red">
                    <span>ราคาสุทธิ</span>
                    <span>฿{selectedPlan.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>เรียนสดผ่าน Zoom พร้อมครูเจ้าของภาษา</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>เอกสารการเรียนฟรี (PDF Download)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>ดูย้อนหลังได้ 7 วัน</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>รับใบเซอร์ระดับโลก</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Card */}
          <Card className="border-thai-cream shadow-lg">
            <CardHeader>
              <CardTitle className="text-thai-red">
                เริ่มต้นการเรียน
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-thai-red mb-2">
                  ฿{selectedPlan.amount.toLocaleString()}
                </div>
                <p className="text-gray-600">{selectedPlan.planDuration}</p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-thai-red hover:bg-thai-rose text-white text-lg py-6"
                  size="lg"
                >
                  ดำเนินการชำระเงิน
                </Button>

                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="w-full border-thai-red text-thai-red hover:bg-thai-red hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  กลับไปเลือกแพลน
                </Button>
              </div>

              <div className="text-xs text-gray-500 text-center">
                <p>การชำระเงินปลอดภัยด้วย Stripe SSL Encryption</p>
                <p>สามารถยกเลิกได้ภายใน 7 วัน</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}