import React, { useState } from 'react';
import { BloodGroup, UrgencyLevel, BloodRequest, WebsiteContent } from '../types';
import { BloodBankStore } from '../services/store';
import {
  AlertTriangle,
  Phone,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Building,
  User,
  MapPin,
  FileText,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface EmergencyBloodRequestProps {
  content: WebsiteContent;
  onSuccessToast?: (msg: string) => void;
}

export const EmergencyBloodRequest: React.FC<EmergencyBloodRequestProps> = ({
  content,
  onSuccessToast,
}) => {
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: 'B+' as BloodGroup,
    requiredUnits: 1,
    hospitalName: '',
    attendantName: '',
    contactNumber: '',
    cityArea: 'Rawalpindi',
    requiredDate: new Date().toISOString().split('T')[0],
    urgency: 'Emergency' as UrgencyLevel,
    additionalInfo: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<BloodRequest | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const urgencyLevels: { level: UrgencyLevel; label: string; desc: string; color: string }[] = [
    {
      level: 'Emergency',
      label: 'Emergency (Immediate / Life Threatening)',
      desc: 'Active hemorrhage, ICU trauma, acute obstetric collapse',
      color: 'border-red-500 bg-red-50/70 text-red-900',
    },
    {
      level: 'Urgent',
      label: 'Urgent (Within 4–12 Hours)',
      desc: 'Scheduled urgent surgery, critical anemia',
      color: 'border-amber-500 bg-amber-50/70 text-amber-900',
    },
    {
      level: 'Routine',
      label: 'Routine (Planned / Elective)',
      desc: 'Scheduled next-day procedure, standing blood reserve',
      color: 'border-blue-400 bg-blue-50/70 text-blue-900',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!formData.patientName.trim()) {
      setErrorMessage('Please provide the patient name.');
      return;
    }
    if (!formData.contactNumber.trim()) {
      setErrorMessage('Please provide a valid direct contact telephone number.');
      return;
    }
    if (!formData.hospitalName.trim()) {
      setErrorMessage('Please specify the hospital or clinical facility name.');
      return;
    }
    if (!formData.attendantName.trim()) {
      setErrorMessage('Please specify the name of the attendant or requester.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newRecord = BloodBankStore.addRequest({
        patientName: formData.patientName.trim(),
        bloodGroup: formData.bloodGroup,
        requiredUnits: Number(formData.requiredUnits) || 1,
        hospitalName: formData.hospitalName.trim(),
        attendantName: formData.attendantName.trim(),
        contactNumber: formData.contactNumber.trim(),
        cityArea: formData.cityArea.trim(),
        requiredDate: formData.requiredDate,
        urgency: formData.urgency,
        additionalInfo: formData.additionalInfo.trim(),
      });

      setSubmittedRequest(newRecord);
      if (onSuccessToast) {
        onSuccessToast('Blood request submitted successfully.');
      }
    } catch (err) {
      console.error('Request submission error:', err);
      setErrorMessage(
        'Unable to submit your request right now. Please call Premium Blood Bank directly at 03125252240.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedRequest(null);
    setFormData({
      patientName: '',
      bloodGroup: 'B+',
      requiredUnits: 1,
      hospitalName: '',
      attendantName: '',
      contactNumber: '',
      cityArea: 'Rawalpindi',
      requiredDate: new Date().toISOString().split('T')[0],
      urgency: 'Emergency',
      additionalInfo: '',
    });
  };

  const handleWhatsAppContact = () => {
    if (!submittedRequest) return;
    const msg = encodeURIComponent(
      `Hello Premium Blood Bank, I submitted blood request (#${submittedRequest.id}) for patient ${submittedRequest.patientName} (${submittedRequest.bloodGroup}, ${submittedRequest.requiredUnits} unit(s) at ${submittedRequest.hospitalName}). Urgency: ${submittedRequest.urgency}. Please confirm availability.`
    );
    window.open(`https://wa.me/923125252240?text=${msg}`, '_blank');
  };

  return (
    <section id="blood-request" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-red-600 animate-pulse" />
            <span>Clinical Requisition Form</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0c2e59] tracking-tight">
            Emergency Blood Request
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Submit patient requisition details for clinical crossmatching and component coordination.
            For imminent life-saving emergencies, dial our 24/7 hotline directly.
          </p>
        </div>

        {/* Post-submission Confirmation Message */}
        {submittedRequest ? (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-3">
              Request Logged • Ref #{submittedRequest.id}
            </span>

            {/* Prompt's Explicit Requirement text */}
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0c2e59] max-w-xl mx-auto leading-snug">
              “Your request has been recorded on this device. Please contact Premium Blood Bank directly for confirmation and current availability.”
            </h3>

            <div className="my-6 p-4 rounded-2xl bg-white border border-slate-200 max-w-md mx-auto text-left space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Patient:</span>
                <span className="font-bold text-[#0c2e59]">{submittedRequest.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Blood Group:</span>
                <span className="font-bold text-red-600">{submittedRequest.bloodGroup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Units Required:</span>
                <span className="font-bold">{submittedRequest.requiredUnits} Unit(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Hospital:</span>
                <span className="font-medium text-slate-900">{submittedRequest.hospitalName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Urgency:</span>
                <span className="font-bold text-red-700">{submittedRequest.urgency}</span>
              </div>
            </div>

            {/* Prominent Direct Contact Action */}
            <div className="p-5 rounded-2xl bg-red-50 border border-red-200 max-w-lg mx-auto mb-6 text-red-900">
              <p className="text-xs sm:text-sm font-semibold mb-3">
                Call our 24/7 Transfusion Technologist immediately to prioritize testing:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="tel:03125252240"
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black text-base shadow-md transition-all active:scale-95"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call 03125252240</span>
                </a>

                <button
                  onClick={handleWhatsAppContact}
                  className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Details</span>
                </button>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline transition-colors cursor-pointer"
            >
              Submit another requisition
            </button>
          </div>
        ) : (
          /* Main Blood Request Form */
          <form
            onSubmit={handleSubmit}
            className="bg-slate-50/80 rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md"
          >
            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-300 text-red-800 text-sm flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-red-600" />
                  <span>Patient Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mohammad Tariq"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Required Blood Group *
                </label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) =>
                    setFormData({ ...formData, bloodGroup: e.target.value as BloodGroup })
                  }
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-[#0c2e59] focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                >
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>
                      Blood Group {bg}
                    </option>
                  ))}
                </select>
              </div>

              {/* Required Units */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Required Units / Bags *
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  required
                  value={formData.requiredUnits}
                  onChange={(e) =>
                    setFormData({ ...formData, requiredUnits: parseInt(e.target.value) || 1 })
                  }
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
              </div>

              {/* Hospital Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-red-600" />
                  <span>Hospital / Medical Facility *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Holy Family Hospital / Benazir Bhutto Hospital"
                  value={formData.hospitalName}
                  onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
              </div>

              {/* Attendant / Requester Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>Attendant / Requester Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Relative or Attending Staff Name"
                  value={formData.attendantName}
                  onChange={(e) => setFormData({ ...formData, attendantName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-red-600" />
                  <span>Active Contact Number *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 03001234567"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
              </div>

              {/* City / Area */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>City / Area *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Saddar Rawalpindi, Peshawar Road, Islamabad"
                  value={formData.cityArea}
                  onChange={(e) => setFormData({ ...formData, cityArea: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
              </div>

              {/* Required Date */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Required Date *</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.requiredDate}
                  onChange={(e) => setFormData({ ...formData, requiredDate: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
              </div>
            </div>

            {/* Urgency Selection */}
            <div className="mt-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-red-600" />
                <span>Clinical Urgency Level *</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {urgencyLevels.map((u) => (
                  <button
                    type="button"
                    key={u.level}
                    onClick={() => setFormData({ ...formData, urgency: u.level })}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      formData.urgency === u.level
                        ? `${u.color} ring-2 ring-red-500 font-bold shadow-sm`
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm">{u.level}</div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{u.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>Additional Information / Clinical Notes</span>
              </label>
              <textarea
                rows={3}
                placeholder="Mention diagnosis, specific component (Whole Blood, PRBC, FFP, Platelets), patient ward/bed number, or crossmatch sample details..."
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none"
              />
            </div>

            {/* Transparency Note */}
            <div className="mt-6 p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Requisitioning does not automatically guarantee component release. All units require verified recipient blood sample for direct compatibility crossmatching.
              </span>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-red-600/30 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting Requisition...' : 'Submit Blood Request'}</span>
              </button>

              <div className="text-xs text-slate-500 text-center sm:text-right">
                Emergency Hotline: <span className="font-bold text-[#0c2e59]">03125252240</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
