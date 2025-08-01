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
                  className="border-white text-white hover:bg-white hover:text-thai-red px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
                >
                  ทดลองเรียนฟรี
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative animate-slide-up">
            <img 
              src="/api/placeholder/600/400" 
              alt="English Learning with Native Teachers"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-thai-red px-4 py-2 rounded-full font-bold">
              ⭐ 4.9/5
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white text-thai-red px-4 py-2 rounded-full font-bold shadow-lg">
              🎯 1000+ นักเรียน
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}