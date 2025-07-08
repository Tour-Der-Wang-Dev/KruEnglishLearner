import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import AdminSidebar from '@/components/admin/admin-sidebar';
import {
  Video,
  Plus,
  RefreshCw,
  Copy,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  Users,
  Link,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  Zap
} from 'lucide-react';

interface ZoomMeeting {
  id: string;
  topic: string;
  join_url: string;
  password?: string;
  start_time?: string;
  duration: number;
  status: string;
}

interface Course {
  id: number;
  name: string;
  schedule: string;
  duration: string;
  teacher: string;
  zoomLink?: string;
  zoomMeetingId?: string;
}

export default function AdminZoom() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [meetings, setMeetings] = useState<ZoomMeeting[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { toast } = useToast();

  const [createForm, setCreateForm] = useState({
    courseName: '',
    schedule: '',
    duration: 60,
    courseId: ''
  });

  useEffect(() => {
    loadData();
    testZoomConnection();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadMeetings(),
        loadCourses()
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadMeetings = async () => {
    try {
      const response = await apiRequest('GET', '/api/zoom/meetings');
      const data = await response.json();
      if (data.success) {
        setMeetings(data.meetings);
      }
    } catch (error) {
      console.error('Failed to load meetings:', error);
    }
  };

  const loadCourses = async () => {
    try {
      // Mock courses data - replace with actual API call
      const mockCourses: Course[] = [
        {
          id: 1,
          name: 'General English Beginner',
          schedule: 'จันทร์-ศุกร์ 19:00-20:00',
          duration: '60 นาที',
          teacher: 'ครู John',
          zoomLink: undefined
        },
        {
          id: 2,
          name: 'CEFR B1 Intermediate',
          schedule: 'อังคาร-พฤหัส 20:00-21:00',
          duration: '60 นาที',
          teacher: 'ครู Sarah'
        },
        {
          id: 3,
          name: 'Combo Speaking Practice',
          schedule: 'เสาร์-อาทิตย์ 10:00-12:00',
          duration: '120 นาที',
          teacher: 'ครู Mike'
        }
      ];
      setCourses(mockCourses);
    } catch (error) {
      console.error('Failed to load courses:', error);
    }
  };

  const testZoomConnection = async () => {
    try {
      const response = await apiRequest('GET', '/api/zoom/test');
      const data = await response.json();
      setConnectionStatus(data);
    } catch (error) {
      setConnectionStatus({
        success: false,
        message: 'Failed to test connection'
      });
    }
  };

  const createMeeting = async () => {
    try {
      const response = await apiRequest('POST', '/api/zoom/create-meeting', {
        courseName: createForm.courseName,
        schedule: createForm.schedule,
        duration: createForm.duration,
        courseId: createForm.courseId || undefined
      });

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Zoom meeting created successfully"
        });
        setShowCreateForm(false);
        setCreateForm({ courseName: '', schedule: '', duration: 60, courseId: '' });
        loadMeetings();
      } else {
        throw new Error(data.message || 'Failed to create meeting');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create Zoom meeting",
        variant: "destructive"
      });
    }
  };

  const generateLinkForCourse = async (courseId: number) => {
    try {
      const response = await apiRequest('POST', `/api/zoom/generate-link/${courseId}`, {});
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Zoom link generated successfully"
        });
        loadMeetings();
        loadCourses();
      } else {
        throw new Error(data.message || 'Failed to generate link');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate Zoom link",
        variant: "destructive"
      });
    }
  };

  const deleteMeeting = async (meetingId: string) => {
    if (!confirm('Are you sure you want to delete this meeting?')) return;

    try {
      const response = await apiRequest('DELETE', `/api/zoom/meeting/${meetingId}`, {});
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Meeting deleted successfully"
        });
        loadMeetings();
      } else {
        throw new Error(data.message || 'Failed to delete meeting');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete meeting",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Link copied to clipboard"
    });
  };

  const bulkCreateMeetings = async () => {
    const coursesToCreate = courses.filter(course => !course.zoomLink);
    
    if (coursesToCreate.length === 0) {
      toast({
        title: "Info",
        description: "All courses already have Zoom links"
      });
      return;
    }

    try {
      const response = await apiRequest('POST', '/api/zoom/bulk-create', {
        courses: coursesToCreate.map(course => ({
          id: course.id,
          name: course.name,
          schedule: course.schedule,
          duration: parseInt(course.duration) || 60
        }))
      });

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Success",
          description: `Created ${data.summary.successful} of ${data.summary.total} meetings`
        });
        loadMeetings();
        loadCourses();
      } else {
        throw new Error(data.message || 'Bulk creation failed');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create meetings",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'started': return 'bg-green-100 text-green-800';
      case 'ended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
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
              <h1 className="text-3xl font-bold text-thai-red">Zoom Management</h1>
              <p className="text-gray-600">จัดการลิงก์ Zoom และห้องเรียนออนไลน์</p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => testZoomConnection()}
                variant="outline"
                className="border-thai-orange text-thai-orange hover:bg-thai-orange hover:text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Test Connection
              </Button>
              <Button 
                onClick={bulkCreateMeetings}
                variant="outline"
                className="border-thai-red text-thai-red hover:bg-thai-red hover:text-white"
              >
                <Zap className="h-4 w-4 mr-2" />
                Bulk Create
              </Button>
              <Button 
                onClick={() => setShowCreateForm(true)}
                className="bg-thai-red hover:bg-thai-rose text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Meeting
              </Button>
            </div>
          </div>

          {/* Connection Status */}
          {connectionStatus && (
            <Card className="mb-6 border-thai-cream">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  {connectionStatus.success ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <div>
                    <p className={`font-medium ${connectionStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                      {connectionStatus.success ? 'Zoom API Connected' : 'Connection Failed'}
                    </p>
                    <p className="text-sm text-gray-600">{connectionStatus.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Meetings</p>
                    <p className="text-2xl font-bold text-thai-red">{meetings.length}</p>
                  </div>
                  <Video className="h-8 w-8 text-thai-red" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Meetings</p>
                    <p className="text-2xl font-bold text-green-600">
                      {meetings.filter(m => m.status === 'started').length}
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
                    <p className="text-sm font-medium text-gray-600">Courses with Zoom</p>
                    <p className="text-2xl font-bold text-thai-orange">
                      {courses.filter(c => c.zoomLink).length}
                    </p>
                  </div>
                  <Link className="h-8 w-8 text-thai-orange" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Setup</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {courses.filter(c => !c.zoomLink).length}
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Zoom Meetings */}
            <Card className="border-thai-cream">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-thai-red">
                  <Video className="h-5 w-5" />
                  Zoom Meetings ({meetings.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-thai-red"></div>
                        <p className="mt-2 text-gray-600">Loading meetings...</p>
                      </div>
                    ) : meetings.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Video className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>No Zoom meetings found</p>
                        <Button 
                          onClick={() => setShowCreateForm(true)}
                          className="mt-3 bg-thai-red hover:bg-thai-rose"
                        >
                          Create First Meeting
                        </Button>
                      </div>
                    ) : (
                      meetings.map((meeting) => (
                        <div key={meeting.id} className="border border-thai-cream rounded-lg p-4 bg-white">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 mb-1">{meeting.topic}</h4>
                              <Badge className={getStatusColor(meeting.status)}>
                                {meeting.status}
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(meeting.join_url)}
                                className="border-thai-orange text-thai-orange hover:bg-thai-orange hover:text-white"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => deleteMeeting(meeting.id)}
                                className="border-red-300 text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Link className="h-4 w-4 text-thai-orange" />
                              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                ID: {meeting.id}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-thai-orange" />
                              <span>{meeting.duration} minutes</span>
                            </div>
                            {meeting.password && (
                              <div className="flex items-center gap-2">
                                <Settings className="h-4 w-4 text-thai-orange" />
                                <span>Password: {meeting.password}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-3">
                            <a
                              href={meeting.join_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-thai-red hover:underline text-sm font-medium"
                            >
                              Join Meeting →
                            </a>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Course Integration */}
            <Card className="border-thai-cream">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-thai-red">
                  <Users className="h-5 w-5" />
                  Course Integration ({courses.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {courses.map((course) => (
                      <div key={course.id} className="border border-thai-cream rounded-lg p-4 bg-white">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-1">{course.name}</h4>
                            <div className="flex items-center gap-2 mb-2">
                              {course.zoomLink ? (
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Zoom Ready
                                </Badge>
                              ) : (
                                <Badge className="bg-yellow-100 text-yellow-800">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Need Setup
                                </Badge>
                              )}
                            </div>
                          </div>
                          {!course.zoomLink && (
                            <Button
                              size="sm"
                              onClick={() => generateLinkForCourse(course.id)}
                              className="bg-thai-red hover:bg-thai-rose text-white"
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Generate
                            </Button>
                          )}
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-thai-orange" />
                            <span>{course.schedule}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-thai-orange" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-thai-orange" />
                            <span>{course.teacher}</span>
                          </div>
                        </div>
                        
                        {course.zoomLink && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <a
                                href={course.zoomLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-thai-red hover:underline text-sm font-medium"
                              >
                                Join Class →
                              </a>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(course.zoomLink!)}
                                className="text-thai-orange hover:bg-thai-orange hover:text-white"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Create Meeting Modal */}
          {showCreateForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle className="text-thai-red">Create New Zoom Meeting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Course Name</label>
                    <Input
                      value={createForm.courseName}
                      onChange={(e) => setCreateForm({...createForm, courseName: e.target.value})}
                      placeholder="e.g., General English Beginner"
                      className="border-thai-cream focus:border-thai-red"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Schedule</label>
                    <Input
                      value={createForm.schedule}
                      onChange={(e) => setCreateForm({...createForm, schedule: e.target.value})}
                      placeholder="e.g., จันทร์-ศุกร์ 19:00-20:00"
                      className="border-thai-cream focus:border-thai-red"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                    <Input
                      type="number"
                      value={createForm.duration}
                      onChange={(e) => setCreateForm({...createForm, duration: parseInt(e.target.value) || 60})}
                      className="border-thai-cream focus:border-thai-red"
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={createMeeting}
                      className="flex-1 bg-thai-red hover:bg-thai-rose text-white"
                    >
                      Create Meeting
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowCreateForm(false)}
                      className="border-thai-red text-thai-red hover:bg-thai-red hover:text-white"
                    >
                      Cancel
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