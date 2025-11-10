import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Users, BookOpen, DollarSign, TrendingUp, ArrowUp, ArrowDown, IndianRupee } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function AdminDashboardHome() {
  const kpiData = [
    { label: 'Total Users', value: '12,453', change: '+12.5%', trend: 'up', icon: Users, color: 'bg-blue-500' },
    { label: 'Active Subscriptions', value: '8,234', change: '+8.3%', trend: 'up', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Books Sold', value: '24,567', change: '+15.7%', trend: 'up', icon: BookOpen, color: 'bg-purple-500' },
    { label: 'Revenue (MTD)', value: '₹145,890', change: '+18.2%', trend: 'up', icon: IndianRupee, color: 'bg-[#bf2026]' },
  ];

  const salesData = [
    { month: 'Jan', revenue: 45000, users: 320 },
    { month: 'Feb', revenue: 52000, users: 410 },
    { month: 'Mar', revenue: 48000, users: 380 },
    { month: 'Apr', revenue: 61000, users: 520 },
    { month: 'May', revenue: 75000, users: 630 },
    { month: 'Jun', revenue: 88000, users: 720 },
  ];

  const categoryData = [
    { name: 'Science', value: 35, color: '#bf2026' },
    { name: 'Engineering', value: 25, color: '#1d4d6a' },
    { name: 'Arts', value: 20, color: '#3b82f6' },
    { name: 'Business', value: 15, color: '#10b981' },
    { name: 'Other', value: 5, color: '#6b7280' },
  ];

  const recentActivity = [
    { user: 'John Smith', action: 'Purchased Annual Subscription', time: '5 minutes ago', type: 'subscription' },
    { user: 'Sarah Johnson', action: 'Completed Mock Test', time: '12 minutes ago', type: 'activity' },
    { user: 'Admin', action: 'Uploaded new e-book: "Quantum Physics"', time: '1 hour ago', type: 'content' },
    { user: 'Michael Chen', action: 'Requested Writing Service', time: '2 hours ago', type: 'service' },
    { user: 'Emily Davis', action: 'Registered new account', time: '3 hours ago', type: 'user' },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">{kpi.label}</p>
                  <h3 className="text-[#1d4d6a] mb-2">{kpi.value}</h3>
                  <div className={`flex items-center gap-1 text-xs ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    <span>{kpi.change} vs last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12  bg-opacity-10 rounded-lg flex items-center justify-center`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-[#1d4d6a]">Revenue & User Growth</CardTitle>
            <CardDescription>6-month trend analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#bf2026" strokeWidth={2} name="Revenue (₹)" />
                <Line yAxisId="right" type="monotone" dataKey="users" stroke="#1d4d6a" strokeWidth={2} name="New Users" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-[#1d4d6a]">Content Categories</CardTitle>
            <CardDescription>Distribution by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={(entry) => `${entry.name} ${entry.value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-[#1d4d6a]">Recent Activity</CardTitle>
          <CardDescription>Latest platform events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'subscription' ? 'bg-green-500' :
                  activity.type === 'activity' ? 'bg-blue-500' :
                  activity.type === 'content' ? 'bg-purple-500' :
                  activity.type === 'service' ? 'bg-orange-500' :
                  'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-[#1d4d6a]">
                    <span>{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
