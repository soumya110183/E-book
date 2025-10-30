import { useState } from 'react';
import { Home } from './components/Home';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { PublicPages } from './components/PublicPages';
import { BookReader } from './components/BookReader';
import { Toaster } from './components/ui/sonner';

type Page = 'home' | 'user-dashboard' | 'admin-dashboard' | 'explore' | 'pricing' | 'about' | 'contact' | 'login' | 'register' | 'reader';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [userRole, setUserRole] = useState<'user' | 'admin' | null>(null);

  const handleLogin = (role: 'user' | 'admin') => {
    setUserRole(role);
    if (role === 'user') {
      setCurrentPage('user-dashboard');
    } else {
      setCurrentPage('admin-dashboard');
    }
  };

  const handleOpenBook = (book: any) => {
    setSelectedBook(book);
    setCurrentPage('reader');
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8]">
      {currentPage === 'home' && (
        <Home onNavigate={handleNavigate} onOpenBook={handleOpenBook} />
      )}
      
      {currentPage === 'user-dashboard' && (
        <UserDashboard onNavigate={handleNavigate} onOpenBook={handleOpenBook} onLogout={handleLogout} />
      )}
      
      {currentPage === 'admin-dashboard' && (
        <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />
      )}
      
      {currentPage === 'reader' && selectedBook && (
        <BookReader book={selectedBook} onClose={() => setCurrentPage('user-dashboard')} />
      )}
      
      {['explore', 'pricing', 'about', 'contact', 'login', 'register'].includes(currentPage) && (
        <PublicPages page={currentPage as any} onNavigate={handleNavigate} onLogin={handleLogin} />
      )}
      
      <Toaster />
    </div>
  );
}
