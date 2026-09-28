import React, { useState } from 'react';
import { ServiceItem } from '../types';
import {
  HeartHandshake,
  ShieldCheck,
  TestTube2,
  Microscope,
  Layers,
  Truck,
  AlertCircle,
  Building2,
  ChevronRight,
  X,
  CheckCircle2,
} from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceItem[];
  onContactFacility: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onContactFacility,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-red-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'TestTube2':
        return <TestTube2 className="w-6 h-6 text-blue-600" />;
      case 'Microscope':
        return <Microscope className="w-6 h-6 text-indigo-600" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-rose-600" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-cyan-600" />;
      case 'AlertCircle':
        return <AlertCircle className="w-6 h-6 text-red-600" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-amber-600" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-red-600" />;
    }
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Clinical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0c2e59] tracking-tight">
            Transfusion Medicine &amp; Clinical Services
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Delivering safe, screened, and verified blood products in compliance with established
            transfusion protocols for hospitals, trauma units, and outpatient clinics.
          </p>
        </div>

        {/* Services Grid (8 Services) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-red-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {getServiceIcon(service.iconName)}
                </div>

                <h3 className="text-lg font-bold text-[#0c2e59] group-hover:text-red-700 transition-colors">
                  {service.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {service.shortDescription}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-200/60">
                <button
                  onClick={() => setSelectedService(service)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                >
                  <span>Learn More</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Service Detail View */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                  {getServiceIcon(selectedService.iconName)}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest block">
                    Clinical Standard
                  </span>
                  <h3 className="text-xl font-bold text-[#0c2e59]">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {selectedService.fullDescription}
              </p>

              <div className="space-y-2.5 mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Key Transfusion Procedures:
                </h4>
                {selectedService.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    onContactFacility();
                  }}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
                >
                  Contact About This Service
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
