import { Layout, Section } from "@/components/layout/Layout";
import HeroSection from "@/components/sections/hero";
import FeaturesSection from "@/components/sections/features";
import TestimonialsSection from "@/components/sections/testimonials";
import PricingCards from "@/components/sections/pricing-cards";

export default function Home() {
  return (
    <Layout>
      
      <HeroSection />
      
      <FeaturesSection />
      
      <TestimonialsSection />
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            พร้อมเริ่มต้นการเรียนแล้วหรือยัง?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            เลือกแพลนที่เหมาะกับคุณและเริ่มเรียนภาษาอังกฤษได้เลยวันนี้
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover-scale">
                ดูแพลนและราคา
              </Button>
            </Link>
            <Link href="/level-test">
              <Button 
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
              >
                ทดสอบระดับฟรี
              </Button>
            </Link>
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
