import React from 'react';
import { BloodGroup, WebsiteContent } from '../types';
import { Phone, MessageSquare, Mail, AlertCircle, Droplet } from 'lucide-react';

interface BloodAvailabilityProps {
  content: WebsiteContent;
  onNavigateToContact: () => void;
}

export const BloodAvailability: React.FC<BloodAvailabilityProps> = ({
  content,
  onNavigateToContact,
}) => {
  const bloodGroups: { group: BloodGroup; typeDesc: string; compatibility: string }[] = [
    { group: 'A+', typeDesc: 'Rh-positive type A', compatibility: 'Compatible with A+, A-, O+, O-' },
    { group: 'A-', typeDesc: 'Rh-negative type A', compatibility: 'Compatible with A-, O-' },
    { group: 'B+', typeDesc: 'Rh-positive type B', compatibility: 'Compatible with B+, B-, O+, O-' },
    { group: 'B-', typeDesc: 'Rh-negative type B', compatibility: 'Compatible with B-, O-' },
    { group: 'AB+', typeDesc: 'Universal Recipient', compatibility: 'Can receive all blood group types' },
    { group: 'AB-', typeDesc: 'Rare plasma donor', compatibility: 'Compatible with AB-, A-, B-, O-' },
    { group: 'O+', typeDesc: 'High demand clinical', compatibility: 'Compatible with O+, O-' },
    { group: 'O-', typeDesc: 'Universal Red Cell Donor', compatibility: 'Immediate emergency transfusions' },
  ];

  const handleWhatsApp = (group: BloodGroup) => {
    const text = encodeURIComponent(
      `Hello Premium Blood Bank, I would like to inquire about the current availability of blood group ${group}.`
    );
    window.open(`https://wa.me/923125252240?text=${text}`, '_blank');
  };

  return (
    <section id="availability" className="py-20 md:py-28 bg-[#f8fafc] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <span className="text-xs font-bold tracking-widest text-[#c4122f] uppercase block mb-2">
            Clinical Verification System
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#091a2f] tracking-tight">
            Blood Availability
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
            To ensure zero discrepancy during patient transfusions, blood component readiness
            is verified directly with our clinical laboratory bench in Rawalpindi.
          </p>

          {/* Verification Protocol Notice */}
          <div className="mt-6 p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#c4122f] shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <span className="font-bold text-[#091a2f]">Transfusion Protocol: </span>
              {content.availabilityNotice ||
                'For current availability, please contact Premium Blood Bank directly.'}
            </p>
          </div>
        </div>

        {/* 8 Blood Group Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bloodGroups.map((bg) => (
            <div
              key={bg.group}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header within card */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#091a2f] text-white flex items-center justify-center font-black text-xl">
                      {bg.group}
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-[#091a2f]">
                        Group {bg.group}
                      </h3>
                      <span className="text-[11px] text-slate-500 block">
                        {bg.typeDesc}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Compatibility information */}
                <div className="text-xs text-slate-600 mb-4 space-y-1">
                  <span className="font-semibold text-slate-900 block text-[11px] uppercase tracking-wider">
                    Compatibility
                  </span>
                  <p className="text-slate-500 leading-relaxed">{bg.compatibility}</p>
                </div>

                {/* Explicit Requirement Text */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium leading-relaxed mb-6">
                  “{content.availabilityNotice || 'Contact us for current availability.'}”
                </div>
              </div>

              {/* Action Buttons: Call Now, WhatsApp, Contact Us */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:03125252240"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-white bg-[#091a2f] hover:bg-[#06111e] rounded-xl transition-colors cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </a>

                  <button
                    onClick={() => handleWhatsApp(bg.group)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </button>
                </div>

                <button
                  onClick={onNavigateToContact}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100/70 hover:bg-slate-200/70 rounded-xl transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Contact Facility Desk</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Help Desk Bar */}
        <div className="mt-12 rounded-2xl bg-[#091a2f] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-slate-800">
          <div className="text-left">
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest block mb-1">
              Crossmatch &amp; Verification Desk
            </span>
            <h4 className="text-xl font-bold tracking-tight">Need Urgent Clinical Availability Confirmation?</h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
              Our clinical pathologists and technologists verify donor samples and recipient serum round the clock in Rawalpindi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:03125252240"
              className="flex items-center gap-2 px-5 py-3 bg-[#c4122f] hover:bg-[#a60e27] text-white rounded-xl text-xs font-bold transition-all shadow"
            >
              <Phone className="w-4 h-4" />
              <span>Call 03125252240</span>
            </a>

            <a
              href="mailto:premiumbloodbank@gmail.com"
              className="flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold border border-white/15 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>premiumbloodbank@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
