import { BookOpen } from 'lucide-react';
import { Button } from '../ui/button';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  return (
    <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-[#bf2026]" />
          <span className="text-[#1d4d6a] font-semibold">AcademicHub</span>
        </div>
        <div className="flex items-center gap-8">
          {['home', 'explore', 'pricing', 'about', 'contact'].map((page) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className="text-gray-700 hover:text-[#bf2026] transition-colors capitalize"
            >
              {page}
            </button>
          ))}
          <Button
            onClick={() => onNavigate('login')}
            className="bg-[#bf2026] hover:bg-[#a01c22] text-white rounded-lg px-6"
          >
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
}
