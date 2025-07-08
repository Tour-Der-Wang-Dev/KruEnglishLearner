import { Layout } from "@/components/layout/Layout";
import HeroSection from "@/components/sections/hero";
import FeaturesSection from "@/components/sections/features";
import TestimonialsSection from "@/components/sections/testimonials";
import PricingCards from "@/components/sections/pricing-cards";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      
      {/* CTA Section */}
      <section className="py-20 bg-thai-cream">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            พร้อมเริ่มต้นเรียนภาษาอังกฤษแล้วหรือยัง?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            เข้าร่วมกับนักเรียนหลายพันคนที่เรียนกับเรา
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button className="btn-thai-primary px-8 py-4 text-lg font-semibold">
                ดูแพลนและราคา
              </Button>
            </Link>
            <Link href="/level-test">
              <Button 
                variant="outline"
                className="btn-thai-outline px-8 py-4 text-lg font-semibold"
              >
                ทดสอบระดับฟรี
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Floating LINE Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://lin.ee/yOEjxmf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium shadow-lg transition-all duration-200 hover:scale-105"
        >
          <MessageSquare className="h-5 w-5" />
          ติดต่อเรา
        </a>
      </div>
    </Layout>
  );
}