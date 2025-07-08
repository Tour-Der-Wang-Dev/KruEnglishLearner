import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { LINE_URL } from "@/lib/constants";

export default function CourseAccess() {
  const { data: teachers, isLoading: teachersLoading } = useQuery({
    queryKey: ["/api/teachers"],
  });

  const { data: generalSchedules, isLoading: schedulesLoading } = useQuery({
    queryKey: ["/api/schedules/general"],
  });

  const { data: cefrSchedules } = useQuery({
    queryKey: ["/api/schedules/cefr"],
  });

  if (teachersLoading || schedulesLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" aria-label="Loading"/>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              ยินดีต้อนรับสู่ Kru English!
            </h1>
            <p className="text-xl text-gray-600">คุณสามารถเข้าเรียนและใช้งานสิ่งอำนวยความสะดวกต่างๆ ได้แล้ว</p>
          </div>

          <Tabs defaultValue="schedule" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="schedule">ตารางเรียน</TabsTrigger>
              <TabsTrigger value="materials">เอกสาร & วิดีโอ</TabsTrigger>
              <TabsTrigger value="teachers">ครูผู้สอน</TabsTrigger>
            </TabsList>

            <TabsContent value="schedule" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* General English Schedule */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <i className="fas fa-calendar-alt text-blue-600 mr-3"></i>
                      General English
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {generalSchedules?.map((schedule: any) => (
                      <div key={schedule.id} className="bg-blue-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {schedule.teacher?.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {schedule.teacher?.specialty}
                            </p>
                          </div>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                            {schedule.dayOfWeek}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-600 font-medium">
                            {schedule.startTime} - {schedule.endTime}
                          </span>
                          {schedule.zoomLink && (
                            <a 
                              href={schedule.zoomLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              <i className="fas fa-video mr-2"></i>
                              เข้าเรียน
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* CEFR Schedule */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <i className="fas fa-star text-orange-500 mr-3"></i>
                      CEFR Platinum
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cefrSchedules?.map((schedule: any) => (
                      <div key={schedule.id} className="bg-orange-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {schedule.teacher?.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {schedule.teacher?.specialty}
                            </p>
                          </div>
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">
                            {schedule.dayOfWeek}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-orange-600 font-medium">
                            {schedule.startTime} - {schedule.endTime}
                          </span>
                          {schedule.zoomLink && (
                            <a 
                              href={schedule.zoomLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              <i className="fas fa-video mr-2"></i>
                              เข้าเรียน
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-start">
                  <i className="fas fa-info-circle text-yellow-600 text-xl mr-3 mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">หมายเหตุสำคัญ</h4>
                    <ul className="text-yellow-700 space-y-1">
                      <li>• กรุณาเข้าห้องเรียนก่อนเวลา 5-10 นาที</li>
                      <li>• หากไม่สามารถเข้าเรียนได้ สามารถดูวิดีโอย้อนหลังในแท็บ "เอกสาร & วิดีโอ"</li>
                      <li>• มีคำถาม? ติดต่อทีมงานผ่าน LINE หรือในระหว่างเรียน</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="materials" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Study Materials */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <i className="fas fa-file-pdf text-red-500 mr-3"></i>
                      เอกสารการเรียน
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <i className="fas fa-file-pdf text-red-500 text-xl mr-3"></i>
                          <div>
                            <h4 className="font-semibold text-gray-800">หนังสือเรียน Level A1</h4>
                            <p className="text-sm text-gray-600">เอกสารประกอบการเรียนหลัก</p>
                          </div>
                        </div>
                        <Button 
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <i className="fas fa-download mr-2"></i>
                          ดาวน์โหลด
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <i className="fas fa-file-pdf text-red-500 text-xl mr-3"></i>
                          <div>
                            <h4 className="font-semibold text-gray-800">แบบฝึกหัด & Vocabulary</h4>
                            <p className="text-sm text-gray-600">แบบฝึกหัดและคำศัพท์รายสัปดาห์</p>
                          </div>
                        </div>
                        <Button 
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <i className="fas fa-download mr-2"></i>
                          ดาวน์โหลด
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <i className="fas fa-headphones text-purple-500 text-xl mr-3"></i>
                          <div>
                            <h4 className="font-semibold text-gray-800">ไฟล์เสียงประกอบ</h4>
                            <p className="text-sm text-gray-600">เสียงอ่านจากเจ้าของภาษา</p>
                          </div>
                        </div>
                        <Button 
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <i className="fas fa-download mr-2"></i>
                          ดาวน์โหลด
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Video Replays */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <i className="fas fa-play-circle text-blue-500 mr-3"></i>
                      วิดีโอย้อนหลัง
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-800">Basic Grammar - Session 1</h4>
                          <span className="text-xs text-gray-500">2 ชั่วโมงที่แล้ว</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">ไวยากรณ์พื้นฐาน: Present Simple</p>
                        <Button size="sm" variant="outline" className="w-full">
                          <i className="fas fa-play mr-2"></i>
                          ดูวิดีโอ
                        </Button>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-800">Pronunciation Practice</h4>
                          <span className="text-xs text-gray-500">1 วันที่แล้ว</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">การออกเสียงและสำเนียง</p>
                        <Button size="sm" variant="outline" className="w-full">
                          <i className="fas fa-play mr-2"></i>
                          ดูวิดีโอ
                        </Button>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-800">Conversation Practice</h4>
                          <span className="text-xs text-gray-500">3 วันที่แล้ว</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">ฝึกสนทนาในชีวิตประจำวัน</p>
                        <Button size="sm" variant="outline" className="w-full">
                          <i className="fas fa-play mr-2"></i>
                          ดูวิดีโอ
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="teachers" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {teachers?.map((teacher: any) => (
                  <Card key={teacher.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={teacher.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&size=80&background=3b82f6&color=ffffff`}
                            alt={teacher.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-xl font-semibold text-gray-800 mr-3">
                              {teacher.name}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              teacher.type === 'native' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {teacher.type === 'native' ? 'Native Speaker' : 'ครูไทย'}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3">{teacher.specialty}</p>
                          <p className="text-sm text-gray-500 mb-3">{teacher.bio}</p>
                          <div className="flex items-center text-blue-600">
                            <i className="fas fa-clock mr-2"></i>
                            <span className="text-sm">{teacher.schedule}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Help Section */}
          <div className="mt-12 bg-blue-50 rounded-xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                ต้องการความช่วยเหลือ?
              </h3>
              <p className="text-gray-600 mb-6">
                ทีมงานของเราพร้อมให้ความช่วยเหลือและตอบคำถามตลอด 24 ชั่วโมง
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <i className="fab fa-line mr-2"></i>
                  ติดต่อผ่าน LINE
                </a>
                <a 
                  href="mailto:info@kruenglish.com"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <i className="fas fa-envelope mr-2"></i>
                  ส่งอีเมล
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
