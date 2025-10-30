import { useState } from 'react';
import { 
  BookOpen, 
  Home, 
  FileText, 
  ClipboardCheck, 
  Briefcase, 
  CreditCard, 
  User, 
  LogOut,
  Bell,
  Search,
  TrendingUp,
  Trophy,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { MyLibrary } from './user/MyLibrary';
import { MockTests } from './user/MockTests';
import { NotesRepository } from './user/NotesRepository';
import { WritingServices } from './user/WritingServices';
import { JobPortal } from './user/JobPortal';
import { PaymentsSubscriptions } from './user/PaymentsSubscriptions';
import { ProfileSettings } from './user/ProfileSettings';

interface UserDashboardProps {
  onNavigate: (page: string) => void;
  onOpenBook: (book: any) => void;
  onLogout: () => void;
}

type UserSection = 'dashboard' | 'library' | 'tests' | 'notes' | 'writing' | 'jobs' | 'payments' | 'profile';

export function UserDashboard({ onNavigate, onOpenBook, onLogout }: UserDashboardProps) {
  const [activeSection, setActiveSection] = useState<UserSection>('dashboard');

  const menuItems = [
    { id: 'dashboard' as UserSection, icon: Home, label: 'Dashboard' },
    { id: 'library' as UserSection, icon: BookOpen, label: 'My Library' },
    { id: 'tests' as UserSection, icon: ClipboardCheck, label: 'Mock Tests' },
    { id: 'notes' as UserSection, icon: FileText, label: 'Notes' },
    { id: 'writing' as UserSection, icon: FileText, label: 'Writing Services' },
    { id: 'jobs' as UserSection, icon: Briefcase, label: 'Job Portal' },
    { id: 'payments' as UserSection, icon: CreditCard, label: 'Payments' },
    { id: 'profile' as UserSection, icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6f8] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-screen overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-7 h-7 text-[#bf2026]" />
            <span className="text-[#1d4d6a]">AcademicHub</span>
          </div>
          <p className="text-xs text-gray-500">Student Portal</p>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                activeSection === item.id
                  ? 'bg-[#bf2026] text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-[#bf2026] transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-[#1d4d6a] mb-1">Welcome back, Alex!</h1>
              <p className="text-sm text-gray-500">Continue your learning journey</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search books, tests..."
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none focus:ring-2 focus:ring-[#bf2026] w-80"
                />
              </div>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#bf2026] rounded-full"></span>
              </button>
              <Avatar>
                <AvatarFallback className="bg-[#1d4d6a] text-white">AR</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8">
          {activeSection === 'dashboard' && <DashboardHome onOpenBook={onOpenBook} />}
          {activeSection === 'library' && <MyLibrary onOpenBook={onOpenBook} />}
          {activeSection === 'tests' && <MockTests />}
          {activeSection === 'notes' && <NotesRepository />}
          {activeSection === 'writing' && <WritingServices />}
          {activeSection === 'jobs' && <JobPortal />}
          {activeSection === 'payments' && <PaymentsSubscriptions />}
          {activeSection === 'profile' && <ProfileSettings />}
        </main>
      </div>
    </div>
  );
}

function DashboardHome({ onOpenBook }: { onOpenBook: (book: any) => void }) {
  const recentBooks = [
    { id: 1, title: 'Advanced Calculus', author: 'Dr. Smith', progress: 65, cover: '📘' },
    { id: 2, title: 'Quantum Physics', author: 'Prof. Johnson', progress: 42, cover: '📗' },
    { id: 3, title: 'Machine Learning', author: 'Dr. Chen', progress: 88, cover: '📙' },
  ];

  const upcomingTests = [
    { id: 1, title: 'Mathematics Mock Test 3', date: '2 days', questions: 50 },
    { id: 2, title: 'Physics Final Prep', date: '5 days', questions: 75 },
    { id: 3, title: 'Computer Science Quiz', date: '1 week', questions: 30 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Books Read</p>
                <h3 className="text-[#1d4d6a] mb-1">24</h3>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+3 this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-[#bf2026] bg-opacity-10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#bf2026]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Tests Completed</p>
                <h3 className="text-[#1d4d6a] mb-1">18</h3>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <Trophy className="w-3 h-3" />
                  <span>92% avg score</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-[#bf2026] bg-opacity-10 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-[#bf2026]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Study Hours</p>
                <h3 className="text-[#1d4d6a] mb-1">156</h3>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <Clock className="w-3 h-3" />
                  <span>24h this week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-[#bf2026] bg-opacity-10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#bf2026]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Active Streak</p>
                <h3 className="text-[#1d4d6a] mb-1">12 Days</h3>
                <div className="flex items-center gap-1 text-xs text-orange-600">
                  <Trophy className="w-3 h-3" />
                  <span>Keep it up!</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-[#bf2026] bg-opacity-10 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-[#bf2026]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reading Progress & Upcoming Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-[#1d4d6a]">Continue Reading</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentBooks.map((book) => (
              <div
                key={book.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => onOpenBook(book)}
              >
                <div className="text-4xl">{book.cover}</div>
                <div className="flex-1">
                  <h4 className="text-[#1d4d6a] mb-1">{book.title}</h4>
                  <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                  <div className="flex items-center gap-2">
                    <Progress value={book.progress} className="flex-1 h-2" />
                    <span className="text-sm text-gray-600">{book.progress}%</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-[#1d4d6a]">Upcoming Tests</CardTitle>
            <CardDescription>Don't miss these assessments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTests.map((test) => (
              <div key={test.id} className="p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm text-[#1d4d6a] mb-2">{test.title}</h4>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {test.date}
                  </span>
                  <span>{test.questions} questions</span>
                </div>
              </div>
            ))}
            <Button className="w-full bg-[#bf2026] hover:bg-[#a01c22] text-white rounded-lg">
              View All Tests
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-[#1d4d6a]">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
              <div className="w-2 h-2 bg-[#bf2026] rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-[#1d4d6a]">Completed "Physics Mock Test 2"</p>
                <p className="text-xs text-gray-500">Score: 94% • 2 hours ago</p>
              </div>
              <Badge className="bg-green-100 text-green-700">Passed</Badge>
            </div>
            <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
              <div className="w-2 h-2 bg-[#bf2026] rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-[#1d4d6a]">Purchased "Organic Chemistry Notes"</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
              <Badge className="bg-blue-100 text-blue-700">Purchase</Badge>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-[#bf2026] rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-[#1d4d6a]">Started reading "Machine Learning Basics"</p>
                <p className="text-xs text-gray-500">Yesterday at 3:42 PM</p>
              </div>
              <Badge className="bg-purple-100 text-purple-700">Reading</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
