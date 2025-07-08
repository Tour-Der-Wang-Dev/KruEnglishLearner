import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  BarChart3
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  currentLanguage: 'th' | 'en';
  onLanguageChange: (lang: 'th' | 'en') => void;
}

export default function Sidebar({ isCollapsed, onToggle, currentLanguage, onLanguageChange }: SidebarProps) {
  const [location] = useLocation();

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

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-thai-cream">
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
    </div>
  );
}