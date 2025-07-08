import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import AdminSidebar from '@/components/admin/admin-sidebar';
import {
  Users,
  Search,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Eye,
  Edit,
  Send,
  Filter,
  Download,
  UserPlus,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

interface Student {
  id: number;
  name: string;
  email: string;
  phone?: string;
  registrationDate: string;
  enrolledCourses: string[];
  paymentStatus: 'paid' | 'pending' | 'failed';
  totalPaid: number;
  lastActive: string;
  status: 'active' | 'inactive' | 'suspended';
  zoomAccessGranted: boolean;
}

export default function AdminStudents() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      // Mock data for demo
      const mockStudents: Student[] = [
        {
          id: 1,
          name: 'สมชาย ใจดี',
          email: 'somchai@email.com',
          phone: '081-234-5678',
          registrationDate: '2025-01-15',
          enrolledCourses: ['General English Beginner'],
          paymentStatus: 'paid',
          totalPaid: 390,
          lastActive: '2025-01-20',
          status: 'active',
          zoomAccessGranted: true
        },
        {
          id: 2,
          name: 'มาลี สวยงาม',
          email: 'malee@email.com',
          phone: '082-345-6789',
          registrationDate: '2025-01-18',
          enrolledCourses: ['CEFR B1 Intermediate'],
          paymentStatus: 'pending',
          totalPaid: 0,
          lastActive: '2025-01-19',
          status: 'active',
          zoomAccessGranted: false
        },
        {
          id: 3,
          name: 'วิชัย เก่งกาจ',
          email: 'wichai@email.com',
          phone: '083-456-7890',
          registrationDate: '2025-01-12',
          enrolledCourses: ['Combo Speaking Practice', 'General English Beginner'],
          paymentStatus: 'paid',
          totalPaid: 1780,
          lastActive: '2025-01-21',
          status: 'active',
          zoomAccessGranted: true
        },
        {
          id: 4,
          name: 'สุนิสา ขยันเรียน',
          email: 'sunisa@email.com',
          registrationDate: '2025-01-20',
          enrolledCourses: ['General English Beginner'],
          paymentStatus: 'failed',
          totalPaid: 0,
          lastActive: '2025-01-20',
          status: 'inactive',
          zoomAccessGranted: false
        }
      ];
      setStudents(mockStudents);
    } catch (error) {
      toast({
        title: "Error",
        description: "ไม่สามารถโหลดข้อมูลผู้เรียนได้",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async (studentId: number, type: 'welcome' | 'payment' | 'zoom') => {
    try {
      // Mock email sending
      toast({
        title: "Success",
        description: "ส่งอีเมลเรียบร้อยแล้ว",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "ไม่สามารถส่งอีเมลได้",
        variant: "destructive"
      });
    }
  };

  const handleGrantZoomAccess = async (studentId: number) => {
    try {
      setStudents(prev => prev.map(student => 
        student.id === studentId 
          ? { ...student, zoomAccessGranted: true }
          : student
      ));
      toast({
        title: "Success",
        description: "อนุญาตการเข้าถึง Zoom เรียบร้อยแล้ว",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "ไม่สามารถอนุญาตการเข้าถึงได้",
        variant: "destructive"
      });
    }
  };

  const handleUpdateStatus = async (studentId: number, newStatus: 'active' | 'inactive' | 'suspended') => {
    try {
      setStudents(prev => prev.map(student => 
        student.id === studentId 
          ? { ...student, status: newStatus }
          : student
      ));
      toast({
        title: "Success",
        description: "อัพเดตสถานะเรียบร้อยแล้ว",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "ไม่สามารถอัพเดตสถานะได้",
        variant: "destructive"
      });
    }
  };

  const exportStudents = () => {
    const csvData = students.map(student => ({
      'ชื่อ': student.name,
      'อีเมล': student.email,
      'เบอร์โทร': student.phone || '',
      'วันที่สมัคร': student.registrationDate,
      'คอร์สที่เรียน': student.enrolledCourses.join(', '),
      'สถานะการชำระเงิน': student.paymentStatus,
      'ยอดชำระ': student.totalPaid,
      'เข้าใช้งานล่าสุด': student.lastActive,
      'สถานะ': student.status
    }));
    
    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `students-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesCourse = courseFilter === 'all' || 
                         student.enrolledCourses.some(course => course.toLowerCase().includes(courseFilter.toLowerCase()));
    return matchesSearch && matchesStatus && matchesCourse;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
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
              <h1 className="text-3xl font-bold text-thai-red">จัดการผู้เรียน</h1>
              <p className="text-gray-600">ดูข้อมูลและจัดการผู้เรียนทั้งหมด</p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={exportStudents}
                variant="outline"
                className="border-thai-red text-thai-red hover:bg-thai-red hover:text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button className="bg-thai-red hover:bg-thai-rose text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                เพิ่มผู้เรียนใหม่
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">ผู้เรียนทั้งหมด</p>
                    <p className="text-2xl font-bold text-thai-red">{students.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-thai-red" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">ผู้เรียนที่ใช้งาน</p>
                    <p className="text-2xl font-bold text-green-600">
                      {students.filter(s => s.status === 'active').length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">รอชำระเงิน</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {students.filter(s => s.paymentStatus === 'pending').length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">รายได้รวม</p>
                    <p className="text-2xl font-bold text-thai-red">
                      ฿{students.reduce((sum, s) => sum + s.totalPaid, 0).toLocaleString()}
                    </p>
                  </div>
                  <CreditCard className="h-8 w-8 text-thai-red" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6 border-thai-cream">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="ค้นหาชื่อหรืออีเมลผู้เรียน..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-thai-cream focus:border-thai-red"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-thai-cream rounded-md focus:border-thai-red"
                >
                  <option value="all">ทุกสถานะ</option>
                  <option value="active">ใช้งาน</option>
                  <option value="inactive">ไม่ใช้งาน</option>
                  <option value="suspended">ระงับ</option>
                </select>
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="px-3 py-2 border border-thai-cream rounded-md focus:border-thai-red"
                >
                  <option value="all">ทุกคอร์ส</option>
                  <option value="general">General English</option>
                  <option value="cefr">CEFR</option>
                  <option value="combo">Combo</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Students List */}
          <Card className="border-thai-cream">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-thai-red">
                <Users className="h-5 w-5" />
                รายชื่อผู้เรียน ({filteredStudents.length} คน)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-thai-red"></div>
                      <p className="mt-2 text-gray-600">กำลังโหลด...</p>
                    </div>
                  ) : (
                    filteredStudents.map((student) => (
                      <div key={student.id} className="border border-thai-cream rounded-lg p-4 bg-white">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-lg text-gray-800">{student.name}</h4>
                              <Badge className={getStatusColor(student.status)}>
                                {student.status === 'active' ? 'ใช้งาน' : 
                                 student.status === 'inactive' ? 'ไม่ใช้งาน' : 'ระงับ'}
                              </Badge>
                              <Badge className={getPaymentStatusColor(student.paymentStatus)}>
                                <div className="flex items-center gap-1">
                                  {getPaymentStatusIcon(student.paymentStatus)}
                                  {student.paymentStatus === 'paid' ? 'ชำระแล้ว' : 
                                   student.paymentStatus === 'pending' ? 'รอชำระ' : 'ล้มเหลว'}
                                </div>
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-thai-orange" />
                                <span>{student.email}</span>
                              </div>
                              {student.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-thai-orange" />
                                  <span>{student.phone}</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-thai-orange" />
                                <span>สมัคร: {new Date(student.registrationDate).toLocaleDateString('th-TH')}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4 text-thai-orange" />
                                <span>ชำระ: ฿{student.totalPaid.toLocaleString()}</span>
                              </div>
                            </div>
                            
                            <div className="mb-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">คอร์สที่เรียน:</p>
                              <div className="flex flex-wrap gap-2">
                                {student.enrolledCourses.map((course, index) => (
                                  <Badge key={index} variant="outline" className="border-thai-orange text-thai-orange">
                                    {course}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <p className="text-xs text-gray-500">
                              เข้าใช้งานล่าสุด: {new Date(student.lastActive).toLocaleDateString('th-TH')}
                            </p>
                          </div>
                          
                          <div className="flex flex-col gap-2 ml-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSendEmail(student.id, 'zoom')}
                              className="border-thai-orange text-thai-orange hover:bg-thai-orange hover:text-white"
                            >
                              <Send className="h-4 w-4 mr-1" />
                              ส่งลิงก์ Zoom
                            </Button>
                            
                            {!student.zoomAccessGranted && (
                              <Button
                                size="sm"
                                onClick={() => handleGrantZoomAccess(student.id)}
                                className="bg-thai-red hover:bg-thai-rose text-white"
                              >
                                อนุญาต Zoom
                              </Button>
                            )}
                            
                            <select
                              value={student.status}
                              onChange={(e) => handleUpdateStatus(student.id, e.target.value as any)}
                              className="text-xs px-2 py-1 border border-thai-cream rounded"
                            >
                              <option value="active">ใช้งาน</option>
                              <option value="inactive">ไม่ใช้งาน</option>
                              <option value="suspended">ระงับ</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}