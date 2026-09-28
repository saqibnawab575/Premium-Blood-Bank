import React, { useState } from 'react';
import { WebsiteContent } from '../types';
import { BloodBankStore } from '../services/store';
import {
  MapPin,
  Send,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';

interface ContactSectionProps {
  content: WebsiteContent;
  onSuccessToast?: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  content,
  onSuccessToast,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in your name, contact phone number, and message.');
      return;
    }

    setIsSubmitting(true);

    try {
      BloodBankStore.addMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim() || 'General Inquiry',
        message: formData.message.trim(),
      });

      setSubmitted(true);
      if (onSuccessToast) {
        onSuccessToast('Your message has been delivered to our medical desk.');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setErrorMsg('Unable to submit inquiry. Please call 03125252240 directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Direct Clinical Communications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0c2e59] tracking-tight">
            Contact Premium Blood Bank
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Our clinical team and transfusion desk are available 24/7. Reach out via call,
            WhatsApp, email, or visit our facility in Rawalpindi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Google Maps / Directions Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0c2e59]">
                      Facility Location &amp; Directions
                    </h4>
                    <p className="text-xs text-slate-500">
                      {content.address || 'Basement of Premium Medical Complex, Saddar, Rawalpindi'}
                    </p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Peshawar+Road+Saddar+Rawalpindi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1 shrink-0 ml-2"
                >
                  <span>Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Map View Frame */}
              <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <iframe
                  title="Premium Blood Bank Location"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src="https://maps.google.com/maps?q=Peshawar%20Road,%20Saddar,%20Rawalpindi&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  className="w-full h-full grayscale-[15%]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider block mb-1">
                Inquiry &amp; Support Form
              </span>
              <h3 className="text-2xl font-extrabold text-[#0c2e59] mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Have inquiries about voluntary donation camps, corporate blood drives, or institutional supply agreements?
              </p>

              {submitted ? (
                <div className="text-center py-10 animate-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-[#0c2e59]">Message Received</h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto mt-2">
                    Thank you, {formData.name}. Our administrative coordinator will contact you shortly.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-6 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Haris / Hamza Khan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Contact Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 03001234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Blood Donation Camp / Corporate Inquiry"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Message / Inquiry Details *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your questions, requirements, or proposed dates..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 bg-[#0c2e59] hover:bg-[#071c37] text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
