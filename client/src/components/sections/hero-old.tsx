import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="gradient-thai-red text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              เรียนภาษาอังกฤษสด<br />
              กับครูเจ้าของภาษา<br />
              <span className="text-yellow-300">ตลอด 24 ชั่วโมง!</span>
            </h1>
            <p className="text-xl mb-8 opacity-90">
              เรียนสดผ่าน Zoom พร้อมเอกสารฟรี ดูย้อนหลังได้ และรับใบเซอร์ระดับโลก เริ่มต้นเพียง 390 บาท
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/pricing">
                <Button className="btn-thai-secondary px-8 py-4 text-lg font-semibold">
                  ดูแพลนและราคา
                </Button>
              </Link>
              <Link href="/level-test">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-thai-red px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
                >
                  ทดลองเรียนฟรี
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative animate-slide-up">
            <img 
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Online English class with students learning via video call" 
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 w-3 h-3 rounded-full"></div>
                <span className="text-gray-800 font-semibold">มีนักเรียน 1,200+ คน</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
