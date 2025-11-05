import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

import { BookOpen, Check, Mail, MapPin, Phone, Star, Users, Award, TrendingUp, Search, Filter, Sparkles, Target, Heart, Shield, Globe, Zap, Clock } from 'lucide-react';
import { Navbar } from './home/NavBar';
import { Footer } from './home/Footer';
import ExplorePage from './explore/ExplorePage';
import PricingPage from './pricing/PricingPage';
import AboutPage from './about/AboutPage';
import ContactPage from './contact/ContactPage';
interface PublicPagesProps {
  page: 'explore' | 'pricing' | 'about' | 'contact' | 'login' | 'register';
  onNavigate: (page: string) => void;
  onLogin?: (role: 'user' | 'admin') => void;
}

export function PublicPages({ page, onNavigate, onLogin }: PublicPagesProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar onNavigate={onNavigate} />

      {/* Page Content */}
      {page === 'explore' && <ExplorePage onNavigate={onNavigate} />}
      {page === 'pricing' && <PricingPage onNavigate={onNavigate} />}
      {page === 'about' && <AboutPage />}
      {page === 'contact' && <ContactPage />}
      {page === 'login' && <LoginPage onNavigate={onNavigate} onLogin={onLogin} />}
      {page === 'register' && <RegisterPage onNavigate={onNavigate} />}

      {/* Footer */}
      <Footer onNavigate={onNavigate} />

     
    </div>
  );
}

function LoginPage({ onNavigate, onLogin }: { onNavigate: (page: string) => void, onLogin?: (role: 'user' | 'admin') => void }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-6  px-6 bg-[#f5f6f8]">
      <Card className="w-full max-w-md border-none shadow-xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16  bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
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
          <div className="w-16 h-16  bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
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
