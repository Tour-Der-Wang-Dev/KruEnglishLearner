import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import {
  DollarSign,
  Users,
  BookOpen,
  TrendingUp,
  Calendar,
  Mail,
  Download,
  RefreshCw,
  Search,
  Filter,
  MoreHorizontal
} from 'lucide-react';

interface PaymentRecord {
  id: string;
  customerEmail: string;
  customerName: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed';
  courseType: string;
  planDuration: string;
  createdAt: string;
  stripePaymentId: string;
}

interface DashboardStats {
  totalRevenue: number;
  totalStudents: number;
  totalCourses: number;
  monthlyGrowth: number;
  recentPayments: PaymentRecord[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalStudents: 0,
    totalCourses: 0,
    monthlyGrowth: 0,
    recentPayments: []
  });
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load dashboard stats
      const statsResponse = await apiRequest('GET', '/api/admin/dashboard-stats');
      const statsData = await statsResponse.json();
      setStats(statsData);
      
      // Load payments
      const paymentsResponse = await apiRequest('GET', '/api/admin/payments');
      const paymentsData = await paymentsResponse.json();
      setPayments(paymentsData);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefund = async (paymentId: string) => {
    try {
      await apiRequest('POST', `/api/admin/payments/${paymentId}/refund`);
      toast({
        title: "Success",
        description: "Refund processed successfully",
      });
      loadDashboardData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process refund",
        variant: "destructive"
      });
    }
  };

  const exportPayments = () => {
    const csvData = payments.map(payment => ({
      'Payment ID': payment.stripePaymentId,
      'Customer Name': payment.customerName,
      'Customer Email': payment.customerEmail,
      'Amount': payment.amount,
      'Currency': payment.currency,
      'Status': payment.status,
      'Course': payment.courseType,
      'Plan': payment.planDuration,
      'Date': new Date(payment.createdAt).toLocaleDateString('th-TH')
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
    a.setAttribute('download', `payments-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.stripePaymentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-thai-red mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-thai-cream p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-thai-red">Admin Dashboard</h1>
            <p className="text-gray-600">Manage payments and monitor platform performance</p>
          </div>
          <Button onClick={loadDashboardData} className="bg-thai-red hover:bg-thai-rose">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-thai-red">
                    ฿{stats.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-thai-red" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-thai-red">{stats.totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-thai-rose" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Courses</p>
                  <p className="text-2xl font-bold text-thai-red">{stats.totalCourses}</p>
                </div>
                <BookOpen className="h-8 w-8 text-thai-orange" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                  <p className="text-2xl font-bold text-green-600">+{stats.monthlyGrowth}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="payments" className="space-y-6">
            {/* Filters and Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Payment Management
                  </span>
                  <Button onClick={exportPayments} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by name, email, or payment ID..."
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
                    <option value="all">All Status</option>
                    <option value="succeeded">Succeeded</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>

                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {filteredPayments.map((payment) => (
                      <div key={payment.id} className="border border-thai-cream rounded-lg p-4 bg-white">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-800">{payment.customerName}</h4>
                              <Badge className={getStatusColor(payment.status)}>
                                {payment.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{payment.customerEmail}</p>
                            <p className="text-sm text-gray-500">
                              {payment.courseType} - {payment.planDuration}
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(payment.createdAt).toLocaleString('th-TH')}
                            </p>
                          </div>
                          
                          <div className="text-right space-y-2">
                            <p className="text-2xl font-bold text-thai-red">
                              ฿{payment.amount.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">
                              ID: {payment.stripePaymentId}
                            </p>
                            {payment.status === 'succeeded' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRefund(payment.id)}
                                className="text-red-600 border-red-300 hover:bg-red-50"
                              >
                                Refund
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Customer Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Customer management features coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Analytics & Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}