import React, { useState } from 'react';
import { WebsiteContent } from '../types';
import { MessageSquare, X, Send, PhoneCall } from 'lucide-react';

interface FloatingWhatsAppProps {
  content: WebsiteContent;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const phone = content.whatsappNumber || '03125252240';
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  // Format for international link: if starts with 0, replace with 92
  const intlPhone = cleanPhone.startsWith('0') ? '92' + cleanPhone.slice(1) : cleanPhone;

  const quickMessages = [
    {
      label: 'Blood Availability Query',
      text:
        content.whatsappMessageAvailability ||
        'Hello Premium Blood Bank, I would like to ask about blood availability.',
    },
    {
      label: 'Emergency Blood Request',
      text:
        content.whatsappMessageRequest ||
        'Hello Premium Blood Bank, I need information regarding a blood request.',
    },
    {
      label: 'Voluntary Blood Donation',
      text:
        'Hello Premium Blood Bank, I am interested in donating blood voluntarily. Please guide me.',
    },
  ];

  const sendWhatsApp = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${intlPhone}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">Premium Blood Bank</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  <span>24/7 Clinical WhatsApp Desk</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3">
            <p className="text-xs text-slate-600">
              Select an inquiry below or type a message to chat directly with our transfusion coordinator on WhatsApp:
            </p>

            {/* Quick Prompts */}
            <div className="space-y-1.5">
              {quickMessages.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => sendWhatsApp(item.text)}
                  className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 text-xs text-slate-700 font-medium transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
                >
                  <span className="line-clamp-1">{item.label}</span>
                  <Send className="w-3.5 h-3.5 text-emerald-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2 border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && customMsg.trim()) {
                    sendWhatsApp(customMsg.trim());
                  }
                }}
                className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                onClick={() => {
                  if (customMsg.trim()) sendWhatsApp(customMsg.trim());
                }}
                disabled={!customMsg.trim()}
                className="p-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl transition-colors cursor-pointer"
                aria-label="Send WhatsApp"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform active:scale-95 cursor-pointer border-2 border-white/40"
        aria-label="WhatsApp Support"
      >
        <MessageSquare className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
        <span className="text-xs font-bold hidden sm:inline tracking-wide">
          WhatsApp 03125252240
        </span>
      </button>
    </div>
  );
};
