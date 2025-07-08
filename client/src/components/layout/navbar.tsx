import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "หน้าแรก" },
    { href: "/pricing", label: "แพลนและราคา" },
    { href: "/level-test", label: "ทดสอบระดับ" },
    { href: "/contact", label: "ติดต่อ" }
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-brand-blue cursor-pointer">
                Kru English
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    isActive(item.href)
                      ? "text-brand-blue border-b-2 border-brand-blue"
                      : "text-text-primary hover:text-brand-blue"
                  }`}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Link href="/pricing">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                สมัครเรียนเลย
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <span 
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 cursor-pointer ${
                          isActive(item.href)
                            ? "text-brand-blue bg-blue-50"
                            : "text-text-primary hover:text-brand-blue hover:bg-gray-50"
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  ))}
                  <Link href="/pricing">
                    <Button 
                      onClick={() => setIsOpen(false)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-4"
                    >
                      สมัครเรียนเลย
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
