export const COURSES = {
  GENERAL: 1,
  CEFR: 2,
  COMBO: 3
};

export const GENERAL_ENGLISH_PLANS = [
  {
    duration: "1 เดือน",
    price: 390,
    originalPrice: null,
    discount: null,
    popular: false
  },
  {
    duration: "3 เดือน", 
    price: 1100,
    originalPrice: 1170,
    discount: "6%",
    popular: true
  },
  {
    duration: "6 เดือน",
    price: 2100,
    originalPrice: 2340,
    discount: "10%",
    popular: false
  },
  {
    duration: "12 เดือน",
    price: 4000,
    originalPrice: 4680,
    discount: "15%",
    popular: false
  }
];

export const FEATURES = [
  {
    icon: "fas fa-video",
    title: "เรียนสดผ่าน Zoom",
    description: "เรียนสดกับครูเจ้าของภาษา มากกว่า 120 ชั่วโมงต่อเดือน ทุกวันไม่เว้นวันหยุด",
    color: "blue"
  },
  {
    icon: "fas fa-book-open", 
    title: "เอกสารฟรีครบครัน",
    description: "เอกสารประกอบการเรียนครบครัน แบบฝึกหัด และสื่อการเรียนคุณภาพสูง",
    color: "orange"
  },
  {
    icon: "fas fa-clock",
    title: "ดูย้อนหลัง 24/7", 
    description: "บันทึกการเรียนทุกครั้ง สามารถดูย้อนหลังและทบทวนบทเรียนได้ตลอดเวลา",
    color: "green"
  },
  {
    icon: "fas fa-users",
    title: "ครูไทย + ครูเจ้าของภาษา",
    description: "เรียนกับครูทั้งไทยและเจ้าของภาษา ได้ทั้งการสื่อสารและออกเสียงที่ถูกต้อง", 
    color: "purple"
  },
  {
    icon: "fas fa-certificate",
    title: "ใบเซอร์ระดับโลก",
    description: "รับใบเซอร์จากสถาบันระดับโลก สำหรับแพลน CEFR ที่ได้รับการรับรองมาตรฐาน",
    color: "yellow"
  },
  {
    icon: "fas fa-percentage", 
    title: "ส่วนลดพิเศษ",
    description: "ส่วนลด 10-20% เมื่อซื้อแพลน 3 เดือนขึ้นไป ประหยัดมากขึ้นเมื่อเรียนยาวขึ้น",
    color: "red"
  }
];

export const TESTIMONIALS = [
  {
    name: "สุดารัตน์ จ.",
    role: "นักศึกษาปี 3",
    content: "เรียนสนุกมาก ครูสอนเข้าใจง่าย พูดอังกฤษได้มั่นใจขึ้นมากใน 2 เดือน ตอนนี้สามารถสนทนากับเพื่อนต่างชาติได้แล้ว!",
    avatar: "ส",
    color: "blue"
  },
  {
    name: "ปิยะนุช ว.",
    role: "พนักงานบริษัท", 
    content: "ชอบระบบดูย้อนหลังมาก สามารถเรียนซ้ำได้เรื่อยๆ เวลาทำงานไม่ว่าง ก็ยังสามารถติดตามบทเรียนได้เต็มที่",
    avatar: "ป",
    color: "orange"
  },
  {
    name: "อนันต์ ก.",
    role: "นักธุรกิจ",
    content: "ได้ใบเซอร์ CEFR ระดับ B1 ช่วยในการสมัครงานมาก ครูทั้งไทยและต่างชาติช่วยให้เข้าใจไวยากรณ์และการใช้จริง",
    avatar: "อ", 
    color: "green"
  }
];

export const LEVEL_TEST_QUESTIONS = [
  {
    id: 1,
    question: "What is your name?",
    options: ["My name is John", "I am fine", "Yes, please", "Thank you"],
    correct: 0
  },
  {
    id: 2, 
    question: "How old are you?",
    options: ["I am doctor", "I am 25 years old", "I live in Bangkok", "I like pizza"],
    correct: 1
  },
  {
    id: 3,
    question: "Where do you live?",
    options: ["I am happy", "I live in Thailand", "I have a car", "I am reading"],
    correct: 1
  },
  {
    id: 4,
    question: "I _____ to school every day.",
    options: ["go", "goes", "going", "went"],
    correct: 0
  },
  {
    id: 5,
    question: "She _____ a book right now.",
    options: ["read", "reads", "is reading", "was reading"],
    correct: 2
  },
  {
    id: 6,
    question: "I have _____ this movie before.",
    options: ["see", "saw", "seen", "seeing"],
    correct: 2
  },
  {
    id: 7,
    question: "If I _____ rich, I would travel the world.",
    options: ["am", "was", "were", "will be"],
    correct: 2
  },
  {
    id: 8,
    question: "The book _____ by many people.",
    options: ["is read", "reads", "reading", "to read"],
    correct: 0
  },
  {
    id: 9,
    question: "I wish I _____ speak English fluently.",
    options: ["can", "could", "will", "would"],
    correct: 1
  },
  {
    id: 10,
    question: "The meeting has been _____ until next week.",
    options: ["postponed", "happening", "started", "finished"],
    correct: 0
  }
];

export const LINE_URL = "https://lin.ee/yOEjxmf";
export const COMPANY_EMAIL = "info@kruenglish.com";
export const COMPANY_PHONE = "02-xxx-xxxx";
