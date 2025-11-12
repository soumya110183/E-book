import { BookOpen } from 'lucide-react';
import { Button } from '../ui/button';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  return (
    <nav className="bg-gray-400 px-25 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <img
            src="/logoIcon.ico"
            alt="FarmInk Forum Logo"
            className="w-20 h-20 object-cover mt-2"
          />
        </div>

        {/* Right: Navigation Links */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('home')}
            className="text-white hover:text-[#bf2026] transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('explore')}
            className="text-white hover:text-[#bf2026] transition-colors"
          >
            Explore
          </button>
          <button
            onClick={() => onNavigate('pricing')}
            className="text-white hover:text-[#bf2026] transition-colors"
          >
            Pricing
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="text-white hover:text-[#bf2026] transition-colors"
          >
            About
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="text-white hover:text-[#bf2026] transition-colors"
          >
            Contact
          </button>
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
