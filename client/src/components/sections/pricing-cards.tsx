import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { GENERAL_ENGLISH_PLANS } from "@/lib/constants";

interface PricingCardsProps {
  showGeneralOnly?: boolean;
}

export default function PricingCards({ showGeneralOnly = false }: PricingCardsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* General English Plan */}
      <div className="bg-white rounded-2xl shadow-xl p-8 relative">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">General English</h3>
          <p className="text-gray-600">เรียนทุกวัน 2 ชั่วโมง</p>
        </div>
        
        <div className="space-y-4 mb-8">
          {GENERAL_ENGLISH_PLANS.map((plan, index) => (
            <div 
              key={index}
              className={`border rounded-lg p-4 ${plan.popular ? 'border-2 border-orange-500 relative' : 'border border-gray-200'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ประหยัด {plan.discount}
                </div>
              )}
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{plan.duration}</span>
                <div className="text-right">
                  {plan.originalPrice && (
                    <span className="text-lg line-through text-gray-400">{plan.originalPrice.toLocaleString()}</span>
                  )}
                  <span className={`text-2xl font-bold ml-2 ${plan.popular ? 'text-orange-500' : 'text-blue-600'}`}>
                    {plan.price.toLocaleString()} บาท
                  </span>
                </div>
              </div>
              <Link href={`/checkout?course=1&plan=${index}&amount=${plan.price}`}>
                <Button 
                  className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    plan.popular 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white'
                      : index === 2 
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : index === 3
                          ? 'bg-purple-600 hover:bg-purple-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  ซื้อเลย
                </Button>
              </Link>
            </div>
          ))}
        </div>
        
        <ul className="space-y-3 text-sm text-gray-600">
          <li className="flex items-center">
            <i className="fas fa-check text-green-500 mr-3"></i>
            เรียนทุกวัน 2 ชั่วโมง
          </li>
          <li className="flex items-center">
            <i className="fas fa-check text-green-500 mr-3"></i>
            เอกสารประกอบการเรียนฟรี
          </li>
          <li className="flex items-center">
            <i className="fas fa-check text-green-500 mr-3"></i>
            วิดีโอย้อนหลัง 24/7
          </li>
        </ul>
      </div>

      {!showGeneralOnly && (
        <>
          {/* CEFR Platinum Plan */}
          <div className="bg-white rounded-2xl shadow-xl p-8 relative border-4 border-orange-500">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-6 py-2 rounded-full font-semibold">
              แนะนำ
            </div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">CEFR Platinum English</h3>
              <p className="text-gray-600">A1-B1 พร้อมใบเซอร์</p>
            </div>
            
            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-orange-500 mb-2">590 บาท</div>
              <div className="text-gray-600">ต่อเดือน (4 เดือน)</div>
            </div>
            
            <div className="space-y-4 mb-8">
              <Link href="/level-test">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                  ทดสอบระดับภาษา
                </Button>
              </Link>
              <Link href="/checkout?course=2&amount=590">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors">
                  ซื้อเลย
                </Button>
              </Link>
            </div>
            
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                120 ชั่วโมงเรียน
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                สัปดาห์ละ 2 ชั่วโมง
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                วัดระดับก่อนเรียน
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                รับใบเซอร์ระดับโลก
              </li>
            </ul>
          </div>

          {/* Combo Small Group Plan */}
          <div className="bg-white rounded-2xl shadow-xl p-8 relative">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Combo Small Group</h3>
              <p className="text-gray-600">กลุ่มเล็ก 5 คน</p>
            </div>
            
            <div className="text-center mb-8">
              <div className="text-4xl font-bold text-blue-600 mb-2">1,500 บาท</div>
              <div className="text-gray-600">8 ชั่วโมง</div>
            </div>
            
            <div className="mb-8">
              <Link href="/checkout?course=3&amount=1500">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                  จองเลย
                </Button>
              </Link>
            </div>
            
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                กลุ่มเล็ก 5 คนเท่านั้น
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                เน้นการสนทนา
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                จัดกลุ่มตามระดับ
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-3"></i>
                ความสนใจส่วนตัวสูง
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
