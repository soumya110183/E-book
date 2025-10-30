import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { BookOpen, Users, Award, FileText, Search, ChevronRight, ChevronLeft, Star, TrendingUp, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeProps {
  onNavigate: (page: string) => void;
  onOpenBook?: (book: any) => void;
}

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  cover: string;
  rating: number;
  readers: number;
  description: string;
}

export function Home({ onNavigate, onOpenBook }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredBooks: Book[] = [
    {
      id: 1,
      title: "Advanced Quantum Physics",
      author: "Dr. Michael Chen",
      category: "Physics",
      cover: "https://images.unsplash.com/photo-1725870475677-7dc91efe9f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2MTc2NTU0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      readers: 12500,
      description: "Comprehensive guide to quantum mechanics and modern physics applications"
    },
    {
      id: 2,
      title: "Calculus & Analysis",
      author: "Prof. Sarah Williams",
      category: "Mathematics",
      cover: "https://images.unsplash.com/photo-1761546571631-a4d61b55cd2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoZW1hdGljcyUyMHRleHRib29rfGVufDF8fHx8MTc2MTc1MDc3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      readers: 18300,
      description: "From fundamental concepts to advanced mathematical analysis techniques"
    },
    {
      id: 3,
      title: "Modern Literature",
      author: "Dr. Emily Roberts",
      category: "Literature",
      cover: "https://images.unsplash.com/photo-1760120482171-d9d5468f75fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXRlcmF0dXJlJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2MTgxMjQzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.7,
      readers: 9800,
      description: "Critical analysis of contemporary literary movements and themes"
    },
    {
      id: 4,
      title: "World History Chronicles",
      author: "Prof. David Martinez",
      category: "History",
      cover: "https://images.unsplash.com/photo-1632038585992-fecf8a0cf59d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3J5JTIwYm9vayUyMHN0YWNrfGVufDF8fHx8MTc2MTgxMjQzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.6,
      readers: 15600,
      description: "Explore pivotal moments that shaped our modern world"
    },
    {
      id: 5,
      title: "Engineering Fundamentals",
      author: "Dr. James Anderson",
      category: "Engineering",
      cover: "https://images.unsplash.com/photo-1581019055756-93b5361f9536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHRleHRib29rfGVufDF8fHx8MTc2MTgxMjQzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      readers: 21400,
      description: "Essential principles and practices for modern engineering"
    },
    {
      id: 6,
      title: "Academic Research Methods",
      author: "Dr. Lisa Thompson",
      category: "Research",
      cover: "https://images.unsplash.com/photo-1569997851406-472ce7b75c6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMHRleHRib29rJTIwY292ZXJ8ZW58MXx8fHwxNzYxNzY0NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      readers: 11200,
      description: "Comprehensive methodologies for academic research and publication"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredBooks.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredBooks.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredBooks.length) % featuredBooks.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredBooks.length);
  };

  const handleBookClick = (book: Book) => {
    if (onOpenBook) {
      onOpenBook(book);
    } else {
      onNavigate('login');
    }
  };

  const getVisibleBooks = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentSlide + i + featuredBooks.length) % featuredBooks.length;
      visible.push({ ...featuredBooks[index], position: i });
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-[#bf2026]" />
            <span className="text-[#1d4d6a]">AcademicHub</span>
          </div>
          <div className="flex items-center gap-8">
            <button onClick={() => onNavigate('home')} className="text-gray-700 hover:text-[#bf2026] transition-colors">
              Home
            </button>
            <button onClick={() => onNavigate('explore')} className="text-gray-700 hover:text-[#bf2026] transition-colors">
              Explore
            </button>
            <button onClick={() => onNavigate('pricing')} className="text-gray-700 hover:text-[#bf2026] transition-colors">
              Pricing
            </button>
            <button onClick={() => onNavigate('about')} className="text-gray-700 hover:text-[#bf2026] transition-colors">
              About
            </button>
            <button onClick={() => onNavigate('contact')} className="text-gray-700 hover:text-[#bf2026] transition-colors">
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

      {/* Hero Section with Carousel */}
      <section className="relative bg-gradient-to-br from-[#1d4d6a] via-[#2a5f7f] to-[#1d4d6a] text-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Text */}
          <div className="text-center mb-12">
            <h1 className="text-5xl mb-4">Discover Your Next Academic Adventure</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Explore thousands of e-books across all disciplines. Click any book to start reading instantly.
            </p>
          </div>

          {/* 3D Carousel */}
          <div className="relative h-[420px] flex items-center justify-center perspective-1000">
            {getVisibleBooks().map((book, idx) => {
              const position = book.position;
              const isCenter = position === 0;
              
              return (
                <div
                  key={`${book.id}-${idx}`}
                  className="absolute transition-all duration-700 ease-out cursor-pointer"
                  style={{
                    transform: `
                      translateX(${position * 250}px)
                      translateZ(${isCenter ? '0px' : '-150px'})
                      rotateY(${position * -15}deg)
                      scale(${isCenter ? 1.15 : 0.75})
                    `,
                    zIndex: isCenter ? 50 : 50 - Math.abs(position),
                    opacity: Math.abs(position) > 2 ? 0 : isCenter ? 1 : 0.5,
                    filter: isCenter ? 'blur(0px)' : 'blur(2px)'
                  }}
                  onClick={() => isCenter && handleBookClick(book)}
                >
                  <Card className={`w-56 overflow-hidden ${isCenter ? 'shadow-2xl ring-4 ring-white/30' : 'shadow-lg'}`}>
                    <div className="relative h-72 overflow-hidden bg-gray-200">
                      <ImageWithFallback
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                      {isCenter && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-4">
                          <div className="text-white">
                            <p className="text-xs opacity-80 mb-1">{book.category}</p>
                            <h3 className="text-sm mb-1 line-clamp-2">{book.title}</h3>
                            <p className="text-xs opacity-90">{book.author}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    {isCenter && (
                      <CardContent className="p-4 bg-white">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm">{book.rating}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span className="text-xs">{book.readers.toLocaleString()}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-3">{book.description}</p>
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookClick(book);
                          }}
                          className="w-full bg-[#bf2026] hover:bg-[#a01c22] text-white"
                          size="sm"
                        >
                          Read Now
                        </Button>
                      </CardContent>
                    )}
                  </Card>
                </div>
              );
            })}

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-4 z-50 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-4 z-50 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {featuredBooks.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all ${
                  idx === currentSlide
                    ? 'w-8 h-2 bg-white'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                } rounded-full`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BookOpen className="w-6 h-6 text-[#bf2026]" />
                <p className="text-[#1d4d6a]">10,000+</p>
              </div>
              <p className="text-sm text-gray-600">E-Books Available</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-6 h-6 text-[#bf2026]" />
                <p className="text-[#1d4d6a]">50,000+</p>
              </div>
              <p className="text-sm text-gray-600">Active Readers</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-6 h-6 text-[#bf2026]" />
                <p className="text-[#1d4d6a]">500+</p>
              </div>
              <p className="text-sm text-gray-600">Expert Authors</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-[#bf2026]" />
                <p className="text-[#1d4d6a]">98%</p>
              </div>
              <p className="text-sm text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#f5f6f8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-[#1d4d6a] mb-4">Everything You Need to Succeed</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powerful tools and resources designed for students, researchers, and lifelong learners.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all hover:scale-105">
              <div className="w-14 h-14 bg-[#bf2026] bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-[#bf2026]" />
              </div>
              <h3 className="text-[#1d4d6a] mb-3">Digital Library</h3>
              <p className="text-gray-600">
                Access thousands of academic e-books with DRM protection, highlighting tools, and dual reading themes.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all hover:scale-105">
              <div className="w-14 h-14 bg-[#bf2026] bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-[#bf2026]" />
              </div>
              <h3 className="text-[#1d4d6a] mb-3">Mock Tests</h3>
              <p className="text-gray-600">
                Prepare with comprehensive mock tests, detailed analytics, and leaderboards to track your progress.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all hover:scale-105">
              <div className="w-14 h-14 bg-[#bf2026] bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-[#bf2026]" />
              </div>
              <h3 className="text-[#1d4d6a] mb-3">Writing Services</h3>
              <p className="text-gray-600">
                Professional academic writing assistance for research papers, essays, and dissertations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all hover:scale-105">
              <div className="w-14 h-14 bg-[#bf2026] bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                <Search className="w-7 h-7 text-[#bf2026]" />
              </div>
              <h3 className="text-[#1d4d6a] mb-3">Notes Repository</h3>
              <p className="text-gray-600">
                Curated academic notes organized by category with preview and search functionality.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all hover:scale-105">
              <div className="w-14 h-14 bg-[#bf2026] bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-[#bf2026]" />
              </div>
              <h3 className="text-[#1d4d6a] mb-3">Job Portal</h3>
              <p className="text-gray-600">
                Find academic positions, research opportunities, and internships tailored to your field.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all hover:scale-105">
              <div className="w-14 h-14 bg-[#bf2026] bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-[#bf2026]" />
              </div>
              <h3 className="text-[#1d4d6a] mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock academic support with expert guidance and personalized assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#1d4d6a] to-[#2a5f7f] text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-xl mb-8 text-gray-200">
            Join thousands of students and researchers who trust AcademicHub for their educational needs.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => onNavigate('register')}
              className="bg-[#bf2026] hover:bg-[#a01c22] text-white px-10 py-6 rounded-lg transition-all hover:scale-105"
            >
              Start Your Free Trial
            </Button>
            <Button 
              onClick={() => onNavigate('explore')}
              className="bg-white text-[#1d4d6a] hover:bg-gray-100 px-10 py-6 rounded-lg transition-all hover:scale-105"
            >
              Browse Library
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1d4d6a] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-[#bf2026]" />
                <span>AcademicHub</span>
              </div>
              <p className="text-gray-300 text-sm">
                Your trusted platform for academic excellence and continuous learning.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><button onClick={() => onNavigate('explore')} className="hover:text-white">Explore Books</button></li>
                <li><button onClick={() => onNavigate('pricing')} className="hover:text-white">Pricing</button></li>
                <li><button className="hover:text-white">Features</button></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><button onClick={() => onNavigate('about')} className="hover:text-white">About Us</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-white">Contact</button></li>
                <li><button className="hover:text-white">Careers</button></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><button className="hover:text-white">Privacy Policy</button></li>
                <li><button className="hover:text-white">Terms of Service</button></li>
                <li><button className="hover:text-white">DRM Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 pt-8 text-center text-sm text-gray-300">
            <p>&copy; 2025 AcademicHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
