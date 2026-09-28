import React from 'react';
import { WebsiteContent } from '../types';
import { Heart, Activity, ShieldCheck, ArrowRight, PhoneCall, Clock, Award, BadgeCheck } from 'lucide-react';

interface HeroProps {
  content: WebsiteContent;
  onNavigate: (section: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ content, onNavigate }) => {
  const founder = content.founder || {
    name: 'SAQIB NAWAB',
    qualifications: 'MLT, ACLS, BLS',
    title: 'Blood Bank Specialist',
    organization: 'Blood flow Foundation',
    role: 'FOUNDER',
    bio: 'Dedicated to life-saving clinical blood transfusion safety, emergency crossmatch readiness, and ethical donor motivation.',
    backgroundImage: content.heroImage || '/images/hero.jpg',
  };
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#0c2340] to-[#091b30] text-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background radial glow & medical grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(196,18,47,0.18),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(14,165,233,0.1),transparent_50%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20 L20 0 M20 20 L40 20 M20 20 L20 40 M20 20 L0 20' stroke='%23ffffff' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-500/30 text-red-300 text-xs font-semibold backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>{content.tagline || 'Donate Blood, Save 3 Lives'}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              {content.heroHeading || 'Premium Blood Bank'}
            </h1>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl font-semibold text-red-400">
              {content.heroSubheading || 'Donate Blood, Save 3 Lives'}
            </p>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              {content.heroSupportingText ||
                'We are committed to providing safe, reliable and timely blood bank services to patients, donors and healthcare facilities across Rawalpindi and Islamabad.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('availability')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 rounded-xl shadow-lg shadow-red-700/30 active:scale-95 transition-all transform cursor-pointer"
              >
                <span>Check Blood Availability</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-red-600" />
                <span>Contact Facility</span>
              </button>
            </div>

            {/* Clinical Highlights Strip */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full text-left">
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
                  <span>100% Screened</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">Multipathogen tested</p>
              </div>

              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Crossmatching</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">Gel card technology</p>
              </div>

              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>24/7 Available</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">Emergency response</p>
              </div>

              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Voluntary Care</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">Ethical donor focus</p>
              </div>
            </div>
          </div>

          {/* Right Column: Founder & Leadership Spotlight Card (Replaces Header Image per User Request) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-red-600 via-rose-600 to-[#0c2e59] rounded-3xl blur-xl opacity-35 animate-pulse" />

              {/* Main Card with Background Image */}
              <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-slate-950 shadow-2xl min-h-[460px] sm:min-h-[500px] flex flex-col justify-between p-5 sm:p-7">
                {/* Background Image (Customizable by Admin in Dashboard) */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-700 hover:scale-105"
                  style={{
                    backgroundImage: `url("${founder.backgroundImage || content.heroImage || '/images/hero.jpg'}")`,
                  }}
                />

                {/* Subtle Cinematic Vignette Overlay to let the background photo shine through */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(12,46,89,0.4),transparent_70%)] pointer-events-none" />

                {/* Top Floating Header Elements (Transparent Backgrounds) */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider shadow-lg border border-white/30 transition-colors">
                    <Award className="w-3.5 h-3.5 text-amber-300" />
                    <span className="drop-shadow-sm">{founder.organization || 'Blood flow Foundation'} ({founder.role || 'FOUNDER'})</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-md border border-white/30 text-[11px] font-bold text-emerald-300 shadow-md transition-colors">
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="drop-shadow-sm">Verified</span>
                  </div>
                </div>

                {/* Bottom Glassmorphic Content Panel (Transparent Background) */}
                <div className="relative z-10 mt-auto pt-8">
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 shadow-2xl text-left">
                    {/* Founder Name */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
                      {founder.name || 'SAQIB NAWAB'}
                    </h3>

                    {/* Qualifications & Specialist Title */}
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-red-300 mt-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-xs border border-white/30 text-white font-extrabold drop-shadow-sm">
                        {founder.qualifications || 'MLT, ACLS, BLS'}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-white font-semibold drop-shadow-sm">
                        {founder.title || 'Blood Bank Specialist'}
                      </span>
                    </div>

                    {/* Organization & Role */}
                    <p className="text-xs text-amber-300 font-bold mt-1.5 flex items-center gap-1.5 drop-shadow-sm">
                      <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{founder.organization || 'Blood flow Foundation'} ({founder.role || 'FOUNDER'})</span>
                    </p>

                    {/* Bio Statement */}
                    <p className="text-xs text-slate-100 mt-2 line-clamp-2 leading-relaxed drop-shadow-md font-normal">
                      {founder.bio ||
                        'Dedicated to clinical excellence in blood banking, voluntary donor motivation, and emergency cold-chain transfusion across Rawalpindi & Islamabad.'}
                    </p>

                    {/* Verification Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-2.5 border-t border-white/15 mt-3 text-[11px] text-slate-200 font-medium">
                      <span className="inline-flex items-center gap-1 text-emerald-300 drop-shadow-sm">
                        <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                        MLT Certified
                      </span>
                      <span className="text-white/40">•</span>
                      <span className="inline-flex items-center gap-1 text-sky-300 drop-shadow-sm">
                        <BadgeCheck className="w-3.5 h-3.5 text-sky-400" />
                        ACLS &amp; BLS
                      </span>
                      <span className="text-white/40">•</span>
                      <span className="inline-flex items-center gap-1 text-red-300 drop-shadow-sm">
                        <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                        Blood Specialist
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
