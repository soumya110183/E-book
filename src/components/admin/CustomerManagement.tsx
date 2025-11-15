import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Search, Filter, MoreVertical, Mail, Check } from 'lucide-react';
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";

export function CustomerManagement() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [mailPopup, setMailPopup] = useState<any>(null);
  const [mailText, setMailText] = useState("");
  const [actionMenu, setActionMenu] = useState<number | null>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!e.target.closest('.action-menu-container')) {
        setActionMenu(null);
      }
      if (!e.target.closest('.filter-menu-container')) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const customers = [
    { id: 1, name: 'Alex Rodriguez', email: 'alex.r@email.com', plan: 'Professional', status: 'Active', joined: '2024-01-15', spent: '₹199.99' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com', plan: 'Basic', status: 'Active', joined: '2024-02-20', spent: '₹59.97' },
    { id: 3, name: 'Michael Chen', email: 'michael.c@email.com', plan: 'Professional', status: 'Active', joined: '2023-11-10', spent: '₹399.98' },
    { id: 4, name: 'Emily Davis', email: 'emily.d@email.com', plan: 'Basic', status: 'Suspended', joined: '2024-03-05', spent: '₹19.99' },
    { id: 5, name: 'David Lee', email: 'david.l@email.com', plan: 'Institutional', status: 'Active', joined: '2023-09-01', spent: '₹1499.97' },
  ];

  const togglePlan = (plan: string) => {
    setSelectedPlans((prev) =>
      prev.includes(plan) ? prev.filter((p) => p !== plan) : [...prev, plan]
    );
  };

  const clearFilters = () => {
    setSortOption('');
    setSelectedPlans([]);
    setSearchQuery('');
  };

  const filteredCustomers = customers
    .filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((c) => (selectedPlans.length > 0 ? selectedPlans.includes(c.plan) : true))
    .sort((a, b) => {
      if (sortOption === 'az') return a.name.localeCompare(b.name);
      if (sortOption === 'za') return b.name.localeCompare(a.name);
      if (sortOption === 'newest') return new Date(b.joined).getTime() - new Date(a.joined).getTime();
      if (sortOption === 'oldest') return new Date(a.joined).getTime() - new Date(b.joined).getTime();
      return 0;
    });

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-[#1d4d6a] mb-1">Customer Management</h2>
        <p className="text-sm text-gray-500">{customers.length} total customers</p>
      </div>

      <Card className="border-none shadow-md relative">
        <CardHeader>
          <div className="flex items-center gap-4 flex-wrap">

            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Search customers..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Button */}
            <div className="relative filter-menu-container">
              <Button
                variant="outline"
                className="gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setFilterOpen(!filterOpen);
                }}
              >
                <Filter className="w-4 h-4" />
                Filter
              </Button>

              {filterOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border z-20 p-2">

                  <p className="text-xs text-gray-500 px-2 mb-1">Sort By</p>

                  <button className="w-full  text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => { setSortOption('az'); setFilterOpen(false); }}>
                    A → Z
                  </button>

                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => { setSortOption('za'); setFilterOpen(false); }}>
                    Z → A
                  </button>

                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    onClick={() => { setSortOption('newest'); setFilterOpen(false); }}>
                    Newest
                  </button>

                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 mb-2 text-sm"
                    onClick={() => { setSortOption('oldest'); setFilterOpen(false); }}>
                    Oldest
                  </button>

                  <hr />

                  <p className="text-xs text-gray-500 px-2 mt-2">Filter by Plan</p>

                  {['Basic', 'Professional', 'Institutional'].map((plan) => (
                    <button
                      key={plan}
                      className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => togglePlan(plan)}
                    >
                      {plan}
                      {selectedPlans.includes(plan) && <Check className="w-4 h-4 text-green-600" />}
                    </button>
                  ))}

                  <div className="p-2">
                    <Button
                      className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                      onClick={() => clearFilters()}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
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
              {filteredCustomers.map((customer) => (
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
                      customer.plan === 'Institutional'
                        ? 'bg-purple-100 text-purple-700'
                        : customer.plan === 'Professional'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                    }>
                      {customer.plan}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge className={
                      customer.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }>
                      {customer.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-gray-600">
                    {new Date(customer.joined).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-[#1d4d6a]">{customer.spent}</TableCell>

                  <TableCell>
                    <div className="flex gap-2">

                      {/* Mail */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setMailPopup(customer);
                          setMailText("");
                        }}
                      >
                        <Mail className="w-4 h-4" />
                      </Button>

                      {/* Action Menu */}
                      <div className="relative action-menu-container">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActionMenu(customer.id);
                          }}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>

                        {actionMenu === customer.id && (
                          <ul className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md border z-30 overflow-hidden">
                            {customer.status === 'Active' ? (
                              <>
                                <li
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                                >
                                  Suspend
                                </li>
                                <li
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left text-red-600"
                                >
                                  Delete
                                </li>
                              </>
                            ) : (
                              <>
                                <li
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                                >
                                  Activate
                                </li>
                                <li
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left text-red-600"
                                >
                                  Delete
                                </li>
                              </>
                            )}
                          </ul>
                        )}
                      </div>


                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </CardContent>
      </Card>

      {/* Mail Popup */}
      {mailPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[400px] space-y-4">
            <h2 className="text-xl font-semibold text-[#1d4d6a]">Send Message</h2>

            <div>
              <p className="text-sm text-gray-600"><strong>Name:</strong> {mailPopup.name}</p>
              {/* <p className="text-sm text-gray-600 mb-3"><strong>Email:</strong> {mailPopup.email}</p> */}
            </div>

            <textarea
              rows={4}
              className="w-full border rounded-md p-2 text-sm"
              placeholder="Write your message..."
              value={mailText}
              onChange={(e) => setMailText(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setMailPopup(null)}>Cancel</Button>

              <Button
                onClick={() => {
                  toast(`${mailPopup.name} sent message`);
                  setMailPopup(null);
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
