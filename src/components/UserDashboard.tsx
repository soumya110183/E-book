import { useState, useRef, useEffect, use, Suspense } from "react";
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
  ChevronRight,
  Menu,
  Settings,
  Navigation,
  ShoppingCart,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";

import Explore from "./user/Explore";
import { MyLibrary } from "./user/MyLibrary";
import { MockTests } from "./user/MockTests";
import { NotesRepository } from "./user/NotesRepository";
import { WritingServices } from "./user/WritingServices";
import { JobPortal } from "./user/JobPortal";
import { PaymentsSubscriptions } from "./user/PaymentsSubscriptions";
import { ProfileSettings } from "./user/ProfileSettings";
import NotificationsView from "./user/NotificationView";

interface UserDashboardProps {
  onNavigate: (page: string) => void;
  onOpenBook: (book: any) => void;
  onLogout: () => void;
}

type UserSection =
  | "dashboard"
  | "explore"
  | "library"
  | "tests"
  | "notes"
  | "writing"
  | "jobs"
  | "payments"
  | "profile"
  | "notifications";

export function UserDashboard({ onNavigate, onOpenBook, onLogout }: UserDashboardProps) {
  const [activeSection, setActiveSection] = useState<UserSection>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [cartCount, setCartCount] = useState<number>(0);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { id: "dashboard" as UserSection, icon: Home, label: "Dashboard" },
    { id: "explore" as UserSection, icon: Navigation, label: "Explore" },
    { id: "library" as UserSection, icon: BookOpen, label: "My Library" },
    { id: "tests" as UserSection, icon: ClipboardCheck, label: "Mock Tests" },
    { id: "notes" as UserSection, icon: FileText, label: "Notes" },
    { id: "writing" as UserSection, icon: FileText, label: "Writing Services" },
    { id: "jobs" as UserSection, icon: Briefcase, label: "Job Portal" },
    { id: "payments" as UserSection, icon: CreditCard, label: "Payments" },
    { id: "profile" as UserSection, icon: User, label: "Profile" },
  ];

  const notifications = [
    { id: 1, message: "Your test results are available.", time: "2h ago" },
    { id: 2, message: "New notes added to your library.", time: "1d ago" },
    { id: 3, message: "Subscription renewed successfully.", time: "3d ago" },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved) {
      setSidebarCollapsed(saved === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", sidebarCollapsed.toString());
  }, [sidebarCollapsed]);

  // const handleNotificationClick = (id: number) => {
  //   setReadNotifications((prev) => [...prev, id]);
  //   setActiveSection("notifications");
  //   setDropdownOpen(false);
  // };

  const handleLogoutClick = () => {
    toast.success("Logged out successfully ✅"); // 🔹 UPDATED
    onLogout();
  };

  const handleAddToCart = () => {
    setCartCount((count) => count + 1);
    toast.success("Item added to cart 🛒");
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] flex">
      {/* Sidebar */}
      <aside
        className={`${sidebarCollapsed ? "w-20" : "w-64"
          } bg-white border-r border-gray-200 fixed h-screen overflow-y-auto transition-all duration-300`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          {!sidebarCollapsed ? (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-7 h-7 text-[#bf2026]" />
                <span className="text-[#1d4d6a] font-medium">AcademicHub</span>
              </div>
              <p className="text-xs text-gray-500">Student Portal</p>
            </div>
          ) : (
            <BookOpen className="w-7 h-7 text-[#bf2026]" />
          )}
        </div>

        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setDropdownOpen(false); // 🔹 UPDATED
                setAvatarOpen(false); // 🔹 UPDATED
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${activeSection === item.id
                  ? "bg-[#bf2026] text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <item.icon
                className={`w-5 h-5 ${activeSection === item.id ? "text-white" : "group-hover:text-[#bf2026]"
                  }`}
              />
              {!sidebarCollapsed && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-[#bf2026] transition-all"
            title={sidebarCollapsed ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarCollapsed ? "ml-20" : "ml-64"} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                aria-label="Toggle Sidebar">
                <Menu className="w-5 h-5 text-gray-600" />
              </Button>
              <div>
                <h1 className="text-[#1d4d6a] mb-1">Welcome back, Alex!</h1>
                <p className="text-sm text-gray-500">Continue your learning journey</p>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none focus:ring-2 focus:ring-[#bf2026] w-64"
                />
              </div>

              {/* Notifications */}
              <div className="relative" ref={dropdownRef}>
                <button
                  className="relative p-2 hover:bg-gray-100 rounded-lg"
                  aria-label="Notifications"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#bf2026] rounded-full"></span>
                  )}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl border border-gray-100 z-50">
                    <div className="p-3 border-b border-gray-200 font-semibold text-gray-700">
                      Notifications
                    </div>
                    <ul className="max-h-60 overflow-y-auto">
                      {notifications.map((n) => (
                        <li
                          key={n.id}
                          className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
                        >
                          {n.message}
                        </li>
                      ))}
                    </ul>
                    <div className="text-center py-2 border-t border-gray-200">
                      <button
                        onClick={() => {
                          setActiveSection("notifications");
                          setDropdownOpen(false);
                        }}
                        className="text-[#bf2026] text-sm font-medium hover:underline"
                      >
                        View all
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Add to Cart Icon */}
              <div className="relative">
                <button
                  className="relative p-2 rounded-lg hover:bg-gray-100"
                  aria-label="Cart"
                  onClick={() => toast.success('Item added to cart 🛒')}
                >
                  <ShoppingCart className="w-5 h-5 text-gray-600" />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#bf2026] rounded-full"></span>
                  )}
                </button>
              </div>


              {/* Avatar Dropdown */}
              <div className="relative" ref={avatarRef}>
                <button
                  className="p-1 rounded-full hover:bg-gray-100"
                  aria-label="User Menu"
                  onClick={() => setAvatarOpen(!avatarOpen)}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </button>
                {avatarOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border border-gray-100 z-50">
                    <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Alex</p>
                        <p className="text-xs text-gray-400">alex@student.com</p>
                      </div>
                    </div>
                    <ul className="py-2">
                      <li>
                        <button
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                          onClick={() => setActiveSection("profile")}
                        >
                          <Settings className="w-4 h-4" /> Settings
                        </button>
                      </li>
                      <li>
                        <button
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                          onClick={handleLogoutClick}
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8">
          <Suspense fallback={<p>Loading...</p>}> {/* 🔹 UPDATED */}
            {activeSection === "dashboard" && <DashboardHome onOpenBook={onOpenBook} />}
            {activeSection === "explore" && <Explore onOpenBook={onOpenBook} />}
            {activeSection === "library" && <MyLibrary onOpenBook={onOpenBook} />}
            {activeSection === "tests" && <MockTests />}
            {activeSection === "notes" && <NotesRepository />}
            {activeSection === "writing" && <WritingServices />}
            {activeSection === "jobs" && <JobPortal />}
            {activeSection === "payments" && <PaymentsSubscriptions />}
            {activeSection === "profile" && <ProfileSettings />}
            {activeSection === "notifications" && <NotificationsView />}
          </Suspense>
        </main>
      </div>
    </div>
  );
}

