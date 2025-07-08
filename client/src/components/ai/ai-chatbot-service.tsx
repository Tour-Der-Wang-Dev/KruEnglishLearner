import { apiRequest } from '@/lib/queryClient';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export class AIChatbotService {
  private static instance: AIChatbotService;

  static getInstance(): AIChatbotService {
    if (!AIChatbotService.instance) {
      AIChatbotService.instance = new AIChatbotService();
    }
    return AIChatbotService.instance;
  }

  async generateResponse(userMessage: string, language: 'th' | 'en', context?: any): Promise<string> {
    try {
      // First try OpenAI if API key is available
      if (process.env.OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY) {
        return await this.generateOpenAIResponse(userMessage, language, context);
      }
      
      // Fallback to rule-based responses
      return this.generateRuleBasedResponse(userMessage, language);
    } catch (error) {
      console.error('AI Response Error:', error);
      return this.generateRuleBasedResponse(userMessage, language);
    }
  }

  private async generateOpenAIResponse(userMessage: string, language: 'th' | 'en', context?: any): Promise<string> {
    try {
      const systemPrompt = language === 'th' 
        ? `คุณคือ AI Assistant ของ Kru English โรงเรียนสอนภาษาอังกฤษออนไลน์ คุณสามารถช่วยตอบคำถามเกี่ยวกับ:
        - คอร์สเรียน: General English (390฿), CEFR Platinum (790฿), Combo Small Group (1,390฿)
        - ตารางเรียน: 09:00-21:00 ทุกวัน
        - ครูเจ้าของภาษาจากอเมริกา อังกฤษ ออสเตรเลีย
        - การชำระเงินผ่าน Stripe
        - ใบเซอร์ติฟิเคตระดับโลก
        - คลาสสดผ่าน Zoom
        ตอบเป็นภาษาไทยอย่างเป็นมิตรและให้ข้อมูลที่ถูกต้อง`
        : `You are the AI Assistant for Kru English, an online English learning platform. You can help answer questions about:
        - Courses: General English (390 THB), CEFR Platinum (790 THB), Combo Small Group (1,390 THB)
        - Schedule: 09:00-21:00 daily
        - Native teachers from USA, UK, Australia
        - Stripe payment processing
        - International certificates
        - Live Zoom classes
        Answer in English in a friendly and informative manner.`;

      const response = await apiRequest('POST', '/api/ai/chat', {
        message: userMessage,
        language,
        systemPrompt,
        context
      });

      const data = await response.json();
      return data.response || this.generateRuleBasedResponse(userMessage, language);
    } catch (error) {
      throw error;
    }
  }

  private generateRuleBasedResponse(userMessage: string, language: 'th' | 'en'): string {
    const input = userMessage.toLowerCase();
    
    if (language === 'th') {
      // Thai responses
      if (input.includes('ราคา') || input.includes('แพลน') || input.includes('เงิน')) {
        return `เรามีแพลนให้เลือก 3 แบบครับ:
        
📚 **General English** - 390฿/เดือน
- เหมาะสำหรับผู้เริ่มต้น
- เรียนสดผ่าน Zoom
- เอกสารฟรี + ดูย้อนหลัง

🏆 **CEFR Platinum** - 790฿/เดือน  
- เตรียมสอบ CEFR ระดับโลก
- ครูเจ้าของภาษา
- รับใบเซอร์ติฟิเคต

👥 **Combo Small Group** - 1,390฿/เดือน
- กลุ่มเล็ก 8 คนต่อห้อง
- ฝึกการสนทนาเข้มข้น
- คุ้มค่าที่สุด!

💰 **ส่วนลดพิเศษ 10-20%** เมื่อซื้อ 3 เดือนขึ้นไป!`;
      }
      
      if (input.includes('เวลา') || input.includes('ตาราง') || input.includes('schedule')) {
        return `⏰ **ตารางเรียน Kru English**

🌅 **เช้า**: 09:00 - 12:00
🌞 **บ่าย**: 13:00 - 17:00  
🌙 **ค่ำ**: 18:00 - 21:00

📅 **ทุกวัน** จันทร์ - อาทิตย์
📱 **จองได้ล่วงหน้า** 24 ชั่วโมง
🔄 **ยืดหยุ่น** สามารถเปลี่ยนเวลาได้

คุณต้องการเวลาไหนครับ? สามารถดูตารางแบบละเอียดได้ในหน้า "ตารางเรียน"`;
      }
      
      if (input.includes('ครู') || input.includes('teacher') || input.includes('อาจารย์')) {
        return `👨‍🏫 **ครูเจ้าของภาษาระดับโลก**

🇺🇸 **อเมริกา** - American English
🇬🇧 **อังกฤษ** - British English  
🇦🇺 **ออสเตรเลีย** - Australian English

✅ **คุณสมบัติครู**:
• ประสบการณ์สอน 5+ ปี
• ใบรับรอง TEFL/TESOL
• เชี่ยวชาญการสอนคนเอเชีย
• พูดไทยได้พอสื่อสาร

🎯 **การสอนแบบ Interactive**
• ฝึกการออกเสียง
• สนทนาในสถานการณ์จริง
• แก้ไขทันที Real-time`;
      }
      
      if (input.includes('ใบเซอร์') || input.includes('certificate') || input.includes('ประกาศนียบัตร')) {
        return `🏆 **ใบเซอร์ติฟิเคตระดับโลก**

📜 **ได้รับหลังจบคอร์ส**:
• ใบเซอร์ CEFR ระดับสากล
• ยอมรับในหลายประเทศ
• ใช้สมัครงาน/เรียนต่อได้

🌟 **มาตรฐาน**:
• European Framework (CEFR)
• ระดับ A1, A2, B1, B2
• Digital Certificate พร้อม QR Code

✨ **ประโยชน์**:
• เพิ่มโอกาสการทำงาน
• สมัครเรียนต่อต่างประเทศ
• พิสูจน์ความสามารถภาษาอังกฤษ`;
      }
      
      if (input.includes('zoom') || input.includes('คลาส') || input.includes('เรียน')) {
        return `💻 **เรียนสดผ่าน Zoom**

🎥 **คุณภาพระดับ HD**:
• วิดีโอ 1080p ชัดเจน
• เสียงคมชัด ไม่มีสะดุด
• แชร์หน้าจอได้

🔧 **ฟีเจอร์เรียน**:
• Breakout Rooms กลุ่มย่อย
• Whiteboard เขียนร่วมกัน
• Recording ดูย้อนหลัง 7 วัน

📱 **เข้าได้ทุกอุปกรณ์**:
• คอมพิวเตอร์ / แท็บเล็ต
• มือถือ iOS/Android
• ไม่ต้องติดตั้งโปรแกรม`;
      }
      
      if (input.includes('สมัคร') || input.includes('ลงทะเบียน') || input.includes('register')) {
        return `📝 **วิธีสมัครเรียน (ง่ายแค่ 3 ขั้นตอน)**

**1️⃣ เลือกแพลน**
• เข้าหน้า "ราคา" 
• เลือกแพลนที่ต้องการ
• คลิก "ซื้อเลย"

**2️⃣ ชำระเงิน**  
• กรอกข้อมูลส่วนตัว
• ชำระผ่าน Stripe (ปลอดภัย)
• รับยืนยันทาง Email

**3️⃣ เริ่มเรียน**
• รับลิงก์ Zoom
• เข้าคลาสตามเวลา
• เริ่มเรียนได้ทันที!

💳 **ชำระเงินปลอดภัย** SSL Encryption`;
      }
      
      return `สวัสดีครับ! ผมคือ AI Assistant ของ Kru English 🤖

คุณสามารถถามเกี่ยวกับ:
• 💰 ราคาและแพลนต่างๆ
• ⏰ ตารางเรียนและเวลา  
• 👨‍🏫 ครูและการสอน
• 🏆 ใบเซอร์ติฟิเคต
• 📱 วิธีสมัครเรียน
• 💻 การใช้ Zoom

หรือติดต่อทีมงานได้ที่หน้า "ติดต่อเรา" ครับ 😊`;
    } else {
      // English responses
      if (input.includes('price') || input.includes('cost') || input.includes('plan') || input.includes('fee')) {
        return `💰 **Our Course Plans**

📚 **General English** - 390 THB/month
- Perfect for beginners
- Live Zoom classes
- Free materials + recordings

🏆 **CEFR Platinum** - 790 THB/month
- International CEFR preparation
- Native teachers
- Global certificates

👥 **Combo Small Group** - 1,390 THB/month
- Small groups (8 students max)
- Intensive conversation practice
- Best value!

🎉 **Special Discount 10-20%** for 3+ month plans!`;
      }
      
      if (input.includes('time') || input.includes('schedule') || input.includes('when')) {
        return `⏰ **Class Schedule**

🌅 **Morning**: 09:00 - 12:00
🌞 **Afternoon**: 13:00 - 17:00
🌙 **Evening**: 18:00 - 21:00

📅 **Every day** Monday - Sunday
📱 **Book 24 hours** in advance
🔄 **Flexible** time changes allowed

Which time works for you? Check detailed schedule in "Schedule" section.`;
      }
      
      if (input.includes('teacher') || input.includes('instructor') || input.includes('native')) {
        return `👨‍🏫 **World-Class Native Teachers**

🇺🇸 **USA** - American English
🇬🇧 **UK** - British English
🇦🇺 **Australia** - Australian English

✅ **Teacher Qualifications**:
• 5+ years teaching experience
• TEFL/TESOL certified
• Asian learner specialists
• Basic Thai communication

🎯 **Interactive Teaching**:
• Pronunciation training
• Real-life conversations
• Real-time corrections`;
      }
      
      if (input.includes('certificate') || input.includes('certification') || input.includes('diploma')) {
        return `🏆 **International Certificates**

📜 **Upon course completion**:
• CEFR international certificates
• Globally recognized
• Use for jobs/university applications

🌟 **Standards**:
• European Framework (CEFR)
• Levels A1, A2, B1, B2
• Digital certificate with QR code

✨ **Benefits**:
• Boost career opportunities
• University applications abroad
• Prove English proficiency`;
      }
      
      if (input.includes('zoom') || input.includes('class') || input.includes('online')) {
        return `💻 **Live Zoom Classes**

🎥 **HD Quality**:
• 1080p crystal clear video
• High-quality audio
• Smooth connection

🔧 **Learning Features**:
• Breakout rooms for groups
• Interactive whiteboard
• 7-day recordings available

📱 **Any Device**:
• Computer / Tablet
• iOS/Android mobile
• No software installation needed`;
      }
      
      if (input.includes('register') || input.includes('signup') || input.includes('enroll') || input.includes('join')) {
        return `📝 **How to Register (3 Easy Steps)**

**1️⃣ Choose Plan**
• Go to "Pricing" page
• Select your preferred plan
• Click "Buy Now"

**2️⃣ Payment**
• Fill personal information
• Pay via Stripe (secure)
• Receive email confirmation

**3️⃣ Start Learning**
• Receive Zoom links
• Join class on time
• Start learning immediately!

💳 **Secure Payment** with SSL encryption`;
      }
      
      return `Hello! I'm the Kru English AI Assistant 🤖

You can ask me about:
• 💰 Pricing and plans
• ⏰ Schedule and timing
• 👨‍🏫 Teachers and instruction
• 🏆 Certificates
• 📱 How to register
• 💻 Using Zoom

Or contact our support team via "Contact" page 😊`;
    }
  }

  generateQuickReplies(language: 'th' | 'en'): string[] {
    if (language === 'th') {
      return [
        'ราคาแพลนต่างๆ',
        'ตารางเรียน',
        'ครูผู้สอน',
        'ใบเซอร์ติฟิเคต',
        'วิธีสมัครเรียน',
        'ติดต่อสอบถาม'
      ];
    } else {
      return [
        'Course pricing',
        'Class schedule', 
        'Teachers',
        'Certificates',
        'How to register',
        'Contact support'
      ];
    }
  }
}