import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard,
  BookOpen,
  CreditCard,
  Users,
  Video,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  User
} from "lucide-react";

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  adminName?: string;
}

export default function AdminSidebar({ isCollapsed, onToggle, adminName = "Admin" }: AdminSidebarProps) {
  const [location] = useLocation();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'แดชบอร์ด',
      href: '/admin-dashboard',
      badge: null
    },
    {
      icon: BookOpen,
      label: 'จัดการคอร์ส',
      href: '/admin-courses',
      badge: null
    },
    {
      icon: CreditCard,
      label: 'การชำระเงิน',
      href: '/admin-payments',
      badge: '3'
    },
    {
      icon: Users,
      label: 'ผู้เรียน',
      href: '/admin-students',
      badge: null
    },
    {
      icon: Video,
      label: 'ลิงก์ Zoom',
      href: '/admin-zoom',
      badge: null
    },
    {
      icon: BarChart3,
      label: 'รายงาน',
      href: '/admin-reports',
      badge: null
    },
    {
      icon: Settings,
      label: 'การตั้งค่า',
      href: '/admin-settings',
      badge: null
    }
  ];

  const isActive = (href: string) => {
    return location === href || location.startsWith(href);
  };

  return (
    <div className={`
      fixed left-0 top-0 h-full bg-thai-rose shadow-lg z-40
      transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-16' : 'w-64'}
    `}>
      {/* Header */}
      <div className="bg-thai-red text-white p-4">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold">Admin Panel</h2>
              <p className="text-sm opacity-80">Kru English</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-white hover:bg-thai-rose p-2"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        
        {!isCollapsed && (
          <div className="mt-4 flex items-center gap-3 p-3 bg-thai-rose bg-opacity-30 rounded-lg">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-thai-red" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{adminName}</p>
              <p className="text-xs opacity-70">ผู้ดูแลระบบ</p>
            </div>
            <Bell className="h-4 w-4 opacity-70" />
          </div>
        )}
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
                  relative flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer
                  ${active 
                    ? 'bg-thai-red text-white shadow-md' 
                    : 'text-white hover:bg-thai-red hover:bg-opacity-70'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}>
                  <Icon className="h-5 w-5 text-thai-orange" />
                  {!isCollapsed && (
                    <>
                      <span className="font-medium flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge className="bg-thai-orange text-white text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                  {isCollapsed && item.badge && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-thai-orange text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-thai-red border-opacity-30">
        <Button
          variant="ghost"
          className={`text-white hover:bg-thai-red hover:bg-opacity-70 ${isCollapsed ? 'w-full justify-center p-2' : 'w-full justify-start'}`}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">ออกจากระบบ</span>}
        </Button>
      </div>
    </div>
  );
}