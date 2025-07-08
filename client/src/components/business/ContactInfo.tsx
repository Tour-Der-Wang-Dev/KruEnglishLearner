import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '@/constants/courses';

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            ข้อมูลติดต่อ
          </CardTitle>
          <CardDescription>
            ติดต่อเราผ่านช่องทางต่างๆ ด้านล่าง
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-blue-600" />
            <div>
              <div className="font-medium">อีเมล</div>
              <div className="text-gray-600">{COMPANY_INFO.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-blue-600" />
            <div>
              <div className="font-medium">โทรศัพท์</div>
              <div className="text-gray-600">{COMPANY_INFO.phone}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-blue-600" />
            <div>
              <div className="font-medium">ที่อยู่</div>
              <div className="text-gray-600">{COMPANY_INFO.address}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <div className="font-medium">เวลาทำการ</div>
              <div className="text-gray-600">
                จันทร์-ศุกร์ 9:00-18:00<br />
                เสาร์-อาทิตย์ 10:00-16:00
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-green-600">LINE Official</CardTitle>
          <CardDescription>
            ติดต่อเร็วที่สุดผ่าน LINE
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-lg font-medium text-green-600">
              {COMPANY_INFO.lineId}
            </div>
            <Button
              onClick={() => window.open(COMPANY_INFO.lineUrl, '_blank')}
              className="w-full bg-green-500 hover:bg-green-600"
            >
              เพิ่มเพื่อนใน LINE
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}