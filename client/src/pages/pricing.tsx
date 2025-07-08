import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import PricingCards from "@/components/sections/pricing-cards";
import { LINE_URL } from "@/lib/constants";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="py-20 bg-thai-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              แพลนและราคา
            </h1>
            <p className="text-xl text-gray-600 mb-8">เลือกแพลนที่เหมาะกับคุณ ส่วนลดพิเศษสำหรับแพลนระยะยาว</p>
            <div className="bg-thai-orange text-white py-2 px-6 rounded-full inline-block font-semibold">
              ส่วนลด 10-20% เมื่อซื้อ 3 เดือนขึ้นไป!
            </div>
          </div>
          
          <PricingCards />

          {/* Additional Benefits Section */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              สิ่งที่คุณจะได้รับทุกแพลน
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-thai-cream w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-thai-red">
                  <i className="fas fa-video text-thai-red text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">เรียนสดผ่าน Zoom</h4>
                <p className="text-sm text-gray-600">ติดต่อตรงกับครูและเพื่อนร่วมชั้น</p>
              </div>
              
              <div className="text-center">
                <div className="bg-thai-cream w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-thai-rose">
                  <i className="fas fa-download text-thai-rose text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">เอกสารฟรี</h4>
                <p className="text-sm text-gray-600">หนังสือเรียนและแบบฝึกหัดครบชุด</p>
              </div>
              
              <div className="text-center">
                <div className="bg-thai-cream w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-thai-orange">
                  <i className="fas fa-play-circle text-thai-orange text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">วิดีโอย้อนหลัง</h4>
                <p className="text-sm text-gray-600">ดูซ้ำได้ไม่จำกัดตลอด 24 ชั่วโมง</p>
              </div>
              
              <div className="text-center">
                <div className="bg-thai-cream w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-thai-red">
                  <i className="fas fa-headset text-thai-red text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">สนับสนุน 24/7</h4>
                <p className="text-sm text-gray-600">ทีมงานพร้อมช่วยเหลือตลอดเวลา</p>
              </div>
            </div>
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