function DashboardHome({ onOpenBook }: { onOpenBook: (book: any) => void }) {
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [showAllTests, setShowAllTests] = useState(false);

  const handleTestClick = (test: any) => setSelectedTest(test);
  const handleCloseModal = () => setSelectedTest(null);
  const handleStartTest = () => {
    console.log("Starting test:", selectedTest.title);
    setSelectedTest(null);
  };

  const recentBooks = [
    { id: 1, title: "Advanced Calculus", author: "Dr. Smith", progress: 65, cover: "📘" },
    { id: 2, title: "Quantum Physics", author: "Prof. Johnson", progress: 42, cover: "📗" },
    { id: 3, title: "Machine Learning", author: "Dr. Chen", progress: 88, cover: "📙" },
  ];

  const allTests = [
    { id: 1, title: "Mathematics Mock Test 3", date: "2 days", questions: 50 },
    { id: 2, title: "Physics Final Prep", date: "5 days", questions: 75 },
    { id: 3, title: "Computer Science Quiz", date: "1 week", questions: 30 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6 flex justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Books Read</p>
              <h3 className="text-[#1d4d6a] mb-1">24</h3>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span>+3 this month</span>
              </div>
            </div>
            <BookOpen className="w-6 h-6 text-[#bf2026]" />
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6 flex justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Tests Completed</p>
              <h3 className="text-[#1d4d6a] mb-1">18</h3>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <Trophy className="w-3 h-3" />
                <span>92% avg score</span>
              </div>
            </div>
            <ClipboardCheck className="w-6 h-6 text-[#bf2026]" />
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6 flex justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Study Hours</p>
              <h3 className="text-[#1d4d6a] mb-1">156</h3>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <Clock className="w-3 h-3" />
                <span>24h this week</span>
              </div>
            </div>
            <TrendingUp className="w-6 h-6 text-[#bf2026]" />
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6 flex justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Active Streak</p>
              <h3 className="text-[#1d4d6a] mb-1">12 Days</h3>
              <div className="flex items-center gap-1 text-xs text-orange-600">
                <Trophy className="w-3 h-3" />
                <span>Keep it up!</span>
              </div>
            </div>
            <Trophy className="w-6 h-6 text-[#bf2026]" />
          </CardContent>
        </Card>
      </div>

      {/* Continue Reading */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-[#1d4d6a]">Continue Reading</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentBooks.map((book) => (
            <div
              key={book.id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => onOpenBook(book)}
            >
              <div className="text-4xl">{book.cover}</div>
              <div className="flex-1">
                <h4 className="text-[#1d4d6a] mb-1">{book.title}</h4>
                <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                <Progress value={book.progress} className="flex-1 h-2" />
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
