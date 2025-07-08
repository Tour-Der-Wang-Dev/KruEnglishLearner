import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, BookOpen, Trophy, Calendar, Settings, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [user, setUser] = useState({
    name: "Student Name",
    email: "student@example.com",
    phone: "+66 XX XXX XXXX",
    level: "A2",
    joinDate: "January 2025"
  });

  const { toast } = useToast();

  const enrollments = [
    {
      course: "General English",
      plan: "3-Month Plan",
      status: "Active",
      nextClass: "Saturday, 2:00 PM",
      progress: 65
    },
    {
      course: "CEFR Certification",
      plan: "Monthly",
      status: "Completed",
      nextClass: "Certificate Earned",
      progress: 100
    }
  ];

  const achievements = [
    { name: "First Class Completed", icon: "🎯", date: "Jan 5, 2025" },
    { name: "Level A2 Achieved", icon: "📚", date: "Jan 10, 2025" },
    { name: "Perfect Attendance", icon: "⭐", date: "Jan 15, 2025" },
    { name: "Quiz Master", icon: "🏆", date: "Jan 20, 2025" }
  ];

  const handleUpdateProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-2 text-gray-600">
            Manage your account settings and track your learning progress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/api/placeholder/96/96" />
                  <AvatarFallback className="text-xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Level {user.level}
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Active Student
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mt-2">Joined {user.joinDate}</p>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Current Enrollments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrollments.map((enrollment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{enrollment.course}</h4>
                        <p className="text-sm text-gray-600">{enrollment.plan}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge 
                            variant={enrollment.status === 'Active' ? 'default' : 'secondary'}
                            className={enrollment.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {enrollment.status}
                          </Badge>
                          <span className="text-sm text-gray-600">{enrollment.nextClass}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{enrollment.progress}%</div>
                        <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${enrollment.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-900">{achievement.name}</h4>
                        <p className="text-sm text-gray-600">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Billing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your personal information and account settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={user.name}
                      onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={user.phone}
                    onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <Button onClick={handleUpdateProfile}>
                  <Settings className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Class Schedule</CardTitle>
                <CardDescription>
                  View your upcoming classes and manage your learning schedule
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">General English - Conversation Practice</h4>
                        <p className="text-sm text-gray-600">Saturday, January 25, 2025 at 2:00 PM (GMT+7)</p>
                        <p className="text-sm text-gray-600">Teacher: Sarah Johnson</p>
                      </div>
                      <Button size="sm">Join Class</Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">General English - Grammar Focus</h4>
                        <p className="text-sm text-gray-600">Sunday, January 26, 2025 at 10:00 AM (GMT+7)</p>
                        <p className="text-sm text-gray-600">Teacher: Michael Brown</p>
                      </div>
                      <Button size="sm" variant="outline">Scheduled</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Subscriptions</CardTitle>
                <CardDescription>
                  Manage your payment methods and subscription details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Current Subscription</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">General English - 3 Month Plan</p>
                        <p className="text-sm text-gray-600">Next billing: February 8, 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">1,170 THB</p>
                        <p className="text-sm text-gray-600">10% discount applied</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Payment Method</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-5 bg-blue-600 rounded"></div>
                        <div>
                          <p className="text-sm">•••• •••• •••• 4242</p>
                          <p className="text-xs text-gray-600">Expires 12/27</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Update</Button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline">
                      <CreditCard className="h-4 w-4 mr-2" />
                      View Billing History
                    </Button>
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage Subscription
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}