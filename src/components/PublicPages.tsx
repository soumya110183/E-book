import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { BookOpen, Check, Mail, MapPin, Phone, Star, Users, Award, TrendingUp, Search, Filter, Sparkles, Target, Heart, Shield, Globe, Zap, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PublicPagesProps {
  page: 'explore' | 'pricing' | 'about' | 'contact' | 'login' | 'register';
  onNavigate: (page: string) => void;
  onLogin?: (role: 'user' | 'admin') => void;
}

export function PublicPages({ page, onNavigate, onLogin }: PublicPagesProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
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

      {/* Page Content */}
      {page === 'explore' && <ExplorePage onNavigate={onNavigate} />}
      {page === 'pricing' && <PricingPage onNavigate={onNavigate} />}
      {page === 'about' && <AboutPage />}
      {page === 'contact' && <ContactPage />}
      {page === 'login' && <LoginPage onNavigate={onNavigate} onLogin={onLogin} />}
      {page === 'register' && <RegisterPage onNavigate={onNavigate} />}

      {/* Footer */}
      <footer className="bg-[#1d4d6a] text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-[#bf2026]" />
                <span>AcademicHub</span>
              </div>
              <p className="text-gray-300 text-sm">
                Your trusted platform for academic excellence.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><button onClick={() => onNavigate('explore')} className="hover:text-white">Explore</button></li>
                <li><button onClick={() => onNavigate('pricing')} className="hover:text-white">Pricing</button></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><button onClick={() => onNavigate('about')} className="hover:text-white">About</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-white">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><button className="hover:text-white">Privacy</button></li>
                <li><button className="hover:text-white">Terms</button></li>
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

function ExplorePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Mathematics', 'Physics', 'Computer Science', 'Chemistry', 'Biology', 'Literature', 'History'];

  const books = [
    { id: 1, title: 'Advanced Calculus', author: 'Dr. Sarah Smith', category: 'Mathematics', price: 24.99, rating: 4.8, reviews: 342, cover: 'https://images.unsplash.com/photo-1761546571631-a4d61b55cd2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoZW1hdGljcyUyMHRleHRib29rfGVufDF8fHx8MTc2MTc1MDc3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', bestseller: true },
    { id: 2, title: 'Quantum Physics Fundamentals', author: 'Prof. Michael Johnson', category: 'Physics', price: 29.99, rating: 4.9, reviews: 523, cover: 'https://images.unsplash.com/photo-1725870475677-7dc91efe9f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2MTc2NTU0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', trending: true },
    { id: 3, title: 'Machine Learning Essentials', author: 'Dr. Emily Chen', category: 'Computer Science', price: 34.99, rating: 4.7, reviews: 689, cover: 'https://images.unsplash.com/photo-1581019055756-93b5361f9536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlcmluZyUyMHRleHRib29rfGVufDF8fHx8MTc2MTgxMjQzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', bestseller: true },
    { id: 4, title: 'Organic Chemistry Complete', author: 'Dr. Robert Williams', category: 'Chemistry', price: 27.99, rating: 4.6, reviews: 412, cover: 'https://images.unsplash.com/photo-1632038585992-fecf8a0cf59d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3J5JTIwYm9vayUyMHN0YWNrfGVufDF8fHx8MTc2MTgxMjQzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 5, title: 'Data Structures & Algorithms', author: 'Prof. James Lee', category: 'Computer Science', price: 32.99, rating: 4.9, reviews: 758, cover: 'https://images.unsplash.com/photo-1569997851406-472ce7b75c6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMHRleHRib29rJTIwY292ZXJ8ZW58MXx8fHwxNzYxNzY0NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', trending: true },
    { id: 6, title: 'Statistical Analysis Methods', author: 'Dr. Anna Martinez', category: 'Mathematics', price: 28.99, rating: 4.8, reviews: 534, cover: 'https://images.unsplash.com/photo-1760120482171-d9d5468f75fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXRlcmF0dXJlJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2MTgxMjQzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 7, title: 'Modern Biology', author: 'Prof. David Green', category: 'Biology', price: 31.99, rating: 4.7, reviews: 423, cover: 'https://images.unsplash.com/photo-1725870475677-7dc91efe9f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc2MTc2NTU0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 8, title: 'World Literature Anthology', author: 'Dr. Lisa Thompson', category: 'Literature', price: 26.99, rating: 4.9, reviews: 612, cover: 'https://images.unsplash.com/photo-1761546571631-a4d61b55cd2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoZW1hdGljcyUyMHRleHRib29rfGVufDF8fHx8MTc2MTc1MDc3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', bestseller: true },
  ];

  const filteredBooks = books.filter(book => 
    (selectedCategory === 'All' || book.category === selectedCategory) &&
    (searchQuery === '' || book.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1d4d6a] to-[#2a5f7f] text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl mb-6">Explore Our Vast Digital Library</h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover over 10,000 academic e-books across all disciplines. Your next breakthrough starts here.
            </p>
            <div className="relative max-w-2xl">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, or subject..."
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#bf2026] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#1d4d6a]">Browse by Category</h2>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
          <div className="flex gap-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#bf2026] text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-[#bf2026] hover:text-[#bf2026]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-[#bf2026]" />
              <div>
                <p className="text-2xl text-[#1d4d6a]">{filteredBooks.length}</p>
                <p className="text-sm text-gray-600">Books Available</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-[#bf2026]" />
              <div>
                <p className="text-2xl text-[#1d4d6a]">4.8</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-[#bf2026]" />
              <div>
                <p className="text-2xl text-[#1d4d6a]">50K+</p>
                <p className="text-sm text-gray-600">Active Readers</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-[#bf2026]" />
              <div>
                <p className="text-2xl text-[#1d4d6a]">500+</p>
                <p className="text-sm text-gray-600">Expert Authors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="border-none shadow-md hover:shadow-xl transition-all group overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {book.bestseller && (
                  <Badge className="absolute top-3 left-3 bg-[#bf2026] text-white">
                    <Award className="w-3 h-3 mr-1" />
                    Bestseller
                  </Badge>
                )}
                {book.trending && (
                  <Badge className="absolute top-3 left-3 bg-green-600 text-white">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <Button 
                    onClick={() => onNavigate('login')}
                    className="w-full bg-[#bf2026] hover:bg-[#a01c22] text-white"
                  >
                    View Details
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <Badge className="bg-blue-100 text-blue-700 text-xs mb-2">{book.category}</Badge>
                <h3 className="text-[#1d4d6a] mb-1 line-clamp-1">{book.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{book.author}</p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm">{book.rating}</span>
                    <span className="text-xs text-gray-500">({book.reviews})</span>
                  </div>
                  <span className="text-[#bf2026]">${book.price}</span>
                </div>
                <Button 
                  onClick={() => onNavigate('login')}
                  className="w-full bg-[#1d4d6a] hover:bg-[#153a4f] text-white"
                  size="sm"
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function PricingPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      name: 'Basic',
      description: 'Perfect for individual learners',
      monthlyPrice: 19.99,
      annualPrice: 199.99,
      features: [
        { text: 'Access to 1,000+ e-books', included: true },
        { text: '10 mock tests per month', included: true },
        { text: 'Basic notes repository', included: true },
        { text: 'Email support', included: true },
        { text: 'Mobile app access', included: true },
        { text: 'Offline reading', included: false },
        { text: 'Priority support', included: false },
        { text: 'Advanced analytics', included: false },
      ]
    },
    {
      name: 'Professional',
      description: 'For serious students and researchers',
      monthlyPrice: 39.99,
      annualPrice: 399.99,
      popular: true,
      features: [
        { text: 'Access to 5,000+ e-books', included: true },
        { text: 'Unlimited mock tests', included: true },
        { text: 'Premium notes repository', included: true },
        { text: 'Priority support 24/7', included: true },
        { text: 'Mobile app access', included: true },
        { text: 'Offline reading', included: true },
        { text: 'Advanced reading tools', included: true },
        { text: 'Writing service discount (10%)', included: true },
      ]
    },
    {
      name: 'Institutional',
      description: 'For universities and organizations',
      monthlyPrice: 99.99,
      annualPrice: 999.99,
      features: [
        { text: 'Access to entire library (10,000+ books)', included: true },
        { text: 'Everything in Professional', included: true },
        { text: 'Up to 50 user accounts', included: true },
        { text: 'Admin dashboard access', included: true },
        { text: 'Custom content upload', included: true },
        { text: 'Advanced analytics & reports', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'Custom branding options', included: true },
      ]
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1d4d6a] to-[#2a5f7f] text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-200 mb-8">
            Choose the plan that fits your academic journey. Cancel anytime.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm p-2 rounded-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-[#1d4d6a] shadow-lg'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-md transition-all ${
                billingCycle === 'annual'
                  ? 'bg-white text-[#1d4d6a] shadow-lg'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Annual
              <span className="ml-2 text-xs bg-[#bf2026] text-white px-2 py-1 rounded-full">Save 17%</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`border-none shadow-lg hover:shadow-2xl transition-all relative ${
                plan.popular ? 'ring-2 ring-[#bf2026] scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[#bf2026] text-white px-4 py-1">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-[#1d4d6a] mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl text-[#1d4d6a]">
                    ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                  </span>
                  <span className="text-gray-500 ml-2">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                {billingCycle === 'annual' && (
                  <p className="text-sm text-gray-500 mt-2">
                    ${(plan.annualPrice / 12).toFixed(2)} per month, billed annually
                  </p>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3 text-sm">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-[#bf2026] shrink-0 mt-0.5" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => onNavigate('register')}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-[#bf2026] hover:bg-[#a01c22] text-white'
                      : 'bg-[#1d4d6a] hover:bg-[#153a4f] text-white'
                  }`}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl text-[#1d4d6a] text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div>
              <h3 className="text-[#1d4d6a] mb-2">Can I switch plans anytime?</h3>
              <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h3 className="text-[#1d4d6a] mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600 text-sm">We accept all major credit cards, PayPal, and institutional purchase orders.</p>
            </div>
            <div>
              <h3 className="text-[#1d4d6a] mb-2">Is there a free trial?</h3>
              <p className="text-gray-600 text-sm">Yes! All plans come with a 14-day free trial. No credit card required to start.</p>
            </div>
            <div>
              <h3 className="text-[#1d4d6a] mb-2">What's your refund policy?</h3>
              <p className="text-gray-600 text-sm">30-day money-back guarantee. If you're not satisfied, we'll refund you in full.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  const team = [
    { name: 'Dr. Sarah Johnson', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYxNzA2OTM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { name: 'Prof. Michael Chen', role: 'Chief Academic Officer', image: 'https://images.unsplash.com/photo-1690264460165-0ff5e1063d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NjE3NjgyNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { name: 'Emily Rodriguez', role: 'Head of Technology', image: 'https://images.unsplash.com/photo-1630283017802-785b7aff9aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2MTc3OTQxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for the highest quality in every resource we provide to our academic community.'
    },
    {
      icon: Heart,
      title: 'Accessibility',
      description: 'Making quality education accessible to everyone, everywhere, regardless of background.'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We uphold the highest standards of academic integrity and ethical conduct.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Continuously evolving our platform with cutting-edge technology and features.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1d4d6a] to-[#2a5f7f] text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl mb-6">Empowering Academic Excellence Worldwide</h1>
          <p className="text-xl text-gray-200">
            Since 2020, we've been on a mission to democratize access to quality academic resources for students and researchers globally.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl text-[#bf2026] mb-2">10,000+</div>
              <p className="text-gray-600">E-Books Available</p>
            </div>
            <div className="text-center">
              <div className="text-5xl text-[#bf2026] mb-2">50,000+</div>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-5xl text-[#bf2026] mb-2">150+</div>
              <p className="text-gray-600">Countries</p>
            </div>
            <div className="text-center">
              <div className="text-5xl text-[#bf2026] mb-2">98%</div>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#f5f6f8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl text-[#1d4d6a] mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                At AcademicHub, we're committed to breaking down barriers to quality education. Our platform provides students, researchers, and lifelong learners with instant access to a vast library of academic resources, professional services, and learning tools.
              </p>
              <p className="text-gray-700">
                We believe that everyone deserves access to world-class educational materials, regardless of their location or economic background. That's why we've created an affordable, comprehensive platform that serves the global academic community.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1544132998-ae26c2655274?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBzaGVsdmVzfGVufDF8fHx8MTc2MTczODQyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Library"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-[#1d4d6a] mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at AcademicHub
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-xl transition-all text-center">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-[#bf2026] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-[#bf2026]" />
                  </div>
                  <h3 className="text-[#1d4d6a] mb-3">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[#f5f6f8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-[#1d4d6a] mb-4">Meet Our Leadership</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experienced educators and technologists dedicated to transforming education
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-xl transition-all overflow-hidden">
                <div className="relative h-64">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-[#1d4d6a] mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#1d4d6a] to-[#2a5f7f] text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl mb-6">Join Our Global Community</h2>
          <p className="text-xl mb-8 text-gray-200">
            Be part of the academic revolution. Start your learning journey today.
          </p>
          <Button 
            onClick={() => {}}
            className="bg-[#bf2026] hover:bg-[#a01c22] text-white px-10 py-6 text-lg"
          >
            Get Started Free
          </Button>
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Our team responds within 24 hours',
      contact: 'support@academichub.com',
      action: 'Send Email'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Mon-Fri from 8am to 6pm EST',
      contact: '+1 (555) 123-4567',
      action: 'Call Now'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Come say hello at our office',
      contact: '123 University Ave, Cambridge, MA 02138',
      action: 'Get Directions'
    }
  ];

  const faqs = [
    {
      question: 'How do I access my purchased e-books?',
      answer: 'All purchased e-books are instantly available in your library. Simply log in and navigate to "My Library" to start reading.'
    },
    {
      question: 'Can I share my account with others?',
      answer: 'Individual accounts are for single users only. For multiple users, please consider our Institutional plan which supports up to 50 accounts.'
    },
    {
      question: 'What DRM protection do you use?',
      answer: 'We use industry-standard DRM to protect content while ensuring a seamless reading experience across all your devices.'
    },
    {
      question: 'Do you offer academic discounts?',
      answer: 'Yes! We offer special discounts for students and educators. Contact our support team with your academic credentials.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1d4d6a] to-[#2a5f7f] text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-200">
            Have questions? We're here to help. Reach out to our team anytime.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#bf2026] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <method.icon className="w-8 h-8 text-[#bf2026]" />
                </div>
                <h3 className="text-[#1d4d6a] mb-2">{method.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                <p className="text-sm text-gray-900 mb-4">{method.contact}</p>
                <Button variant="outline" className="w-full">
                  {method.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form & Map */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-[#1d4d6a]">Send us a Message</CardTitle>
              <CardDescription>Fill out the form and we'll get back to you within 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input placeholder="John" />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              <div>
                <Label>Email Address</Label>
                <Input type="email" placeholder="your@email.com" />
              </div>
              <div>
                <Label>Subject</Label>
                <Input placeholder="How can we help?" />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea placeholder="Tell us more about your inquiry..." className="min-h-[150px]" />
              </div>
              <Button className="w-full bg-[#bf2026] hover:bg-[#a01c22] text-white">
                Send Message
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1661877854265-48a976379af4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBsYXB0b3B8ZW58MXx8fHwxNzYxNzg1MjcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Office"
                className="w-full h-full object-cover"
              />
            </div>
            
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-[#1d4d6a]">Office Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="text-[#1d4d6a]">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Saturday</span>
                  <span className="text-[#1d4d6a]">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Sunday</span>
                  <span className="text-gray-500">Closed</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-3xl text-[#1d4d6a] text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-[#1d4d6a] mb-3">{faq.question}</h3>
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginPage({ onNavigate, onLogin }: { onNavigate: (page: string) => void, onLogin?: (role: 'user' | 'admin') => void }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-6  px-6 bg-[#f5f6f8]">
      <Card className="w-full max-w-md border-none shadow-xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-[#bf2026] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-[#bf2026]" />
          </div>
          <CardTitle className="text-[#1d4d6a]">Welcome Back</CardTitle>
          <CardDescription>Sign in to access your academic resources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Email Address</Label>
            <Input type="email" placeholder="your@email.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <button className="text-[#bf2026] hover:underline">Forgot password?</button>
          </div>
          <Button 
            onClick={() => onLogin?.('user')}
            className="w-full bg-[#bf2026] hover:bg-[#a01c22] text-white"
          >
            Sign In as Student
          </Button>
          <Button 
            onClick={() => onLogin?.('admin')}
            variant="outline"
            className="w-full border-[#1d4d6a] text-[#1d4d6a] hover:bg-[#1d4d6a] hover:text-white"
          >
            Sign In as Admin
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              <Globe className="w-4 h-4 mr-2" />
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
          </div>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button onClick={() => onNavigate('register')} className="text-[#bf2026] hover:underline">
              Sign up free
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function RegisterPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12 bg-[#f5f6f8]">
      <Card className="w-full max-w-md border-none shadow-xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-[#bf2026] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-[#bf2026]" />
          </div>
          <CardTitle className="text-[#1d4d6a]">Create Your Account</CardTitle>
          <CardDescription>Join thousands of learners worldwide</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input placeholder="John" />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input placeholder="Doe" />
            </div>
          </div>
          <div>
            <Label>Email Address</Label>
            <Input type="email" placeholder="your@email.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div>
            <Label>Confirm Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-1 rounded" />
            <label className="text-xs text-gray-600">
              I agree to the <button className="text-[#bf2026] hover:underline">Terms of Service</button> and <button className="text-[#bf2026] hover:underline">Privacy Policy</button>
            </label>
          </div>
          <Button className="w-full bg-[#bf2026] hover:bg-[#a01c22] text-white">
            Create Account
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              <Globe className="w-4 h-4 mr-2" />
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
          </div>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button onClick={() => onNavigate('login')} className="text-[#bf2026] hover:underline">
              Sign in
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
