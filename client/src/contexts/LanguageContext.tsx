import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'th' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  th: {
    // Navigation
    'nav.home': 'หน้าหลัก',
    'nav.courses': 'คอร์สเรียน',
    'nav.pricing': 'ราคา',
    'nav.contact': 'ติดต่อ',
    'nav.profile': 'โปรไฟล์',
    'nav.schedule': 'ตารางเรียน',
    'nav.levelTest': 'ทดสอบระดับ',
    'nav.payment': 'การชำระเงิน',
    'nav.admin': 'แอดมิน',
    
    // Hero Section
    'hero.title': 'เรียนภาษาอังกฤษสด',
    'hero.subtitle': 'กับครูเจ้าของภาษา',
    'hero.highlight': 'ตลอด 24 ชั่วโมง!',
    'hero.description': 'เรียนสดผ่าน Zoom พร้อมเอกสารฟรี ดูย้อนหลังได้ และรับใบเซอร์ระดับโลก เริ่มต้นเพียง 390 บาท',
    'hero.viewPricing': 'ดูแพลนและราคา',
    'hero.tryFree': 'ทดลองเรียนฟรี',
    
    // Features
    'features.title': 'ทำไมต้องเลือก Kru English?',
    'features.subtitle': 'แพลตฟอร์มเรียนภาษาอังกฤษที่ครบครันที่สุด พร้อมครูเจ้าของภาษาและเทคโนโลยีทันสมัย',
    
    // Pricing
    'pricing.title': 'แพลนและราคา',
    'pricing.subtitle': 'เลือกแพลนที่เหมาะกับคุณ ส่วนลดพิเศษสำหรับแพลนระยะยาว',
    'pricing.discount': 'ส่วนลด 10-20% เมื่อซื้อ 3 เดือนขึ้นไป!',
    'pricing.buyNow': 'ซื้อเลย',
    'pricing.selectPlan': 'เลือกแพลน',
    
    // Payment
    'payment.title': 'ชำระเงิน',
    'payment.processing': 'กำลังดำเนินการ...',
    'payment.success': 'ชำระเงินสำเร็จ!',
    'payment.failed': 'การชำระเงินล้มเหลว',
    'payment.confirm': 'ยืนยันการชำระเงิน',
    
    // Contact
    'contact.title': 'ติดต่อเรา',
    'contact.name': 'ชื่อ',
    'contact.email': 'อีเมล',
    'contact.phone': 'เบอร์โทร',
    'contact.message': 'ข้อความ',
    'contact.send': 'ส่งข้อความ',
    
    // Common
    'common.loading': 'กำลังโหลด...',
    'common.error': 'เกิดข้อผิดพลาด',
    'common.success': 'สำเร็จ',
    'common.cancel': 'ยกเลิก',
    'common.save': 'บันทึก',
    'common.edit': 'แก้ไข',
    'common.delete': 'ลบ',
    'common.back': 'กลับ',
    'common.next': 'ถัดไป'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.courses': 'Courses',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',
    'nav.profile': 'Profile',
    'nav.schedule': 'Schedule',
    'nav.levelTest': 'Level Test',
    'nav.payment': 'Payment',
    'nav.admin': 'Admin',
    
    // Hero Section
    'hero.title': 'Learn English Live',
    'hero.subtitle': 'with Native Teachers',
    'hero.highlight': '24/7 Available!',
    'hero.description': 'Live classes via Zoom with free materials, recordings, and world-class certificates. Starting from just 390 THB',
    'hero.viewPricing': 'View Plans & Pricing',
    'hero.tryFree': 'Try Free Class',
    
    // Features
    'features.title': 'Why Choose Kru English?',
    'features.subtitle': 'The most comprehensive English learning platform with native teachers and modern technology',
    
    // Pricing
    'pricing.title': 'Plans & Pricing',
    'pricing.subtitle': 'Choose the plan that suits you. Special discounts for long-term plans',
    'pricing.discount': '10-20% discount when you buy 3+ months!',
    'pricing.buyNow': 'Buy Now',
    'pricing.selectPlan': 'Select Plan',
    
    // Payment
    'payment.title': 'Payment',
    'payment.processing': 'Processing...',
    'payment.success': 'Payment Successful!',
    'payment.failed': 'Payment Failed',
    'payment.confirm': 'Confirm Payment',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.back': 'Back',
    'common.next': 'Next'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('th');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('kru-english-language') as Language;
    if (savedLanguage && (savedLanguage === 'th' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('kru-english-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}