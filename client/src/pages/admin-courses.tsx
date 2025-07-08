import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import AdminSidebar from '@/components/admin/admin-sidebar';
import {
  Plus,
  Edit,
  Trash2,
  Video,
  Calendar,
  Clock,
  Users,
  Search,
  Filter,
  BookOpen,
  Save,
  X
} from 'lucide-react';

interface Course {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  duration: string;
  capacity: number;
  enrolled: number;
  teacher: string;
  zoomLink?: string;
  schedule: string;
  status: 'active' | 'inactive' | 'full';
  createdAt: string;
}

export default function AdminCourses() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    type: 'general',
    description: '',
    price: '',
    duration: '',
    capacity: '',
    teacher: '',
    zoomLink: '',
    schedule: ''
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      // Mock data for demo - replace with actual API call
      const mockCourses: Course[] = [
        {
          id: 1,
          name: 'General English Beginner',
          type: 'general',
          description: 'พื้นฐานภาษาอังกฤษสำหรับผู้เริ่มต้น',
          price: 390,
          duration: '1 เดือน',
          capacity: 20,
          enrolled: 15,
          teacher: 'ครู John',
          zoomLink: 'https://zoom.us/j/123456789',
          schedule: 'จันทร์-ศุกร์ 19:00-20:00',
          status: 'active',
          createdAt: '2025-01-01'
        },
        {
          id: 2,
          name: 'CEFR B1 Intermediate',
          type: 'cefr',
          description: 'เตรียมสอบ CEFR ระดับ B1',
          price: 790,
          duration: '2 เดือน',
          capacity: 15,
          enrolled: 12,
          teacher: 'ครู Sarah',
          zoomLink: 'https://zoom.us/j/987654321',
          schedule: 'อังคาร-พฤหัส 20:00-21:00',
          status: 'active',
          createdAt: '2025-01-05'
        },
        {
          id: 3,
          name: 'Combo Speaking Practice',
          type: 'combo',
          description: 'ฝึกการสนทนากลุ่มเล็ก',
          price: 1390,
          duration: '1 เดือน',
          capacity: 8,
          enrolled: 8,
          teacher: 'ครู Mike',
          zoomLink: 'https://zoom.us/j/456789123',
          schedule: 'เสาร์-อาทิตย์ 10:00-12:00',
          status: 'full',
          createdAt: '2025-01-10'
        }
      ];
      setCourses(mockCourses);
    } catch (error) {
      toast({
        title: "Error",
        description: "ไม่สามารถโหลดข้อมูลคอร์สได้",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = () => {
    setFormData({
      name: '',
      type: 'general',
      description: '',
      price: '',
      duration: '',
      capacity: '',
      teacher: '',
      zoomLink: '',
      schedule: ''
    });
    setEditingCourse(null);
    setShowAddForm(true);
  };

  const handleEditCourse = (course: Course) => {
    setFormData({
      name: course.name,
      type: course.type,
      description: course.description,
      price: course.price.toString(),
      duration: course.duration,
      capacity: course.capacity.toString(),
      teacher: course.teacher,
      zoomLink: course.zoomLink || '',
      schedule: course.schedule
    });
    setEditingCourse(course);
    setShowAddForm(true);
  };

  const handleSaveCourse = async () => {
    try {
      // Validate form
      if (!formData.name || !formData.description || !formData.price) {
        toast({
          title: "Error",
          description: "กรุณากรอกข้อมูลให้ครบถ้วน",
          variant: "destructive"
        });
        return;
      }

      // Create course
      const newCourse: Course = {
        id: editingCourse?.id || Date.now(),
        name: formData.name,
        type: formData.type,
        description: formData.description,
        price: parseInt(formData.price),
        duration: formData.duration,
        capacity: parseInt(formData.capacity),
        enrolled: editingCourse?.enrolled || 0,
        teacher: formData.teacher,
        zoomLink: formData.zoomLink,
        schedule: formData.schedule,
        status: 'active',
        createdAt: editingCourse?.createdAt || new Date().toISOString().split('T')[0]
      };

      // Auto-generate Zoom link if not provided
      if (!formData.zoomLink && formData.name && formData.schedule) {
        try {
          const response = await apiRequest('POST', '/api/zoom/create-meeting', {
            courseName: formData.name,
            schedule: formData.schedule,
            duration: parseInt(formData.duration.replace(/[^\d]/g, '')) || 60,
            courseId: newCourse.id
          });

          const zoomData = await response.json();
          if (zoomData.success) {
            newCourse.zoomLink = zoomData.meeting.join_url;
            toast({
              title: "Success",
              description: "คอร์สและลิงก์ Zoom ถูกสร้างเรียบร้อยแล้ว"
            });
          }
        } catch (zoomError) {
          console.warn('Failed to create Zoom link:', zoomError);
          toast({
            title: "Warning",
            description: "บันทึกคอร์สสำเร็จ แต่ไม่สามารถสร้างลิงก์ Zoom ได้",
            variant: "destructive"
          });
        }
      }

      if (editingCourse) {
        setCourses(prev => prev.map(c => c.id === editingCourse.id ? newCourse : c));
        toast({
          title: "Success",
          description: "แก้ไขคอร์สเรียบร้อยแล้ว"
        });
      } else {
        setCourses(prev => [...prev, newCourse]);
        toast({
          title: "Success",
          description: "เพิ่มคอร์สใหม่เรียบร้อยแล้ว"
        });
      }

      setShowAddForm(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "ไม่สามารถบันทึกข้อมูลได้",
        variant: "destructive"
      });
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    if (!confirm('คุณแน่ใจหรือไม่ที่จะลบคอร์สนี้?')) return;

    try {
      setCourses(prev => prev.filter(c => c.id !== courseId));
      toast({
        title: "Success",
        description: "ลบคอร์สเรียบร้อยแล้ว"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "ไม่สามารถลบคอร์สได้",
        variant: "destructive"
      });
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || course.type === filterType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'full': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'general': return 'General English';
      case 'cefr': return 'CEFR Platinum';
      case 'combo': return 'Combo Small Group';
      default: return type;
    }
  };

  return (
    <div className="flex min-h-screen bg-thai-cream">
      <AdminSidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-thai-red">จัดการคอร์สเรียน</h1>
              <p className="text-gray-600">เพิ่ม แก้ไข และจัดการคอร์สทั้งหมด</p>
            </div>
            <Button 
              onClick={handleAddCourse}
              className="bg-thai-red hover:bg-thai-rose text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              เพิ่มคอร์สใหม่
            </Button>
          </div>

          {/* Filters */}
          <Card className="mb-6 border-thai-cream">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="ค้นหาคอร์สหรือครูผู้สอน..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-thai-cream focus:border-thai-red"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-thai-cream rounded-md focus:border-thai-red"
                >
                  <option value="all">ทุกประเภท</option>
                  <option value="general">General English</option>
                  <option value="cefr">CEFR Platinum</option>
                  <option value="combo">Combo Small Group</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Course List */}
          <div className="grid gap-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-thai-red"></div>
                <p className="mt-2 text-gray-600">กำลังโหลด...</p>
              </div>
            ) : (
              filteredCourses.map((course) => (
                <Card key={course.id} className="border-thai-cream shadow-md">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-800">{course.name}</h3>
                          <Badge className={getStatusColor(course.status)}>
                            {course.status === 'active' ? 'เปิดรับสมัคร' : 
                             course.status === 'full' ? 'เต็ม' : 'ปิด'}
                          </Badge>
                          <Badge variant="outline" className="border-thai-orange text-thai-orange">
                            {getTypeLabel(course.type)}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{course.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-thai-orange" />
                            <span>{course.enrolled}/{course.capacity} คน</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-thai-orange" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-thai-orange" />
                            <span>{course.schedule}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-thai-orange" />
                            <span>฿{course.price.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                          <span>ครูผู้สอน: {course.teacher}</span>
                          {course.zoomLink ? (
                            <div className="flex items-center gap-1">
                              <Video className="h-4 w-4 text-green-600" />
                              <a href={course.zoomLink} target="_blank" rel="noopener noreferrer" 
                                 className="text-thai-red hover:underline">
                                Zoom Ready
                              </a>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <Video className="h-4 w-4 text-yellow-600" />
                              <span className="text-yellow-600">Zoom Pending</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditCourse(course)}
                          className="border-thai-orange text-thai-orange hover:bg-thai-orange hover:text-white"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteCourse(course.id)}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Add/Edit Form Modal */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-thai-red">
                    <span>{editingCourse ? 'แก้ไขคอร์ส' : 'เพิ่มคอร์สใหม่'}</span>
                    <Button variant="ghost" onClick={() => setShowAddForm(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">ชื่อคอร์ส</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="border-thai-cream focus:border-thai-red"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">ประเภทคอร์ส</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full px-3 py-2 border border-thai-cream rounded-md focus:border-thai-red"
                      >
                        <option value="general">General English</option>
                        <option value="cefr">CEFR Platinum</option>
                        <option value="combo">Combo Small Group</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">รายละเอียดคอร์ส</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-3 py-2 border border-thai-cream rounded-md focus:border-thai-red"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">ราคา (บาท)</label>
                      <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="border-thai-cream focus:border-thai-red"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">ระยะเวลา</label>
                      <Input
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        className="border-thai-cream focus:border-thai-red"
                        placeholder="เช่น 1 เดือน"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">จำนวนที่รับ</label>
                      <Input
                        type="number"
                        value={formData.capacity}
                        onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                        className="border-thai-cream focus:border-thai-red"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">ครูผู้สอน</label>
                      <Input
                        value={formData.teacher}
                        onChange={(e) => setFormData({...formData, teacher: e.target.value})}
                        className="border-thai-cream focus:border-thai-red"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">ตารางเรียน</label>
                      <Input
                        value={formData.schedule}
                        onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                        className="border-thai-cream focus:border-thai-red"
                        placeholder="เช่น จันทร์-ศุกร์ 19:00-20:00"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">ลิงก์ Zoom</label>
                    <div className="flex gap-2">
                      <Input
                        value={formData.zoomLink}
                        onChange={(e) => setFormData({...formData, zoomLink: e.target.value})}
                        className="border-thai-cream focus:border-thai-red"
                        placeholder="https://zoom.us/j/... (ว่างไว้เพื่อสร้างอัตโนมัติ)"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={async () => {
                          if (!formData.name) {
                            toast({
                              title: "Error",
                              description: "กรุณากรอกชื่อคอร์สก่อน",
                              variant: "destructive"
                            });
                            return;
                          }
                          
                          try {
                            const response = await apiRequest('POST', '/api/zoom/create-meeting', {
                              courseName: formData.name,
                              schedule: formData.schedule,
                              duration: parseInt(formData.duration.replace(/[^\d]/g, '')) || 60
                            });
                            
                            const data = await response.json();
                            if (data.success) {
                              setFormData({...formData, zoomLink: data.meeting.join_url});
                              toast({
                                title: "Success",
                                description: "สร้างลิงก์ Zoom เรียบร้อยแล้ว"
                              });
                            }
                          } catch (error: any) {
                            toast({
                              title: "Error",
                              description: "ไม่สามารถสร้างลิงก์ Zoom ได้",
                              variant: "destructive"
                            });
                          }
                        }}
                        className="border-thai-orange text-thai-orange hover:bg-thai-orange hover:text-white"
                      >
                        <Video className="h-4 w-4 mr-1" />
                        สร้าง
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      ปล่อยว่างไว้เพื่อให้ระบบสร้างลิงก์ Zoom อัตโนมัติ
                    </p>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleSaveCourse}
                      className="flex-1 bg-thai-red hover:bg-thai-rose text-white"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingCourse ? 'บันทึกการแก้ไข' : 'เพิ่มคอร์ส'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowAddForm(false)}
                      className="border-thai-red text-thai-red hover:bg-thai-red hover:text-white"
                    >
                      ยกเลิก
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}