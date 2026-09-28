import React, { useState } from 'react';
import { BloodGroup, DonorRegistration as DonorType, WebsiteContent } from '../types';
import { BloodBankStore } from '../services/store';
import {
  Heart,
  CheckCircle2,
  Lock,
  Phone,
  MessageSquare,
  Shield,
  User,
  Calendar,
  MapPin,
  AlertCircle,
} from 'lucide-react';

interface DonorRegistrationProps {
  content: WebsiteContent;
  onSuccessToast?: (msg: string) => void;
}

export const DonorRegistration: React.FC<DonorRegistrationProps> = ({
  content,
  onSuccessToast,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    bloodGroup: 'O+' as BloodGroup,
    age: 25,
    cityArea: 'Rawalpindi',
    lastDonationDate: '',
    preferredContactMethod: 'WhatsApp' as 'Call' | 'WhatsApp' | 'SMS',
    additionalInfo: '',
    consent: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredDonor, setRegisteredDonor] = useState<DonorType | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.contactNumber.trim()) {
      setErrorMessage('Please provide your telephone or mobile contact number.');
      return;
    }
    if (formData.age < 18 || formData.age > 65) {
      setErrorMessage('Blood donors must be between 18 and 65 years of age.');
      return;
    }
    if (!formData.consent) {
      setErrorMessage('Please acknowledge the consent checkbox to register.');
      return;
    }

    setIsSubmitting(true);

    try {
      const donor = BloodBankStore.addDonor({
        fullName: formData.fullName.trim(),
        contactNumber: formData.contactNumber.trim(),
        bloodGroup: formData.bloodGroup,
        age: Number(formData.age),
        cityArea: formData.cityArea.trim(),
        lastDonationDate: formData.lastDonationDate || undefined,
        preferredContactMethod: formData.preferredContactMethod,
        additionalInfo: formData.additionalInfo.trim(),
        consent: true,
      });

      setRegisteredDonor(donor);
      if (onSuccessToast) {
        onSuccessToast('Registered successfully as a voluntary blood donor!');
      }
    } catch (err) {
      console.error('Donor registration error:', err);
      setErrorMessage('Unable to complete registration. Please call 03125252240.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setRegisteredDonor(null);
    setFormData({
      fullName: '',
      contactNumber: '',
      bloodGroup: 'O+',
      age: 25,
      cityArea: 'Rawalpindi',
      lastDonationDate: '',
      preferredContactMethod: 'WhatsApp',
      additionalInfo: '',
      consent: true,
    });
  };

  return (
    <section id="donor-registration" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
            <span>Voluntary Donor Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0c2e59] tracking-tight">
            Register as a Blood Donor
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Become a lifeline for patients battling trauma, cancer, thalassemia, and urgent surgical complications.
            Your single donation can save up to 3 lives.
          </p>
        </div>

        {/* Privacy Assurance Card */}
        <div className="mb-8 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-3.5 text-slate-700">
          <div className="p-2 rounded-xl bg-slate-100 text-slate-700 shrink-0 mt-0.5">
            <Lock className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-xs sm:text-sm">
            <h4 className="font-bold text-[#0c2e59]">Strict Donor Confidentiality</h4>
            <p className="text-slate-500 mt-0.5 leading-relaxed">
              In accordance with our patient and donor privacy protocol, your personal contact details
              are securely encrypted and accessible strictly to authorized clinical coordinators when emergency matching is needed.
            </p>
          </div>
        </div>

        {/* Post-Registration Success State */}
        {registeredDonor ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-9 h-9 fill-red-600" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-3">
              Registration Confirmed • Volunteer #{registeredDonor.id}
            </span>

            <h3 className="text-2xl font-extrabold text-[#0c2e59]">
              Thank You, {registeredDonor.fullName}!
            </h3>

            <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              You are now enrolled in our voluntary donor registry for blood group{' '}
              <span className="font-bold text-red-600">{registeredDonor.bloodGroup}</span>.
              Our transfusion coordinator will reach out via {registeredDonor.preferredContactMethod} when an emergency match arises.
            </p>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${content.emergencyHotline}`}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#0c2e59] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Center: {content.emergencyHotline}</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Register another family member
              </button>
            </div>
          </div>
        ) : (
          /* Main Donor Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md"
          >
            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-300 text-red-800 text-sm flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-red-600" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zubair Ahmed"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-red-600" />
                  <span>Contact Number *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 03331234567"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                />
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Blood Group *
                </label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) =>
                    setFormData({ ...formData, bloodGroup: e.target.value as BloodGroup })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-[#0c2e59] focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                >
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>
                      Blood Group {bg}
                    </option>
                  ))}
                </select>
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Age (Years: 18 - 65) *
                </label>
                <input
                  type="number"
                  min={18}
                  max={65}
                  required
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: parseInt(e.target.value) || 18 })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                />
              </div>

              {/* City / Area */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>City / Area of Residence *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Peshawar Road, Saddar, Rawalpindi"
                  value={formData.cityArea}
                  onChange={(e) => setFormData({ ...formData, cityArea: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                />
              </div>

              {/* Last Donation Date */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Last Blood Donation Date (If any)</span>
                </label>
                <input
                  type="date"
                  value={formData.lastDonationDate}
                  onChange={(e) =>
                    setFormData({ ...formData, lastDonationDate: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Preferred Contact Method */}
            <div className="mt-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Preferred Contact Method for Emergency Calls
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['WhatsApp', 'Call', 'SMS'] as const).map((method) => (
                  <button
                    type="button"
                    key={method}
                    onClick={() =>
                      setFormData({ ...formData, preferredContactMethod: method })
                    }
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer font-semibold text-xs sm:text-sm ${
                      formData.preferredContactMethod === method
                        ? 'border-red-600 bg-red-50 text-red-700 shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Additional Information / Availability Notes
              </label>
              <textarea
                rows={2}
                placeholder="Mention availability days, preferred hospitals in Rawalpindi, or any medical notes..."
                value={formData.additionalInfo}
                onChange={(e) =>
                  setFormData({ ...formData, additionalInfo: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Consent Checkbox */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded text-red-600 focus:ring-red-500 border-slate-300 cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  “I agree that Premium Blood Bank may contact me regarding blood donation and related blood-bank services.”
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-red-600/30 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{isSubmitting ? 'Registering...' : 'Register as Donor'}</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>Protected by clinical privacy rules</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
