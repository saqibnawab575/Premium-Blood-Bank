import React, { useState } from 'react';
import { WebsiteContent } from '../types';
import { Droplet, X, Send, Phone, MessageSquare, AlertCircle } from 'lucide-react';

interface FloatingRequestBloodProps {
  content: WebsiteContent;
  onOpenDirectRequest?: () => void;
}

export const FloatingRequestBlood: React.FC<FloatingRequestBloodProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [hospital, setHospital] = useState('');
  const [units, setUnits] = useState('1');

  const phone = content.whatsappNumber || '03125252240';
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const intlPhone = cleanPhone.startsWith('0') ? '92' + cleanPhone.slice(1) : cleanPhone;

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*EMERGENCY BLOOD REQUEST - Premium Blood Bank*\n` +
      `• Patient Name: ${patientName.trim() || 'Urgent Patient'}\n` +
      `• Required Blood Group: ${bloodGroup}\n` +
      `• Required Units: ${units} Unit(s)\n` +
      `• Hospital / Location: ${hospital.trim() || 'Rawalpindi / Islamabad'}\n\n` +
      `Please confirm clinical availability and crossmatching immediately.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${intlPhone}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  const handleDirectCall = () => {
    window.location.href = `tel:${content.emergencyHotline || '03125252240'}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
          {/* Header with clinical tone */}
          <div className="bg-gradient-to-r from-[#9e0e25] via-[#c4122f] to-[#7f091c] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white">
                <Droplet className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-tight">Request Blood</h4>
                <p className="text-[11px] text-red-100 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  <span>24/7 Clinical Desk: 03125252240</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSendRequest} className="p-4 bg-slate-50 space-y-3">
            <p className="text-xs text-slate-600 leading-relaxed">
              Submit patient details to reach our on-duty transfusion coordinator immediately:
            </p>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Patient Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Patient Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Blood Group
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl font-bold text-[#091a2f] focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Units Needed
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Hospital / City Area
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Holy Family Hospital, Rawalpindi"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="submit"
                className="flex-1 py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Blood Request</span>
              </button>

              <button
                type="button"
                onClick={handleDirectCall}
                className="p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                title="Direct Emergency Call"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Floating Trigger Button: REQUEST BLOOD */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-[#c4122f] via-[#b00f28] to-[#910a20] hover:from-[#d91637] hover:to-[#a10e26] text-white rounded-full shadow-2xl hover:shadow-red-900/40 transition-all duration-300 transform active:scale-95 cursor-pointer border border-white/30"
        aria-label="Request Blood"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <Droplet className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
        <span className="text-sm font-extrabold tracking-wide uppercase">
          Request Blood
        </span>
      </button>
    </div>
  );
};
