import { Link } from "wouter";
import { LINE_URL, COMPANY_EMAIL, COMPANY_PHONE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Kru English</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              แพลตฟอร์มเรียนภาษาอังกฤษออนไลน์ที่ดีที่สุด เรียนสดกับครูเจ้าของภาษา พร้อมเอกสารครบครัน
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-blue-600 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a 
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer" 
                className="bg-green-500 hover:bg-green-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="LINE"
              >
                <i className="fab fa-line"></i>
              </a>
              <a 
                href="#" 
                className="bg-red-500 hover:bg-red-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">เมนูหลัก</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/">
                  <span className="hover:text-white transition-colors cursor-pointer">หน้าแรก</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <span className="hover:text-white transition-colors cursor-pointer">แพลนและราคา</span>
                </Link>
              </li>
              <li>
                <Link href="/level-test">
                  <span className="hover:text-white transition-colors cursor-pointer">ทดสอบระดับ</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="hover:text-white transition-colors cursor-pointer">ติดต่อเรา</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">ติดต่อ</h4>
            <ul className="space-y-2 text-gray-300">
              <li>LINE: @kruenglish</li>
              <li>Email: {COMPANY_EMAIL}</li>
              <li>Tel: {COMPANY_PHONE}</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Kru English. สงวนลิขสิทธิ์ทุกประการ</p>
        </div>
      </div>
    </footer>
  );
}
