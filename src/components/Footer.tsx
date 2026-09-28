import React from 'react';
import { Logo } from './Logo';
import { WebsiteContent } from '../types';
import {
  MapPin,
  Phone,
  Mail,
  Heart,
  ShieldCheck,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
} from 'lucide-react';

interface FooterProps {
  content: WebsiteContent;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  content,
  onNavigate,
  onOpenAdmin,
}) => {
  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'availability', label: 'Blood Availability' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-[#071629] text-white pt-16 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-5 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-left focus:outline-none focus:ring-1 focus:ring-red-500 rounded-lg"
              aria-label="Premium Blood Bank"
            >
              <Logo variant="full" size="md" inverted={true} />
            </button>

            <p className="text-red-400 font-bold text-sm">
              {content.tagline || 'Donate Blood, Save 3 Lives'}
            </p>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              {content.footerText ||
                'Premium Blood Bank is dedicated to saving lives through voluntary donation, stringent screening, and 24/7 clinical blood services. Located in the Basement of Premium Medical Complex, Saddar, Rawalpindi.'}
            </p>

            {/* Social Media Links (Rendered only if populated) */}
            <div className="flex items-center gap-3 pt-2">
              {content.socialLinks?.facebook && (
                <a
                  href={content.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}

              {content.socialLinks?.instagram && (
                <a
                  href={content.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}

              {content.socialLinks?.whatsapp && (
                <a
                  href={content.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}

              {content.socialLinks?.youtube && (
                <a
                  href={content.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 pb-2 border-b border-slate-800 inline-block">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Facility Contact Info */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 pb-2 border-b border-slate-800 inline-block">
              Clinical Transfusion Center
            </h4>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {content.address ||
                    'Basement of Premium Medical Complex, Javed Lane, Peshawar Road, Saddar, Rawalpindi, 44000'}
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a
                  href={`tel:${content.phone}`}
                  className="font-bold text-white hover:text-red-400 transition-colors"
                >
                  {content.phone || '03125252240'}
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a
                  href={`mailto:${content.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {content.email || 'premiumbloodbank@gmail.com'}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`tel:${content.emergencyHotline || '03125252240'}`}
                className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Hotline 03125252240</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Admin Shortcut */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Premium Blood Bank. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Standard Transfusion Guidelines</span>
            </span>

            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-white underline transition-colors cursor-pointer"
            >
              Medical Staff Dashboard
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
