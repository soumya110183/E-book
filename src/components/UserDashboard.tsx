import { useState, useRef, useEffect, Suspense } from "react";
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


import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

import { Avatar, AvatarFallback } from "./ui/avatar";

import { toast } from "sonner";

import Explore from "./user/Explore";
import { MyLibrary } from "./user/MyLibrary";
import { MockTests } from "./user/MockTests";
import { NotesRepository } from "./user/NotesRepository";
import { WritingServices } from "./user/WritingServices";
import { JobPortal } from "./user/JobPortal";
import { PaymentsSubscriptions } from "./user/PaymentsSubscriptions";
import { ProfileSettings } from "./user/ProfileSettings";
import NotificationView from "./user/NotificationView";
import CartPage from "./user/Cartpage";
import axios from "axios";


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
  | "notifications"
  | "cartpage";

export function UserDashboard({ onNavigate, onOpenBook, onLogout }: UserDashboardProps) {
  const [activeSection, setActiveSection] = useState<UserSection>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [dashboardData, setDashboardData] = useState<any>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const session = JSON.parse(localStorage.getItem("session") || "{}");
      const token = session?.access_token;

      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      const res = await axios.get("http://localhost:5000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboardData(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  fetchDashboard();
}, []);




  const [cartItems] = useState([
    { id: 1, name: "Atomic Habit", price: 12.99, image: "https://m.media-amazon.com/images/I/81bGKUa1e0L.jpg"},
    { id: 2, name: "Deep Work", price: 9.99, image: "https://m.media-amazon.com/images/I/71g2ednj0JL.jpg"},
    { id: 3, name: "Rich Dad Poor dad", price: 10.99, image: "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg"},
  ])

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
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setCartOpen(false);
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

  // 🔐 Handle logout
  const handleLogoutClick = () => {
    toast.success("Logged out successfully ✅"); // 🔹 UPDATED
    onLogout();
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
                <span className="text-[#1d4d6a] font-medium">FarmInk Forum</span>
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
               <h1 className="text-[#1d4d6a] mb-1">
  Welcome back, {dashboardData?.user?.name || "Student"}!
</h1>

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

              {/* Cart Dropdown */}
              <div className="relative" ref={cartRef}>
                <button
                  className="relative p-2 hover:bg-gray-100 rounded-lg"
                  onClick={() => setCartOpen(!cartOpen)}
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart className="w-5 h-5 text-gray-600" />
                  {cartItems.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#bf2026] rounded-full"></span>
                  )}
                </button>

                {cartOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-xl border border-gray-100 z-50">
                    <div className="p-3 border-b font-semibold text-gray-700 flex justify-between">
                      <span>Cart</span>
                      <span className="text-xs text-gray-500">{cartItems.length} items</span>
                    </div>

                    {cartItems.length > 0 ? (
                      <>
                        <ul className="max-h-60 overflow-y-auto">
                          {cartItems.map((item) => (
                            <li
                              key={item.id}
                              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50"
                            >
                              <img src={item.image} alt={item.name} className="w-10 h-10 rounded" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-700">{item.name}</p>
                                <p className="text-xs text-gray-500">₹{item.price.toFixed(2)}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div className="text-center py-2 border-t">
                          <button
                            onClick={() => {
                              setActiveSection("cartpage");
                              setCartOpen(false);
                            }}
                            className="text-[#bf2026] text-sm font-medium hover:underline"
                          >
                            View Cart
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-gray-500 py-6 text-sm">
                        Your cart is empty 🛍️
                      </div>
                    )}
                  </div>
                )}
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
           {activeSection === "dashboard" && (
  <DashboardHome
    onOpenBook={onOpenBook}
    dashboardData={dashboardData}
    loading={loading}
    error={error}
  />
)}

            {activeSection === "explore" && <Explore onOpenBook={onOpenBook} />}
            {activeSection === "library" && <MyLibrary onOpenBook={onOpenBook} />}
            {activeSection === "tests" && <MockTests />}
            {activeSection === "notes" && <NotesRepository />}
            {activeSection === "writing" && <WritingServices />}
            {activeSection === "jobs" && <JobPortal />}
            {activeSection === "payments" && <PaymentsSubscriptions />}
            {activeSection === "profile" && <ProfileSettings />}
            {activeSection === "notifications" && <NotificationView onNavigate={onNavigate} />}
            {activeSection === "cartpage" && <CartPage items={cartItems} />}
          </Suspense>
        </main>
      </div>
    </div>
  );
}

