import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Circle, Play, FileText, PenTool, Link as LinkIcon, User, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/course-access#live", label: "สอนสด", icon: Circle, description: "Live Teaching" },
    { href: "/course-access#recordings", label: "ดูคลิปย้อนหลัง", icon: Play, description: "Watch Recorded Videos" },
    { href: "/course-access#materials", label: "พรีวิวเอกสาร", icon: FileText, description: "Preview Learning Materials" },
    { href: "/level-test", label: "ทำแบบทดสอบ", icon: PenTool, description: "Take Quizzes" },
    { href: "/admin-settings", label: "เชื่อมต่อ API", icon: LinkIcon, description: "Connect YouTube/Zoom API", adminOnly: true },
  ];

  const isActive = (href: string) => {
    const cleanHref = href.split('#')[0];
    if (cleanHref === "/" && location === "/") return true;
    if (cleanHref !== "/" && location.startsWith(cleanHref)) return true;
    return false;
  };

  return (
    <nav className="bg-[#1E90FF] shadow-lg sticky top-0 z-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-white cursor-pointer">
                Kru English
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <span className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive(item.href)
                        ? "text-white bg-[#87CEEB]"
                        : "text-white hover:bg-[#87CEEB] hover:text-white"
                    }`}>
                      <IconComponent className="h-4 w-4" />
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/pricing">
              <Button className="bg-white text-[#1E90FF] hover:bg-gray-100 font-medium">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Buy Now
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#1E90FF]">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-[#87CEEB]">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link key={item.href} href={item.href}>
                        <span 
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 cursor-pointer ${
                            isActive(item.href)
                              ? "text-[#1E90FF] bg-blue-50"
                              : "text-gray-700 hover:text-[#1E90FF] hover:bg-gray-50"
                          }`}
                        >
                          <IconComponent className="h-4 w-4" />
                          <div>
                            <div>{item.label}</div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                        </span>
                      </Link>
                    );
                  })}
                  <div className="border-t pt-4 mt-4 space-y-2">
                    <Link href="/pricing">
                      <Button className="w-full bg-[#1E90FF] text-white hover:bg-[#4169E1]" onClick={() => setIsOpen(false)}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Buy Now
                      </Button>
                    </Link>
                    <Link href="/profile">
                      <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}