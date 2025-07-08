import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { LINE_URL, COMPANY_EMAIL, COMPANY_PHONE } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร"),
  email: z.string().email("กรุณากรอกอีเมลที่ถูกต้อง"),
  message: z.string().min(10, "ข้อความต้องมีอย่างน้อย 10 ตัวอักษร"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await apiRequest("POST", "/api/contact", data);
      const result = await response.json();
      
      toast({
        title: "ส่งข้อความสำเร็จ!",
        description: result.message,
      });
      
      reset();
    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              ติดต่อเรา
            </h1>
            <p className="text-xl text-gray-600">พร้อมให้คำปรึกษาและตอบข้อสงสัยทุกเรื่อง</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Friendly teacher consulting students online" 
                className="rounded-xl shadow-lg w-full mb-8"
              />
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <i className="fab fa-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">LINE</h4>
                    <p className="text-gray-600">@kruenglish</p>
                    <a 
                      href={LINE_URL} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {LINE_URL}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-envelope text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">อีเมล</h4>
                    <a 
                      href={`mailto:${COMPANY_EMAIL}`}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {COMPANY_EMAIL}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-phone text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">โทรศัพท์</h4>
                    <a 
                      href={`tel:${COMPANY_PHONE}`}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {COMPANY_PHONE}
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <i className="fab fa-facebook text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Facebook</h4>
                    <p className="text-gray-600">Kru English Thailand</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  ส่งข้อความถึงเรา
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="block text-gray-800 font-medium mb-2">
                      ชื่อ-นามสกุล *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="กรุณากรอกชื่อ-นามสกุล"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-20 outline-none transition-colors"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="block text-gray-800 font-medium mb-2">
                      อีเมล *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-20 outline-none transition-colors"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="block text-gray-800 font-medium mb-2">
                      ข้อความ *
                    </Label>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder="กรุณาระบุคำถามหรือข้อสงสัย"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-20 outline-none transition-colors resize-none"
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        กำลังส่ง...
                      </div>
                    ) : (
                      "ส่งข้อความ"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              คำถามที่พบบ่อย
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    สามารถเรียนได้หลายแพลนพร้อมกันหรือไม่?
                  </h3>
                  <p className="text-gray-600">
                    ได้ครับ คุณสามารถสมัครหลายแพลนพร้อมกันได้ เช่น General English และ CEFR Platinum เพื่อเพิ่มประสิทธิภาพการเรียน
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    หากพลาดคลาสเรียนสดจะมีวิธีการชดเชยอย่างไร?
                  </h3>
                  <p className="text-gray-600">
                    ไม่ต้องกังวลครับ เรามีระบบบันทึกวิดีโอทุกคลาส คุณสามารถดูย้อนหลังได้ 24/7 และยังสามารถถามคำถามในคลาสถัดไปได้
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    ใบเซอร์ CEFR มีความน่าเชื่อถือแค่ไหน?
                  </h3>
                  <p className="text-gray-600">
                    ใบเซอร์ของเราออกโดยสถาบันที่ได้รับการรับรองระดับสากล สามารถใช้สมัครงาน เรียนต่อ หรือขอวีซ่าได้
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    สามารถขอคืนเงินได้หรือไม่?
                  </h3>
                  <p className="text-gray-600">
                    สามารถขอคืนเงินได้ภายใน 7 วันแรก หากไม่พอใจกับการบริการ เราจะคืนเงิน 100% ไม่มีเงื่อนไข
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Contact CTA */}
          <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              ต้องการคำปรึกษาเร่งด่วน?
            </h3>
            <p className="text-gray-600 mb-6">
              ทีมงานของเราพร้อมให้คำปรึกษาผ่าน LINE ตลอด 24 ชั่วโมง
            </p>
            <a 
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover-scale"
            >
              <i className="fab fa-line mr-3 text-xl"></i>
              ติดต่อผ่าน LINE ทันที
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating LINE Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 hover-scale"
          aria-label="ติดต่อผ่าน LINE"
        >
          <i className="fab fa-line text-2xl"></i>
        </a>
      </div>
    </div>
  );
}
