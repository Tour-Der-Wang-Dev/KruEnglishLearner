import { PricingPlan, CourseType } from '@/types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'general-1month',
    name: 'General English',
    price: 590,
    originalPrice: 590,
    duration: '1 เดือน',
    features: [
      '4 คลาสสดต่อเดือน',
      'เรียนสดผ่าน Zoom',
      'ครูเจ้าของภาษา',
      'เอกสารฟรี',
      'ดูย้อนหลังได้ 24 ชั่วโมง'
    ]
  },
  {
    id: 'general-3month',
    name: 'General English',
    price: 1590,
    originalPrice: 1770,
    duration: '3 เดือน',
    features: [
      '12 คลาสสดทั้งหมด',
      'เรียนสดผ่าน Zoom',
      'ครูเจ้าของภาษา',
      'เอกสารฟรี',
      'ดูย้อนหลังได้ 24 ชั่วโมง',
      'ประหยัด 10%'
    ],
    isPopular: true
  },
  {
    id: 'general-6month',
    name: 'General English',
    price: 2832,
    originalPrice: 3540,
    duration: '6 เดือน',
    features: [
      '24 คลาสสดทั้งหมด',
      'เรียนสดผ่าน Zoom',
      'ครูเจ้าของภาษา',
      'เอกสารฟรี',
      'ดูย้อนหลังได้ 24 ชั่วโมง',
      'ประหยัด 20%'
    ]
  },
  {
    id: 'cefr-1month',
    name: 'CEFR Certification',
    price: 990,
    originalPrice: 990,
    duration: '1 เดือน',
    features: [
      '8 คลาสสดต่อเดือน',
      'เตรียมสอบ CEFR',
      'ครูเจ้าของภาษา',
      'เอกสารฟรี',
      'ใบเซอร์ระดับโลก',
      'ดูย้อนหลังได้ 24 ชั่วโมง'
    ]
  },
  {
    id: 'cefr-3month',
    name: 'CEFR Certification',
    price: 2673,
    originalPrice: 2970,
    duration: '3 เดือน',
    features: [
      '24 คลาสสดทั้งหมด',
      'เตรียมสอบ CEFR',
      'ครูเจ้าของภาษา',
      'เอกสารฟรี',
      'ใบเซอร์ระดับโลก',
      'ดูย้อนหลังได้ 24 ชั่วโมง',
      'ประหยัด 10%'
    ],
    isRecommended: true
  },
  {
    id: 'cefr-6month',
    name: 'CEFR Certification',
    price: 4752,
    originalPrice: 5940,
    duration: '6 เดือน',
    features: [
      '48 คลาสสดทั้งหมด',
      'เตรียมสอบ CEFR',
      'ครูเจ้าของภาษา',
      'เอกสารฟรี',
      'ใบเซอร์ระดับโลก',
      'ดูย้อนหลังได้ 24 ชั่วโมง',
      'ประหยัด 20%'
    ]
  },
  {
    id: 'combo-8hours',
    name: 'Combo Package',
    price: 1490,
    originalPrice: 1490,
    duration: '8 ชั่วโมง',
    features: [
      '8 ชั่วโมงเรียนส่วนตัว',
      'จองเวลาเรียนเอง',
      'ครูเจ้าของภาษา',
      'เอกสารฟรี',
      'ปรับแต่งเนื้อหาได้',
      'ดูย้อนหลังได้ 24 ชั่วโมง'
    ]
  }
];

export const COURSE_FEATURES = [
  {
    icon: '🎯',
    title: 'คลาสสดผ่าน Zoom',
    description: '120+ ชั่วโมงต่อเดือน'
  },
  {
    icon: '📚',
    title: 'เอกสารฟรี',
    description: 'ครบครันทุกระดับ'
  },
  {
    icon: '⏰',
    title: 'ดูย้อนหลังได้ 24 ชั่วโมง',
    description: 'ไม่พลาดการเรียน'
  },
  {
    icon: '👨‍🏫',
    title: 'ครูไทยและเจ้าของภาษา',
    description: 'มืออาชีพทุกท่าน'
  },
  {
    icon: '🏆',
    title: 'ใบเซอร์ระดับโลก',
    description: 'แพลน CEFR เท่านั้น'
  },
  {
    icon: '💰',
    title: 'ส่วนลด 10-20%',
    description: 'สำหรับแพลน 3+ เดือน'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'คุณอำนาจ ศรีสุข',
    role: 'นักเรียนระดับ A2',
    content: 'ครูสอนดีมาก อธิบายเข้าใจง่าย และได้ฝึกพูดจริงๆ ภาษาอังกฤษดีขึ้นเยอะ',
    rating: 5,
    image: '/api/placeholder/80/80'
  },
  {
    id: 2,
    name: 'คุณสมหญิง จันทร์แก้ว',
    role: 'นักเรียนระดับ B1',
    content: 'ได้ใบเซอร์ CEFR ระดับ B1 แล้ว! ขอบคุณครูทุกท่านที่ช่วยเหลือ',
    rating: 5,
    image: '/api/placeholder/80/80'
  },
  {
    id: 3,
    name: 'คุณวิชัย ทองคำ',
    role: 'นักเรียนระดับ A1',
    content: 'เริ่มจากไม่รู้เลย ตอนนี้พูดได้แล้ว ครูใจดี สอนทีละนิด เข้าใจง่าย',
    rating: 5,
    image: '/api/placeholder/80/80'
  }
];

export const LEVEL_TEST_QUESTIONS = [
  {
    id: 1,
    question: 'What is your name?',
    options: ['My name is John', 'I am fine', 'Yes, please', 'Good morning'],
    correctAnswer: 0
  },
  {
    id: 2,
    question: 'How are you today?',
    options: ['I am teacher', 'I am fine, thank you', 'My name is', 'I like coffee'],
    correctAnswer: 1
  },
  {
    id: 3,
    question: 'What time is it?',
    options: ['It is Monday', 'It is hot', 'It is 3 o\'clock', 'It is good'],
    correctAnswer: 2
  },
  {
    id: 4,
    question: 'Where do you live?',
    options: ['I live in Thailand', 'I like Thailand', 'I am Thai', 'Thailand is good'],
    correctAnswer: 0
  },
  {
    id: 5,
    question: 'Do you like coffee?',
    options: ['Yes, I like', 'Coffee is good', 'I drink coffee', 'Yes, I do'],
    correctAnswer: 3
  }
];

export const COMPANY_INFO = {
  name: 'Kru English',
  lineId: '@kruenglish',
  lineUrl: 'https://lin.ee/yOEjxmf',
  email: 'info@kruenglish.com',
  phone: '02-xxx-xxxx',
  address: 'Bangkok, Thailand'
};