function DashboardHome({ onOpenBook, dashboardData, loading, error }: { onOpenBook: (book: any) => void; dashboardData?: any; loading: boolean; error: string; }) {
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [showAllTests, setShowAllTests] = useState(false);

  const handleTestClick = (test: any) => setSelectedTest(test);
  const handleCloseModal = () => setSelectedTest(null);
  const handleStartTest = () => {
    console.log("Starting test:", selectedTest.title);
    setSelectedTest(null);
  };

const recentBooks = dashboardData?.recentBooks || [];



  return (
   <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  {/* Books Read */}
  <Card className="shadow-md hover:shadow-lg transition-shadow">
    <CardContent className="p-6 flex justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">Books Read</p>
        <h3 className="text-[#1d4d6a] mb-1">
          {dashboardData?.stats?.booksRead ?? 0}
        </h3>
        <div className="flex items-center gap-1 text-xs text-green-600">
          <TrendingUp className="w-3 h-3" />
          <span>
            {dashboardData?.stats?.booksChange > 0
              ? `+${dashboardData.stats.booksChange} this month`
              : "No new books this month"}
          </span>
        </div>
      </div>
      <BookOpen className="w-6 h-6 text-[#bf2026]" />
    </CardContent>
  </Card>

  {/* Tests Completed */}
  <Card className="shadow-md hover:shadow-lg transition-shadow">
    <CardContent className="p-6 flex justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">Tests Completed</p>
        <h3 className="text-[#1d4d6a] mb-1">
          {dashboardData?.stats?.testsCompleted ?? 0}
        </h3>
        <div className="flex items-center gap-1 text-xs text-green-600">
          <Trophy className="w-3 h-3" />
          <span>
            {dashboardData?.stats?.averageScore
              ? `${dashboardData.stats.averageScore}% avg score`
              : "No tests yet"}
          </span>
        </div>
      </div>
      <ClipboardCheck className="w-6 h-6 text-[#bf2026]" />
    </CardContent>
  </Card>

  {/* Study Hours */}
  <Card className="shadow-md hover:shadow-lg transition-shadow">
    <CardContent className="p-6 flex justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">Study Hours</p>
        <h3 className="text-[#1d4d6a] mb-1">
          {dashboardData?.stats?.studyHours ?? 0}h
        </h3>
        <div className="flex items-center gap-1 text-xs text-green-600">
          <Clock className="w-3 h-3" />
          <span>
            {dashboardData?.stats?.weeklyHours
              ? `${dashboardData.stats.weeklyHours}h this week`
              : "No study time logged"}
          </span>
        </div>
      </div>
      <TrendingUp className="w-6 h-6 text-[#bf2026]" />
    </CardContent>
  </Card>

  {/* Active Streak */}
  <Card className="shadow-md hover:shadow-lg transition-shadow">
    <CardContent className="p-6 flex justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">Active Streak</p>
        <h3 className="text-[#1d4d6a] mb-1">
          {dashboardData?.stats?.activeStreak ?? 0} Days
        </h3>
        <div className="flex items-center gap-1 text-xs text-orange-600">
          <Trophy className="w-3 h-3" />
          <span>
            {dashboardData?.stats?.activeStreak >= 5
              ? "🔥 Great streak!"
              : "Keep it up!"}
          </span>
        </div>
      </div>
      <Trophy className="w-6 h-6 text-[#bf2026]" />
    </CardContent>
  </Card>
</div>

  );
}
