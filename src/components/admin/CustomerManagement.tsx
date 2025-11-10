import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Search, Filter, MoreVertical, Mail, Ban, CheckCircle } from 'lucide-react';

export function CustomerManagement() {
  const customers = [
    { id: 1, name: 'Alex Rodriguez', email: 'alex.r@email.com', plan: 'Annual', status: 'Active', joined: '2024-01-15', spent: '₹199.99' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com', plan: 'Monthly', status: 'Active', joined: '2024-02-20', spent: '₹59.97' },
    { id: 3, name: 'Michael Chen', email: 'michael.c@email.com', plan: 'Annual', status: 'Active', joined: '2023-11-10', spent: '₹399.98' },
    { id: 4, name: 'Emily Davis', email: 'emily.d@email.com', plan: 'Monthly', status: 'Suspended', joined: '2024-03-05', spent: '₹19.99' },
    { id: 5, name: 'David Lee', email: 'david.l@email.com', plan: 'Institutional', status: 'Active', joined: '2023-09-01', spent: '₹1499.97' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#1d4d6a] mb-1">Customer Management</h2>
          <p className="text-sm text-gray-500">{customers.length} total customers</p>
        </div>
        <Button className="bg-[#bf2026] hover:bg-[#a01c22] text-white">
          Export Data
        </Button>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input placeholder="Search customers..." className="pl-10" />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-[#1d4d6a] text-white text-xs">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-[#1d4d6a]">{customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{customer.email}</TableCell>
                  <TableCell>
                    <Badge className={
                      customer.plan === 'Institutional' ? 'bg-purple-100 text-purple-700' :
                      customer.plan === 'Annual' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }>
                      {customer.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">{new Date(customer.joined).toLocaleDateString()}</TableCell>
                  <TableCell className="text-[#1d4d6a]">{customer.spent}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
