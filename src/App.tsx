import { useEffect, useState } from "react";
import { Home } from "./components/Home";
import { UserDashboard } from "./components/UserDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { PublicPages } from "./components/PublicPages";
import { BookReader } from "./components/BookReader";
import { Toaster } from "./components/ui/sonner";
import TestPage from "./components/user/Testpage";

type Page =
  | "home"
  | "user-dashboard"
  | "admin-dashboard"
  | "explore"
  | "pricing"
  | "about"
  | "contact"
  | "login"
  | "register"
  | "reader"
  | "test";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page | null>(null); // 🟢 null = don’t render yet
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [userRole, setUserRole] = useState<"user" | "admin" | null>(null);
  const [loading, setLoading] = useState(true);

  // Detect route on first load
  useEffect(() => {
    const path = window.location.pathname;

    if (path === "/test") {
      setCurrentPage("test");
    } else if (path === "/user-dashboard") {
      setCurrentPage("user-dashboard");
    } else if (path === "/admin-dashboard") {
      setCurrentPage("admin-dashboard");
    } else if (
      ["/explore", "/pricing", "/about", "/contact", "/login", "/register"].includes(path)
    ) {
      setCurrentPage(path.replace("/", "") as Page);
    } else {
      setCurrentPage("home");
    }

    setLoading(false);
  }, []);

  // Scroll to top when navigating
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // If logged in, show user dashboard
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setCurrentPage("user-dashboard");
      setUserRole("user");
      setLoading(false);
    }
  }, []);

  const handleLogin = (role: "user" | "admin") => {
    setUserRole(role);
    setCurrentPage(role === "user" ? "user-dashboard" : "admin-dashboard");
    window.history.pushState({}, "", `/${role === "user" ? "user-dashboard" : "admin-dashboard"}`);
  };

  const handleOpenBook = (book: any) => {
    setSelectedBook(book);
    setCurrentPage("reader");
    window.history.pushState({}, "", "/reader");
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.history.pushState({}, "", `/${page === "home" ? "" : page}`);
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage("home");
    window.history.pushState({}, "", "/");
  };

  // 🟢 Loading state (no “home flash”)
  if (loading || currentPage === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f6f8]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-t-[#bf2026] border-gray-300 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 mt-3 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      {currentPage === "home" && (
        <Home onNavigate={handleNavigate} onOpenBook={handleOpenBook} />
      )}

      {currentPage === "user-dashboard" && (
        <UserDashboard
          onNavigate={handleNavigate}
          onOpenBook={handleOpenBook}
          onLogout={handleLogout}
        />
      )}

      {currentPage === "admin-dashboard" && (
        <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />
      )}

      {currentPage === "reader" && selectedBook && (
        <BookReader book={selectedBook} onClose={() => setCurrentPage("user-dashboard")} />
      )}

      {["explore", "pricing", "about", "contact", "login", "register"].includes(currentPage) && (
        <PublicPages page={currentPage as any} onNavigate={handleNavigate} onLogin={handleLogin} />
      )}

      {currentPage === "test" && (
        <TestPage onNavigate={handleNavigate} onLogout={handleLogout} />
      )}

      <Toaster />
    </div>
  );
}
