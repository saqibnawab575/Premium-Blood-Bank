import React from 'react';
import { WebsiteContent } from '../types';
import {
  Compass,
  Eye,
  Shield,
  Heart,
  Users,
  Building,
  CheckCircle,
} from 'lucide-react';

interface AboutUsProps {
  content: WebsiteContent;
}

export const AboutUs: React.FC<AboutUsProps> = ({ content }) => {
  const sections = [
    {
      title: 'Our Mission',
      desc: content.aboutMission,
      icon: <Compass className="w-5 h-5 text-red-600" />,
      accent: 'border-l-4 border-red-600',
    },
    {
      title: 'Our Vision',
      desc: content.aboutVision,
      icon: <Eye className="w-5 h-5 text-blue-600" />,
      accent: 'border-l-4 border-blue-600',
    },
    {
      title: 'Our Commitment',
      desc: content.aboutCommitment,
      icon: <Shield className="w-5 h-5 text-emerald-600" />,
      accent: 'border-l-4 border-emerald-600',
    },
    {
      title: 'Quality & Safety',
      desc: content.aboutQualitySafety,
      icon: <CheckCircle className="w-5 h-5 text-indigo-600" />,
      accent: 'border-l-4 border-indigo-600',
    },
    {
      title: 'Donor Care',
      desc: content.aboutDonorCare,
      icon: <Heart className="w-5 h-5 text-rose-600" />,
      accent: 'border-l-4 border-rose-600',
    },
    {
      title: 'Patient Support',
      desc: content.aboutPatientSupport,
      icon: <Users className="w-5 h-5 text-amber-600" />,
      accent: 'border-l-4 border-amber-600',
    },
    {
      title: 'Hospital Collaboration',
      desc: content.aboutHospitalCollab,
      icon: <Building className="w-5 h-5 text-teal-600" />,
      accent: 'border-l-4 border-teal-600',
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Institutional Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0c2e59] tracking-tight">
            About Premium Blood Bank
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Operating from the Basement of Premium Medical Complex, Saddar, Rawalpindi,
            we are a dedicated clinical facility bridging the gap between life-saving voluntary
            donors and critically ill patients.
          </p>
        </div>

        {/* Highlight Banner: Location & Facility */}
        <div className="mb-12 rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              Facility Address &amp; Location
            </span>
            <h3 className="text-xl font-bold text-[#0c2e59] mt-1 mb-2">
              Basement of Premium Medical Complex
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              Javed Lane, Peshawar Road, Saddar, Rawalpindi, 44000. Strategically positioned
              along the central medical corridor for quick ambulance transit and hospital component delivery.
            </p>
          </div>
        </div>

        {/* 7 Factual Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((sec, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow ${sec.accent}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-slate-50">{sec.icon}</div>
                <h3 className="text-lg font-bold text-[#0c2e59]">{sec.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {sec.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
