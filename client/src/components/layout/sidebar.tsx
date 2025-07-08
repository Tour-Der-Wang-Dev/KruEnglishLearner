import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  BookOpen, 
  CreditCard, 
  User, 
  Settings, 
  HelpCircle,
  Calendar,
  Award,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Globe,
  BarChart3,
  Bot,
  Send,
  X,
  Minimize2
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  currentLanguage: 'th' | 'en';
  onLanguageChange: (lang: 'th' | 'en') => void;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Sidebar({ isCollapsed, onToggle, currentLanguage, onLanguageChange }: SidebarProps) {
  const [location] = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: currentLanguage === 'th' 
        ? 'สวัสดีครับ! ผมคือ AI Assistant ของ Kru English พร้อมช่วยตอบคำถามเกี่ยวกับการเรียนภาษาอังกฤษและการใช้งานเว็บไซต์ครับ' 
        : 'Hello! I\'m the Kru English AI Assistant. I\'m here to help with your English learning questions and website navigation.',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Generate AI response
    setTimeout(async () => {
      const botResponse = await generateBotResponse(newMessage, currentLanguage);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const generateBotResponse = async (userInput: string, language: 'th' | 'en'): Promise<string> => {
    try {
      // Try to use the AI service for enhanced responses
      const { AIChatbotService } = await import('@/components/ai/ai-chatbot-service');
      const aiService = AIChatbotService.getInstance();
      return await aiService.generateResponse(userInput, language);
    } catch (error) {
      console.error('AI service error:', error);
      
      // Fallback to simple responses
      const input = userInput.toLowerCase();
      
      if (language === 'th') {
        if (input.includes('ราคา') || input.includes('แพลน')) {
          return 'เรามีแพลนให้เลือก 3 แบบครับ: General English (390฿), CEFR Platinum (790฿), และ Combo Small Group (1,390฿) มีส่วนลดพิเศษสำหรับแพลนระยะยาวด้วยครับ';
        }
        if (input.includes('เวลา') || input.includes('ตาราง')) {
          return 'คลาสเรียนจะมีตั้งแต่เวลา 09:00-21:00 น. ทุกวันครับ สามารถดูตารางเรียนแบบละเอียดได้ในหน้า "ตารางเรียน"';
        }
        return 'ขอบคุณสำหรับคำถามครับ สามารถติดต่อทีมงานได้ที่หน้า "ติดต่อเรา" หรือถามเพิ่มเติมได้ครับ';
      } else {
        if (input.includes('price') || input.includes('plan')) {
          return 'We offer 3 plans: General English (390 THB), CEFR Platinum (790 THB), and Combo Small Group (1,390 THB). Special discounts available!';
        }
        return 'Thank you for your question! Contact our support team via "Contact" page for more help.';
      }
    }
  };

  const menuItems = [
    {
      icon: Home,
      label: { th: 'หน้าหลัก', en: 'Home' },
      href: '/',
      color: 'text-thai-red'
    },
    {
      icon: BookOpen,
      label: { th: 'คอร์สเรียน', en: 'Courses' },
      href: '/pricing',
      color: 'text-thai-rose'
    },
    {
      icon: Calendar,
      label: { th: 'ตารางเรียน', en: 'Schedule' },
      href: '/course-access',
      color: 'text-thai-orange'
    },
    {
      icon: Award,
      label: { th: 'ทดสอบระดับ', en: 'Level Test' },
      href: '/level-test',
      color: 'text-thai-red'
    },
    {
      icon: CreditCard,
      label: { th: 'การชำระเงิน', en: 'Payment' },
      href: '/checkout',
      color: 'text-thai-rose'
    },
    {
      icon: User,
      label: { th: 'โปรไฟล์', en: 'Profile' },
      href: '/profile',
      color: 'text-thai-orange'
    },
    {
      icon: MessageCircle,
      label: { th: 'ติดต่อเรา', en: 'Contact' },
      href: '/contact-new',
      color: 'text-thai-red'
    },
    {
      icon: BarChart3,
      label: { th: 'แอดมิน', en: 'Admin' },
      href: '/admin-settings',
      color: 'text-thai-rose'
    }
  ];

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };

  return (
    <div className={`
      fixed left-0 top-0 h-full bg-white border-r border-thai-cream shadow-lg z-40
      transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-16' : 'w-64'}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-thai-cream">
        {!isCollapsed && (
          <div>
            <h2 className="text-xl font-bold text-thai-red">Kru English</h2>
            <p className="text-sm text-gray-500">
              {currentLanguage === 'th' ? 'เรียนภาษาอังกฤษ' : 'Learn English'}
            </p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="p-2 hover:bg-thai-cream"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Language Switcher */}
      <div className="p-4 border-b border-thai-cream">
        <div className={`flex ${isCollapsed ? 'justify-center' : 'gap-2'}`}>
          <Button
            variant={currentLanguage === 'th' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onLanguageChange('th')}
            className={`
              ${currentLanguage === 'th' ? 'bg-thai-red text-white' : 'border-thai-red text-thai-red'}
              ${isCollapsed ? 'w-8 h-8 p-0' : 'flex-1'}
            `}
          >
            {isCollapsed ? 'ไท' : 'ไทย'}
          </Button>
          <Button
            variant={currentLanguage === 'en' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onLanguageChange('en')}
            className={`
              ${currentLanguage === 'en' ? 'bg-thai-red text-white' : 'border-thai-red text-thai-red'}
              ${isCollapsed ? 'w-8 h-8 p-0' : 'flex-1'}
            `}
          >
            {isCollapsed ? 'EN' : 'ENG'}
          </Button>
        </div>
      </div>

      {/* Navigation Menu */}
      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link key={item.href} href={item.href}>
                <div className={`
                  flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer
                  ${active 
                    ? 'bg-thai-red text-white shadow-md' 
                    : 'hover:bg-thai-cream text-gray-700 hover:text-thai-red'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}>
                  <Icon className={`h-5 w-5 ${active ? 'text-white' : item.color}`} />
                  {!isCollapsed && (
                    <span className="font-medium">
                      {item.label[currentLanguage]}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* AI Chatbot & Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-thai-cream space-y-3">
          {/* AI Chatbot Button */}
          <Button
            onClick={() => setIsChatOpen(true)}
            className="w-full bg-gradient-to-r from-thai-red to-thai-rose text-white hover:from-thai-rose hover:to-thai-orange relative"
          >
            <Bot className="h-4 w-4 mr-2" />
            {currentLanguage === 'th' ? 'AI ผู้ช่วย' : 'AI Assistant'}
            <Badge className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1">
              {currentLanguage === 'th' ? 'ใหม่' : 'NEW'}
            </Badge>
          </Button>

          {/* Help Button */}
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">
              {currentLanguage === 'th' ? 'ติดต่อสนับสนุน' : 'Support'}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-thai-red text-thai-red hover:bg-thai-red hover:text-white"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              {currentLanguage === 'th' ? 'ช่วยเหลือ' : 'Help'}
            </Button>
          </div>
        </div>
      )}

      {/* AI Chatbot Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className={`w-full max-w-md h-[600px] flex flex-col ${isChatMinimized ? 'h-16' : ''}`}>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-thai-cream bg-thai-red text-white rounded-t-lg">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <h3 className="font-semibold">
                  {currentLanguage === 'th' ? 'AI ผู้ช่วย Kru English' : 'Kru English AI Assistant'}
                </h3>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-thai-rose p-1"
                  onClick={() => setIsChatMinimized(!isChatMinimized)}
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-thai-rose p-1"
                  onClick={() => setIsChatOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isChatMinimized && (
              <>
                {/* Chat Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-thai-red text-white'
                              : 'bg-thai-cream text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString(currentLanguage === 'th' ? 'th-TH' : 'en-US')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Chat Input */}
                <div className="p-4 border-t border-thai-cream">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder={currentLanguage === 'th' ? 'พิมพ์ข้อความ...' : 'Type a message...'}
                      className="flex-1 px-3 py-2 border border-thai-cream rounded-lg focus:outline-none focus:border-thai-red"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-thai-red hover:bg-thai-rose text-white"
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    {currentLanguage === 'th' 
                      ? 'ถามเกี่ยวกับคอร์ส ราคา ตารางเรียน หรือการใช้งานเว็บไซต์' 
                      : 'Ask about courses, pricing, schedule, or website navigation'}
                  </p>
                </div>
              </>
            )}
          </Card>
        </div>
      )}

      {/* Floating Chatbot Button for Collapsed Sidebar */}
      {isCollapsed && (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-4 left-4 w-12 h-12 rounded-full bg-thai-red hover:bg-thai-rose text-white shadow-lg"
        >
          <Bot className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}