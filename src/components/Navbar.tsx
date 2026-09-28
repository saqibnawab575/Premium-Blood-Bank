import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, Shield, Sun, Moon } from 'lucide-react';
import { WebsiteContent } from '../types';

interface NavbarProps {
  content: WebsiteContent;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  content,
  activeSection,
  onNavigate,
  onOpenAdmin,
  isAdminLoggedIn,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDarkMode = content.theme?.mode === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'availability', label: 'Blood Availability' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? isDarkMode
            ? 'bg-slate-900/95 backdrop-blur-md shadow-md border-b border-slate-800 py-3'
            : 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-3'
          : isDarkMode
          ? 'bg-slate-900 border-b border-slate-800 py-4'
          : 'bg-white border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo - Official PBB Emblem */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg py-1 cursor-pointer"
            aria-label="Premium Blood Bank Home"
          >
            <Logo variant="full" size="md" inverted={isDarkMode} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white bg-[#c4122f] shadow-sm shadow-red-500/20'
                      : isDarkMode
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                      : 'text-slate-700 hover:text-[#0c2e59] hover:bg-slate-100/80'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme Toggle (Dark & White Mode) */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  isDarkMode
                    ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
                title={isDarkMode ? 'Switch to White (Light) Theme' : 'Switch to Dark Theme'}
                aria-label="Toggle Dark and White Theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            {/* Admin Login / Dashboard Button */}
            <button
              onClick={onOpenAdmin}
              className={`px-4 py-2.5 rounded-xl border text-xs flex items-center gap-2 font-bold transition-all shadow-xs cursor-pointer ${
                isAdminLoggedIn
                  ? 'bg-slate-900 text-emerald-400 border-slate-700 hover:bg-slate-800'
                  : 'bg-red-600 hover:bg-red-700 text-white border-red-700'
              }`}
              title={isAdminLoggedIn ? 'Open Admin Dashboard' : 'Admin Login'}
            >
              <Shield className="w-4 h-4 text-white" />
              <span>{isAdminLoggedIn ? 'Admin Dashboard' : 'Admin Login'}</span>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex sm:hidden items-center gap-2">
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className={`p-2 rounded-lg border text-xs ${
                  isDarkMode
                    ? 'bg-slate-800 text-amber-300 border-slate-700'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            )}
            <button
              onClick={onOpenAdmin}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${
                isDarkMode
                  ? 'bg-slate-800 text-slate-200 border-slate-700'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {isAdminLoggedIn ? 'Dashboard' : 'Admin'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg focus:outline-none ${
                isDarkMode ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-red-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className={`xl:hidden border-b shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200 ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-red-600 text-white'
                    : isDarkMode
                    ? 'text-slate-200 hover:bg-slate-800'
                    : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div
              className={`pt-3 mt-2 border-t flex flex-col gap-2 ${
                isDarkMode ? 'border-slate-800' : 'border-slate-200'
              }`}
            >
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-slate-900 rounded-xl"
              >
                <Shield className="w-4 h-4" />
                <span>{isAdminLoggedIn ? 'Admin Dashboard' : 'Admin Login'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
