import { useEffect, useRef, useState } from 'react';
import { 
  LayoutDashboard,
  Users,
  BookOpen,
  Shield,
  CreditCard,
  FileText,
  Cpu,
  Bell,
  Settings,
  LogOut,
  Search,
  Menu,
  Briefcase,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { AdminDashboardHome } from './admin/AdminDashboardHome';
import { CustomerManagement } from './admin/CustomerManagement';
import { ContentManagement } from './admin/ContentManagement';
import { DRMControls } from './admin/DRMControls';
import { PaymentsAdmin } from './admin/PaymentsAdmin';
import { ReportsAnalytics } from './admin/ReportsAnalytics';
import { AIAutomation } from './admin/AIAutomation';
import { NotificationsAdmin } from './admin/NotificationsAdmin';
import { SystemSettings } from './admin/SystemSettings';
import { JobPortalAdmin } from './admin/JobPortalAdmin';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

type AdminSection = 'dashboard' | 'customers' | 'content' | 'drm' | 'payments' | 'reports' | 'ai' | 'notifications' | 'jobs' | 'settings';

export function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement|null>(null);
  const [avataropen, setAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement|null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuItems = [
    { id: 'dashboard' as AdminSection, icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'customers' as AdminSection, icon: Users, label: 'Customers' },
    { id: 'content' as AdminSection, icon: BookOpen, label: 'Content' },
    { id: 'drm' as AdminSection, icon: Shield, label: 'DRM Controls' },
    { id: 'payments' as AdminSection, icon: CreditCard, label: 'Payments' },
    { id: 'reports' as AdminSection, icon: FileText, label: 'Reports' },
    { id: 'ai' as AdminSection, icon: Cpu, label: 'AI Automation' },
    { id: 'notifications' as AdminSection, icon: Bell, label: 'Notifications' },
    { id: 'jobs' as AdminSection, icon: Briefcase, label: 'Job Portal' },
    { id: 'settings' as AdminSection, icon: Settings, label: 'Settings' },
  ];
  const notifications = [
    { id: 1, message: 'New user registered: Jane Doe', time: '2 mins ago' },
    { id: 2, message: 'Subscription renewed: John Smith', time: '10 mins ago' },
    { id: 3, message: 'New content uploaded: "Advanced Mathematics"', time: '1 hour ago' },
  ];

  // Close dropdown on outside click
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

  //Dark mode toggle effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);


  return (
    <div className="min-h-screen bg-[#f5f6f8] flex">
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-[#1d4d6a] text-white fixed h-screen overflow-y-auto transition-all duration-300`}>
        <div className="p-6 border-b border-[#2a5f7f]">
          {!sidebarCollapsed && (
            <>
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-7 h-7 text-[#bf2026]" />
                <span>Admin Panel</span>
              </div>
              <p className="text-xs text-gray-300">AcademicHub</p>
            </>
          )}
          {sidebarCollapsed && (
            <Shield className="w-7 h-7 text-[#bf2026] mx-auto" />
          )}
        </div>

        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all group ${
                activeSection === item.id
                  ? 'bg-[#bf2026] text-white shadow-lg shadow-[#bf2026]/20'
                  : 'text-gray-300 hover:bg-[#2a5f7f] hover:text-white'
              }`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-white' : 'group-hover:text-[#bf2026]'}`} />
              {!sidebarCollapsed && <span className="text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#2a5f7f]">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#2a5f7f] hover:text-white transition-all"
            title={sidebarCollapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                variant="ghost"
                size="sm"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-[#1d4d6a] mb-1">
                  {menuItems.find(item => item.id === activeSection)?.label}
                </h1>
                <p className="text-sm text-gray-500">Manage your platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg border-none focus:ring-2 focus:ring-[#bf2026] w-80"
                />
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Notification Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  className="relative p-2 hover:bg-gray-100 rounded-lg"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  {notifications.length > 0 &&(
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#bf2026] rounded-full"></span>
                  )}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl border border-gray-100 z-50">
                    <div className="p-3 border-b border-gray-200 font-semibold text-gray-700">
                      Notifications
                    </div>
                    <ul className="max-h-60 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((n) => (
                          <li
                            key={n.id}
                            className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                          >
                            {n.message}
                          </li>
                        ))
                      ) : (
                        <li className="px-3 py-4 text-sm text-gray-400 text-center">
                          No new notifications
                        </li>
                      )}
                    </ul>
                    <div className="text-center py-2 border-t border-gray-200">
                      <button className="text-[#bf2026] text-sm font-medium hover:underline">
                        View all
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Avatar Dropdown */}
              <div className="relative" ref={avatarRef}>
                <button 
                  className="p-1 rounded-full hover:bg-gray-100"
                  onClick={() => setAvatarOpen(!avataropen)}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </button>
                {avataropen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border border-gray-100 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-700">Admin</p>
                      <p className="text-xs text-gray-400">admin@academichub.com</p>
                    </div>
                    <ul className="py-2">
                      <li>
                        <button
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                          onClick={() => setActiveSection("settings")}
                        >
                          <Settings className="w-4 h-4" /> Settings
                        </button>
                      </li>
                      <li>
                        <button
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                          onClick={onLogout}
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

        {/* Content */}
        <main className="p-8">
          {activeSection === 'dashboard' && <AdminDashboardHome />}
          {activeSection === 'customers' && <CustomerManagement />}
          {activeSection === 'content' && <ContentManagement />}
          {activeSection === 'drm' && <DRMControls />}
          {activeSection === 'payments' && <PaymentsAdmin />}
          {activeSection === 'reports' && <ReportsAnalytics />}
          {activeSection === 'ai' && <AIAutomation />}
          {activeSection === 'notifications' && <NotificationsAdmin />}
          {activeSection === 'jobs' && <JobPortalAdmin />}
          {activeSection === 'settings' && <SystemSettings />}
        </main>
      </div>
    </div>
  );
}
