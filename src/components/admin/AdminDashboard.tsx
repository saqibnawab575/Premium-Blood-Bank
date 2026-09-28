import React, { useState, useEffect } from 'react';
import { Logo } from '../Logo';
import { BloodBankStore } from '../../services/store';
import {
  BloodRequest,
  DonorRegistration,
  ContactMessage,
  GalleryItem,
  ServiceItem,
  WebsiteContent,
  AdminUser,
  FounderProfile,
} from '../../types';
import {
  LayoutDashboard,
  FileSpreadsheet,
  Users,
  Mail,
  Image as ImageIcon,
  Stethoscope,
  Home,
  Info,
  Droplet,
  PhoneCall,
  Share2,
  Palette,
  Sparkles,
  FileEdit,
  Settings,
  LogOut,
  Search,
  Filter,
  Trash2,
  CheckCircle2,
  Clock,
  Eye,
  X,
  Plus,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Menu,
  Shield,
  Upload,
  Sun,
  Moon,
  Edit2,
  ArrowUp,
  ArrowDown,
  Award,
  BadgeCheck,
} from 'lucide-react';

interface AdminDashboardProps {
  user: AdminUser;
  onLogout: () => void;
  onClose: () => void;
  onToast: (msg: string) => void;
}

type TabType =
  | 'dashboard'
  | 'blood-requests'
  | 'donor-registrations'
  | 'contact-messages'
  | 'gallery'
  | 'services'
  | 'homepage'
  | 'about-us'
  | 'founder-profile'
  | 'blood-availability'
  | 'contact-settings'
  | 'social-media'
  | 'logo-branding'
  | 'theme-colors'
  | 'website-content'
  | 'admin-settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  onLogout,
  onClose,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Live state from Store
  const [content, setContent] = useState<WebsiteContent>(BloodBankStore.getContent());
  const [requests, setRequests] = useState<BloodRequest[]>(BloodBankStore.getRequests());
  const [donors, setDonors] = useState<DonorRegistration[]>(BloodBankStore.getDonors());
  const [messages, setMessages] = useState<ContactMessage[]>(BloodBankStore.getMessages());
  const [gallery, setGallery] = useState<GalleryItem[]>(BloodBankStore.getGallery());
  const [services, setServices] = useState<ServiceItem[]>(BloodBankStore.getServices());

  // Search and filter states
  const [reqSearch, setReqSearch] = useState('');
  const [reqFilterGroup, setReqFilterGroup] = useState('All');
  const [reqFilterUrgency, setReqFilterUrgency] = useState('All');
  const [selectedReq, setSelectedReq] = useState<BloodRequest | null>(null);

  const [donorSearch, setDonorSearch] = useState('');
  const [donorFilterGroup, setDonorFilterGroup] = useState('All');
  const [donorFilterArea, setDonorFilterArea] = useState('All');
  const [selectedDonor, setSelectedDonor] = useState<DonorRegistration | null>(null);

  const [msgSearch, setMsgSearch] = useState('');
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);

  // New gallery item state
  const [newImageTitle, setNewImageTitle] = useState('');
  const [newImageCaption, setNewImageCaption] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageCategory, setNewImageCategory] = useState<GalleryItem['category']>('Blood Bank');
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);

  // Theme Mode (Dark & White)
  const isDarkMode = content.theme?.mode === 'dark';
  const toggleThemeMode = () => {
    const nextMode = isDarkMode ? 'light' : 'dark';
    const updated = BloodBankStore.updateContent({
      theme: { ...content.theme, mode: nextMode },
    });
    setContent(updated);
    onToast(`Switched to ${nextMode === 'dark' ? 'Dark' : 'White (Light)'} theme.`);
  };

  // Edit Service State
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Founder profile configuration state
  const [founderName, setFounderName] = useState(content.founder?.name || 'SAQIB NAWAB');
  const [founderQual, setFounderQual] = useState(content.founder?.qualifications || 'MLT, ACLS, BLS');
  const [founderTitle, setFounderTitle] = useState(content.founder?.title || 'Blood Bank Specialist');
  const [founderOrg, setFounderOrg] = useState(content.founder?.organization || 'Blood flow Foundation');
  const [founderRole, setFounderRole] = useState(content.founder?.role || 'FOUNDER');
  const [founderBio, setFounderBio] = useState(
    content.founder?.bio ||
      'Dedicated to life-saving clinical blood transfusion safety, emergency crossmatch readiness, and ethical donor motivation.'
  );
  const [founderBgImage, setFounderBgImage] = useState(content.founder?.backgroundImage || '/images/hero.jpg');

  // Confirmation modal for Reset
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Refresh data handler
  const refreshAll = () => {
    const c = BloodBankStore.getContent();
    setContent(c);
    setRequests(BloodBankStore.getRequests());
    setDonors(BloodBankStore.getDonors());
    setMessages(BloodBankStore.getMessages());
    setGallery(BloodBankStore.getGallery());
    setServices(BloodBankStore.getServices());
    if (c.founder) {
      setFounderName(c.founder.name || 'SAQIB NAWAB');
      setFounderQual(c.founder.qualifications || 'MLT, ACLS, BLS');
      setFounderTitle(c.founder.title || 'Blood Bank Specialist');
      setFounderOrg(c.founder.organization || 'Blood flow Foundation');
      setFounderRole(c.founder.role || 'FOUNDER');
      setFounderBio(c.founder.bio || '');
      setFounderBgImage(c.founder.backgroundImage || '/images/hero.jpg');
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const handleSaveContent = (partial: Partial<WebsiteContent>, successMsg = 'Changes saved successfully!') => {
    const updated = BloodBankStore.updateContent(partial);
    setContent(updated);
    onToast(successMsg);
  };

  // Nav Items configuration
  const sidebarLinks: { id: TabType; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      id: 'blood-requests',
      label: 'Blood Requests',
      icon: <FileSpreadsheet className="w-4 h-4" />,
      badge: requests.filter((r) => r.status === 'New').length,
    },
    {
      id: 'donor-registrations',
      label: 'Donor Registrations',
      icon: <Users className="w-4 h-4" />,
      badge: donors.filter((d) => d.status === 'Active').length,
    },
    {
      id: 'contact-messages',
      label: 'Contact Messages',
      icon: <Mail className="w-4 h-4" />,
      badge: messages.filter((m) => m.status === 'Unread').length,
    },
    { id: 'gallery', label: 'Gallery', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'homepage', label: 'Homepage', icon: <Home className="w-4 h-4" /> },
    { id: 'about-us', label: 'About Us', icon: <Info className="w-4 h-4" /> },
    { id: 'founder-profile', label: 'Founder Profile', icon: <Award className="w-4 h-4" /> },
    { id: 'blood-availability', label: 'Blood Availability', icon: <Droplet className="w-4 h-4" /> },
    { id: 'contact-settings', label: 'Contact Settings', icon: <PhoneCall className="w-4 h-4" /> },
    { id: 'social-media', label: 'Social Media', icon: <Share2 className="w-4 h-4" /> },
    { id: 'logo-branding', label: 'Logo & Branding', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'theme-colors', label: 'Theme & Colors', icon: <Palette className="w-4 h-4" /> },
    { id: 'website-content', label: 'Website Content', icon: <FileEdit className="w-4 h-4" /> },
    { id: 'admin-settings', label: 'Admin Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex bg-slate-900 text-slate-100 overflow-hidden font-sans">
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#071629] border-r border-slate-800 shrink-0">
        {/* Sidebar Brand */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo variant="mark" size="sm" inverted={true} />
            <div>
              <span className="font-extrabold text-sm text-white tracking-wider block">
                ADMIN PANEL
              </span>
              <span className="text-[10px] text-red-400 font-semibold uppercase">
                Premium Blood Bank
              </span>
            </div>
          </div>
        </div>

        {/* User bar */}
        <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-200 truncate">{user.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
          </div>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
            Active
          </span>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5 no-scrollbar">
          {sidebarLinks.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white text-red-600' : 'bg-red-950 text-red-400 border border-red-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Actions */}
        <div className="p-3 border-t border-slate-800 space-y-1.5">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-xs font-semibold text-red-300 border border-red-900/50 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MOBILE DRAWER */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-full bg-[#071629] border-r border-slate-800 flex flex-col h-full z-10">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Logo variant="mark" size="sm" inverted={true} />
                <span className="font-bold text-sm text-white">Admin Portal</span>
              </div>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-2 space-y-1">
              {sidebarLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                    activeTab === item.id
                      ? 'bg-red-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-red-500 text-white font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            <div className="p-3 border-t border-slate-800">
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-900/50 text-xs font-semibold text-red-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-slate-900 overflow-hidden">
        {/* Top Navbar */}
        <header
          className={`h-14 backdrop-blur-md border-b px-4 sm:px-6 flex items-center justify-between shrink-0 transition-colors ${
            isDarkMode
              ? 'bg-slate-900/90 border-slate-800 text-white'
              : 'bg-white/95 border-slate-200 text-slate-900 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className={`lg:hidden p-2 rounded-lg ${
                isDarkMode
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm sm:text-base font-bold capitalize flex items-center gap-2">
              <span className="text-red-500 font-black">●</span>
              <span>{activeTab.replace('-', ' ')}</span>
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Dark & White Theme Toggle Button requested by user */}
            <button
              onClick={toggleThemeMode}
              className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isDarkMode
                  ? 'bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border-amber-400/30'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200 shadow-xs'
              }`}
              title={isDarkMode ? 'Switch to White (Light) Theme' : 'Switch to Dark Theme'}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold">White Theme</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700" />
                  <span className="font-semibold">Dark Theme</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                refreshAll();
                onToast('Data synchronized with browser localStorage.');
              }}
              className={`p-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer border ${
                isDarkMode
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-200'
              }`}
              title="Refresh Data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sync Data</span>
            </button>

            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span>Back to Site</span>
            </button>
          </div>
        </header>

        {/* Tab View Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* TAB 1: DASHBOARD HOME */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              {/* 4 Actual Count Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">New Requests</span>
                    <FileSpreadsheet className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="text-3xl font-black text-white">
                    {requests.filter((r) => r.status === 'New').length}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {requests.length} total requisitions recorded
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Pending / Contacted</span>
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="text-3xl font-black text-amber-300">
                    {requests.filter((r) => r.status === 'Contacted').length}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Awaiting crossmatch verification</p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Active Donors</span>
                    <Users className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-black text-emerald-400">
                    {donors.filter((d) => d.status === 'Active').length}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {donors.length} total voluntary registered
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Unread Messages</span>
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-3xl font-black text-blue-400">
                    {messages.filter((m) => m.status === 'Unread').length}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Inquiries from contact form</p>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase text-slate-300">Quick Navigation:</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setActiveTab('blood-requests')}
                    className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Blood Requests
                  </button>
                  <button
                    onClick={() => setActiveTab('donor-registrations')}
                    className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Donors
                  </button>
                  <button
                    onClick={() => setActiveTab('website-content')}
                    className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Edit Content
                  </button>
                  <button
                    onClick={() => setActiveTab('theme-colors')}
                    className="px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Theme Editor
                  </button>
                  <button
                    onClick={() => setActiveTab('founder-profile')}
                    className="px-3 py-1.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Founder (SAQIB NAWAB)</span>
                  </button>
                </div>
              </div>

              {/* Two Column Recents Table */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Blood Requests */}
                <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-red-400" />
                      <span>Recent Blood Requisitions</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('blood-requests')}
                      className="text-xs text-red-400 hover:text-red-300 font-semibold"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {requests.length === 0 ? (
                      <div className="py-8 px-4 rounded-xl bg-slate-900/40 border border-slate-700/50 text-center">
                        <FileSpreadsheet className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-60" />
                        <p className="text-xs font-bold text-slate-300">No blood requisitions recorded yet</p>
                        <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto">
                          Requisitions submitted from the public site or Request Blood popup will appear here in real-time.
                        </p>
                        <button
                          onClick={() => setActiveTab('blood-requests')}
                          className="mt-3 px-3.5 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-bold transition-colors cursor-pointer"
                        >
                          + View Requisitions
                        </button>
                      </div>
                    ) : (
                      requests.slice(0, 4).map((req) => (
                        <div
                          key={req.id}
                          onClick={() => {
                            setSelectedReq(req);
                            setActiveTab('blood-requests');
                          }}
                          className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-700/60 flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-white">{req.patientName}</span>
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-red-600 text-white">
                                {req.bloodGroup}
                              </span>
                              <span className="text-[10px] text-slate-400">{req.requiredUnits} unit(s)</span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5 truncate max-w-xs">
                              {req.hospitalName} • {req.contactNumber}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              req.status === 'New'
                                ? 'bg-rose-950 text-rose-400 border border-rose-800'
                                : req.status === 'Contacted'
                                ? 'bg-amber-950 text-amber-400 border border-amber-800'
                                : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            }`}
                          >
                            {req.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Recent Donor Registrations */}
                <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-400" />
                      <span>Recent Donor Registrations</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('donor-registrations')}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {donors.length === 0 ? (
                      <div className="py-8 px-4 rounded-xl bg-slate-900/40 border border-slate-700/50 text-center">
                        <Users className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-60" />
                        <p className="text-xs font-bold text-slate-300">No voluntary donors registered yet</p>
                        <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto">
                          Voluntary donors registering via the website will be securely logged and listed here.
                        </p>
                        <button
                          onClick={() => setActiveTab('donor-registrations')}
                          className="mt-3 px-3.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-colors cursor-pointer"
                        >
                          + View Donors
                        </button>
                      </div>
                    ) : (
                      donors.slice(0, 4).map((donor) => (
                        <div
                          key={donor.id}
                          onClick={() => {
                            setSelectedDonor(donor);
                            setActiveTab('donor-registrations');
                          }}
                          className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-700/60 flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-white">{donor.fullName}</span>
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-red-600 text-white">
                                {donor.bloodGroup}
                              </span>
                              <span className="text-[10px] text-slate-400">Age: {donor.age}</span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5 truncate max-w-xs">
                              {donor.cityArea} • Via {donor.preferredContactMethod}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              donor.status === 'Active'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {donor.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BLOOD REQUEST MANAGEMENT */}
          {activeTab === 'blood-requests' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-white">Blood Request Management</h2>
                  <p className="text-xs text-slate-400">
                    Review incoming requisitions, update clinical status, and track attendant contact.
                  </p>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search patient, hospital, phone..."
                    value={reqSearch}
                    onChange={(e) => setReqSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>

                <select
                  value={reqFilterGroup}
                  onChange={(e) => setReqFilterGroup(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none"
                >
                  <option value="All">All Blood Groups</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>

                <select
                  value={reqFilterUrgency}
                  onChange={(e) => setReqFilterUrgency(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none"
                >
                  <option value="All">All Urgency Levels</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Routine">Routine</option>
                </select>
              </div>

              {/* Requests Table */}
              <div className="bg-slate-800/70 border border-slate-700 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/80 text-slate-400 font-bold border-b border-slate-700 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3.5">ID / Patient</th>
                        <th className="p-3.5">Group &amp; Units</th>
                        <th className="p-3.5">Hospital</th>
                        <th className="p-3.5">Attendant &amp; Contact</th>
                        <th className="p-3.5">Urgency</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60">
                      {requests
                        .filter((r) => {
                          const matchesSearch =
                            r.patientName.toLowerCase().includes(reqSearch.toLowerCase()) ||
                            r.hospitalName.toLowerCase().includes(reqSearch.toLowerCase()) ||
                            r.contactNumber.includes(reqSearch);
                          const matchesGroup =
                            reqFilterGroup === 'All' || r.bloodGroup === reqFilterGroup;
                          const matchesUrgency =
                            reqFilterUrgency === 'All' || r.urgency === reqFilterUrgency;
                          return matchesSearch && matchesGroup && matchesUrgency;
                        })
                        .map((req) => (
                          <tr key={req.id} className="hover:bg-slate-750/50 transition-colors">
                            <td className="p-3.5">
                              <span className="font-bold text-white block">{req.patientName}</span>
                              <span className="text-[10px] text-slate-400 font-mono">#{req.id}</span>
                            </td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 rounded text-xs font-black bg-red-600 text-white">
                                {req.bloodGroup}
                              </span>
                              <span className="text-slate-300 ml-1.5">{req.requiredUnits} Unit(s)</span>
                            </td>
                            <td className="p-3.5 text-slate-300">
                              <span>{req.hospitalName}</span>
                              <span className="text-[10px] text-slate-500 block">{req.cityArea}</span>
                            </td>
                            <td className="p-3.5">
                              <span className="text-slate-200 block">{req.attendantName}</span>
                              <a
                                href={`tel:${req.contactNumber}`}
                                className="text-red-400 hover:underline font-mono"
                              >
                                {req.contactNumber}
                              </a>
                            </td>
                            <td className="p-3.5">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  req.urgency === 'Emergency'
                                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                    : req.urgency === 'Urgent'
                                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                    : 'bg-blue-950 text-blue-300 border border-blue-800'
                                }`}
                              >
                                {req.urgency}
                              </span>
                            </td>
                            <td className="p-3.5">
                              <select
                                value={req.status}
                                onChange={(e) => {
                                  BloodBankStore.updateRequestStatus(
                                    req.id,
                                    e.target.value as BloodRequest['status']
                                  );
                                  refreshAll();
                                  onToast(`Request status updated to ${e.target.value}`);
                                }}
                                className="px-2 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs font-semibold text-slate-200 focus:outline-none"
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="p-3.5 text-right space-x-2">
                              <button
                                onClick={() => setSelectedReq(req)}
                                className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200"
                                title="Open Full Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete blood request for ${req.patientName}?`)) {
                                    BloodBankStore.deleteRequest(req.id);
                                    refreshAll();
                                    onToast('Blood request deleted.');
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-red-950 hover:bg-red-900 text-red-300"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* View/Edit Request Modal */}
              {selectedReq && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
                  <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 text-slate-200 shadow-2xl relative">
                    <button
                      onClick={() => setSelectedReq(null)}
                      className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 block mb-1">
                      Requisition Details • #{selectedReq.id}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {selectedReq.patientName} ({selectedReq.bloodGroup})
                    </h3>

                    <div className="space-y-2 text-xs bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 mb-4">
                      <div><b>Hospital:</b> {selectedReq.hospitalName} ({selectedReq.cityArea})</div>
                      <div><b>Units:</b> {selectedReq.requiredUnits} Unit(s)</div>
                      <div><b>Required Date:</b> {selectedReq.requiredDate}</div>
                      <div><b>Urgency:</b> {selectedReq.urgency}</div>
                      <div><b>Attendant:</b> {selectedReq.attendantName} ({selectedReq.contactNumber})</div>
                      <div><b>Logged On:</b> {new Date(selectedReq.createdAt).toLocaleString()}</div>
                      {selectedReq.additionalInfo && (
                        <div className="pt-2 border-t border-slate-700">
                          <b>Clinical Notes / Additional Info:</b>
                          <p className="text-slate-300 mt-1 italic">{selectedReq.additionalInfo}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <a
                        href={`tel:${selectedReq.contactNumber}`}
                        className="flex-1 py-2 px-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-center text-xs font-bold"
                      >
                        Call Attendant
                      </a>
                      <a
                        href={`https://wa.me/${selectedReq.contactNumber.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-center text-xs font-bold"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DONOR MANAGEMENT */}
          {activeTab === 'donor-registrations' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div>
                <h2 className="text-xl font-extrabold text-white">Donor Registrations Management</h2>
                <p className="text-xs text-slate-400">
                  Voluntary blood donors registered locally on this system. Confidential donor records.
                </p>
              </div>

              {/* Filters */}
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search name, phone, area..."
                    value={donorSearch}
                    onChange={(e) => setDonorSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <select
                  value={donorFilterGroup}
                  onChange={(e) => setDonorFilterGroup(e.target.value)}
                  className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none"
                >
                  <option value="All">All Blood Groups</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>

              {/* Donor Table */}
              <div className="bg-slate-800/70 border border-slate-700 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/80 text-slate-400 font-bold border-b border-slate-700 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3.5">Name</th>
                        <th className="p-3.5">Blood Group</th>
                        <th className="p-3.5">Age</th>
                        <th className="p-3.5">City / Area</th>
                        <th className="p-3.5">Contact Method</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60">
                      {donors
                        .filter((d) => {
                          const matches =
                            d.fullName.toLowerCase().includes(donorSearch.toLowerCase()) ||
                            d.contactNumber.includes(donorSearch) ||
                            d.cityArea.toLowerCase().includes(donorSearch.toLowerCase());
                          const matchesGroup =
                            donorFilterGroup === 'All' || d.bloodGroup === donorFilterGroup;
                          return matches && matchesGroup;
                        })
                        .map((d) => (
                          <tr key={d.id} className="hover:bg-slate-750/50 transition-colors">
                            <td className="p-3.5">
                              <span className="font-bold text-white block">{d.fullName}</span>
                              <span className="text-[10px] text-slate-400">{d.contactNumber}</span>
                            </td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 rounded text-xs font-black bg-red-600 text-white">
                                {d.bloodGroup}
                              </span>
                            </td>
                            <td className="p-3.5 text-slate-300">{d.age} yrs</td>
                            <td className="p-3.5 text-slate-300">{d.cityArea}</td>
                            <td className="p-3.5 text-slate-300">{d.preferredContactMethod}</td>
                            <td className="p-3.5">
                              <button
                                onClick={() => {
                                  const next = d.status === 'Active' ? 'Inactive' : 'Active';
                                  BloodBankStore.updateDonorStatus(d.id, next);
                                  refreshAll();
                                  onToast(`Donor marked as ${next}`);
                                }}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                                  d.status === 'Active'
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                    : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                {d.status}
                              </button>
                            </td>
                            <td className="p-3.5 text-right space-x-2">
                              <button
                                onClick={() => setSelectedDonor(d)}
                                className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200"
                                title="View Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete donor profile for ${d.fullName}?`)) {
                                    BloodBankStore.deleteDonor(d.id);
                                    refreshAll();
                                    onToast('Donor record deleted.');
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-red-950 hover:bg-red-900 text-red-300"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* View Donor Modal */}
              {selectedDonor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
                  <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 text-slate-200 shadow-2xl relative">
                    <button
                      onClick={() => setSelectedDonor(null)}
                      className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                      Donor Profile • #{selectedDonor.id}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {selectedDonor.fullName} ({selectedDonor.bloodGroup})
                    </h3>

                    <div className="space-y-2 text-xs bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 mb-4">
                      <div><b>Phone:</b> {selectedDonor.contactNumber}</div>
                      <div><b>Age:</b> {selectedDonor.age} years</div>
                      <div><b>City / Area:</b> {selectedDonor.cityArea}</div>
                      <div><b>Last Donation Date:</b> {selectedDonor.lastDonationDate || 'Not specified / First time'}</div>
                      <div><b>Preferred Contact:</b> {selectedDonor.preferredContactMethod}</div>
                      <div><b>Registered On:</b> {new Date(selectedDonor.registeredAt).toLocaleString()}</div>
                      {selectedDonor.additionalInfo && (
                        <div className="pt-2 border-t border-slate-700">
                          <b>Notes:</b>
                          <p className="text-slate-300 mt-1 italic">{selectedDonor.additionalInfo}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={`tel:${selectedDonor.contactNumber}`}
                        className="flex-1 py-2 px-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-center text-xs font-bold"
                      >
                        Call Donor
                      </a>
                      <a
                        href={`https://wa.me/${selectedDonor.contactNumber.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-center text-xs font-bold"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CONTACT MESSAGES */}
          {activeTab === 'contact-messages' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div>
                <h2 className="text-xl font-extrabold text-white">Contact Messages</h2>
                <p className="text-xs text-slate-400">
                  Submissions through the public Contact page stored in browser localStorage.
                </p>
              </div>

              <div className="bg-slate-800/70 border border-slate-700 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 font-bold border-b border-slate-700 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5">Sender</th>
                      <th className="p-3.5">Subject</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {messages.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-750/50">
                        <td className="p-3.5">
                          <span className="font-bold text-white block">{m.name}</span>
                          <span className="text-[10px] text-slate-400">{m.phone} • {m.email}</span>
                        </td>
                        <td className="p-3.5 text-slate-300 max-w-xs truncate">{m.subject}</td>
                        <td className="p-3.5 text-slate-400 text-[11px]">
                          {new Date(m.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3.5">
                          <button
                            onClick={() => {
                              const next = m.status === 'Unread' ? 'Read' : 'Resolved';
                              BloodBankStore.updateMessageStatus(m.id, next);
                              refreshAll();
                            }}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              m.status === 'Unread'
                                ? 'bg-blue-950 text-blue-300 border border-blue-800'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {m.status}
                          </button>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => setSelectedMsg(m)}
                            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('Delete this message?')) {
                                BloodBankStore.deleteMessage(m.id);
                                refreshAll();
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-950 hover:bg-red-900 text-red-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* View Message Modal */}
              {selectedMsg && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
                  <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 text-slate-200 shadow-2xl relative">
                    <button
                      onClick={() => setSelectedMsg(null)}
                      className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <h3 className="text-lg font-bold text-white mb-2">{selectedMsg.subject}</h3>
                    <p className="text-xs text-slate-400 mb-4">
                      From: {selectedMsg.name} ({selectedMsg.phone}) • {selectedMsg.email}
                    </p>
                    <div className="bg-slate-800 p-4 rounded-xl text-xs text-slate-300 leading-relaxed mb-4">
                      {selectedMsg.message}
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`tel:${selectedMsg.phone}`}
                        className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-center text-xs font-bold"
                      >
                        Call
                      </a>
                      <a
                        href={`mailto:${selectedMsg.email}`}
                        className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-center text-xs font-bold"
                      >
                        Email
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: GALLERY MANAGEMENT (WEBSITE SLIDER) */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950/80 border border-red-800 text-[10px] font-bold text-red-300 uppercase tracking-wider mb-1.5">
                    <span>Website Carousel Slider</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-white">Gallery &amp; Slider Management</h2>
                  <p className="text-xs text-slate-400">
                    Manage the interactive photo slider shown right before the footer. Add new slides, change images, reorder sequence, and edit captions.
                  </p>
                </div>
              </div>

              {/* Add New Image Card */}
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-red-500" />
                    <span>Add New Slide to Slider</span>
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Fast image presets:
                  </span>
                </div>

                {/* Quick Presets for Image URL */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'Cold Storage', url: '/images/blood_storage.jpg', title: 'Clinical Cold Storage' },
                    { label: 'Donation Camp', url: '/images/donation_camp.jpg', title: 'Voluntary Blood Camp' },
                    { label: 'Testing Lab', url: '/images/lab_facility.jpg', title: 'Blood Transfusion Lab' },
                    { label: 'Donor Suite', url: '/images/donor_care.jpg', title: 'Voluntary Phlebotomy Lounge' },
                    { label: 'Clinical Desk', url: '/images/hero.jpg', title: 'Emergency Crossmatch Facility' },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setNewImageUrl(preset.url);
                        if (!newImageTitle) setNewImageTitle(preset.title);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-700 border border-slate-700 text-[11px] text-slate-300 transition-colors cursor-pointer"
                    >
                      + {preset.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Slide Title..."
                    value={newImageTitle}
                    onChange={(e) => setNewImageTitle(e.target.value)}
                    className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Image URL (e.g. /images/blood_storage.jpg)..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                  <select
                    value={newImageCategory}
                    onChange={(e) => setNewImageCategory(e.target.value as GalleryItem['category'])}
                    className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  >
                    <option value="Blood Donation">Blood Donation</option>
                    <option value="Blood Bank">Blood Bank</option>
                    <option value="Facilities">Facilities</option>
                    <option value="Events">Events</option>
                    <option value="Team">Team</option>
                  </select>
                  <button
                    onClick={() => {
                      if (!newImageTitle || !newImageUrl) {
                        alert('Please provide slide title and image URL');
                        return;
                      }
                      BloodBankStore.addGalleryItem({
                        title: newImageTitle,
                        caption: newImageCaption || newImageTitle,
                        imageUrl: newImageUrl,
                        category: newImageCategory,
                        order: gallery.length + 1,
                      });
                      refreshAll();
                      setNewImageTitle('');
                      setNewImageCaption('');
                      setNewImageUrl('');
                      onToast('New slide added to Website Slider!');
                    }}
                    className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Slider</span>
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Slide Caption / Description (appears on website slider)..."
                  value={newImageCaption}
                  onChange={(e) => setNewImageCaption(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>

              {/* Gallery Items Grid with Reordering & Editing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 flex flex-col justify-between shadow-sm hover:border-slate-600 transition-colors"
                  >
                    <div className="h-44 w-full bg-slate-900 relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/85 text-white border border-white/10">
                        {item.category}
                      </span>
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-600 text-white">
                        Slide #{index + 1}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="font-bold text-sm text-white">{item.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{item.caption}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                        {/* Reorder Buttons */}
                        <div className="flex items-center gap-1">
                          <button
                            disabled={index === 0}
                            onClick={() => {
                              if (index > 0) {
                                const prev = gallery[index - 1];
                                const currentOrder = item.order;
                                BloodBankStore.updateGalleryItem(item.id, { order: prev.order });
                                BloodBankStore.updateGalleryItem(prev.id, { order: currentOrder });
                                refreshAll();
                                onToast(`Moved "${item.title}" up in slider.`);
                              }
                            }}
                            className={`p-1.5 rounded-lg border text-xs ${
                              index === 0
                                ? 'opacity-30 cursor-not-allowed border-slate-800 text-slate-600'
                                : 'bg-slate-900 hover:bg-slate-700 text-slate-300 border-slate-700 cursor-pointer'
                            }`}
                            title="Move earlier in slider"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>

                          <button
                            disabled={index === gallery.length - 1}
                            onClick={() => {
                              if (index < gallery.length - 1) {
                                const next = gallery[index + 1];
                                const currentOrder = item.order;
                                BloodBankStore.updateGalleryItem(item.id, { order: next.order });
                                BloodBankStore.updateGalleryItem(next.id, { order: currentOrder });
                                refreshAll();
                                onToast(`Moved "${item.title}" down in slider.`);
                              }
                            }}
                            className={`p-1.5 rounded-lg border text-xs ${
                              index === gallery.length - 1
                                ? 'opacity-30 cursor-not-allowed border-slate-800 text-slate-600'
                                : 'bg-slate-900 hover:bg-slate-700 text-slate-300 border-slate-700 cursor-pointer'
                            }`}
                            title="Move later in slider"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Edit & Delete Action Buttons */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setEditingGalleryItem(item)}
                            className="px-2.5 py-1 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                            title="Edit Slide Information"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Remove slide "${item.title}" from the website slider?`)) {
                                BloodBankStore.deleteGalleryItem(item.id);
                                refreshAll();
                                onToast('Slide removed from website slider.');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-950 hover:bg-red-900 text-red-300 cursor-pointer"
                            title="Delete Slide"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Slide Modal */}
              {editingGalleryItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
                  <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 text-slate-200 shadow-2xl relative space-y-4">
                    <button
                      onClick={() => setEditingGalleryItem(null)}
                      className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Edit2 className="w-4 h-4 text-red-500" />
                      <span>Edit Website Slider Image</span>
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                          Slide Title
                        </label>
                        <input
                          type="text"
                          value={editingGalleryItem.title}
                          onChange={(e) =>
                            setEditingGalleryItem({ ...editingGalleryItem, title: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                          Caption / Description
                        </label>
                        <textarea
                          rows={2}
                          value={editingGalleryItem.caption}
                          onChange={(e) =>
                            setEditingGalleryItem({ ...editingGalleryItem, caption: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                          Image URL
                        </label>
                        <input
                          type="text"
                          value={editingGalleryItem.imageUrl}
                          onChange={(e) =>
                            setEditingGalleryItem({ ...editingGalleryItem, imageUrl: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                            Category
                          </label>
                          <select
                            value={editingGalleryItem.category}
                            onChange={(e) =>
                              setEditingGalleryItem({
                                ...editingGalleryItem,
                                category: e.target.value as GalleryItem['category'],
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                          >
                            <option value="Blood Donation">Blood Donation</option>
                            <option value="Blood Bank">Blood Bank</option>
                            <option value="Facilities">Facilities</option>
                            <option value="Events">Events</option>
                            <option value="Team">Team</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                            Order Position
                          </label>
                          <input
                            type="number"
                            value={editingGalleryItem.order}
                            onChange={(e) =>
                              setEditingGalleryItem({
                                ...editingGalleryItem,
                                order: parseInt(e.target.value, 10) || 1,
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                      <button
                        onClick={() => setEditingGalleryItem(null)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          BloodBankStore.updateGalleryItem(editingGalleryItem.id, editingGalleryItem);
                          refreshAll();
                          setEditingGalleryItem(null);
                          onToast('Slider image updated successfully!');
                        }}
                        className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Save Slide Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SERVICES MANAGEMENT */}
          {activeTab === 'services' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div>
                <h2 className="text-xl font-extrabold text-white">Services Editor</h2>
                <p className="text-xs text-slate-400">
                  Update service titles, short descriptions, and clinical procedures without touching code.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((svc) => (
                  <div
                    key={svc.id}
                    className="p-5 rounded-2xl bg-slate-800 border border-slate-700 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-white text-sm">{svc.title}</h3>
                      <button
                        onClick={() => setEditingService(svc)}
                        className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs font-semibold"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-xs text-slate-400">{svc.shortDescription}</p>
                    <div className="text-[11px] text-slate-500">
                      <b>Procedures:</b> {svc.points.length} registered
                    </div>
                  </div>
                ))}
              </div>

              {/* Service Edit Modal */}
              {editingService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
                  <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 text-slate-200 shadow-2xl relative space-y-4">
                    <button
                      onClick={() => setEditingService(null)}
                      className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <h3 className="text-lg font-bold text-white">Edit Service</h3>

                    <div>
                      <label className="text-xs font-bold text-slate-400 block mb-1">Title</label>
                      <input
                        type="text"
                        value={editingService.title}
                        onChange={(e) =>
                          setEditingService({ ...editingService, title: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 block mb-1">Short Description</label>
                      <textarea
                        rows={2}
                        value={editingService.shortDescription}
                        onChange={(e) =>
                          setEditingService({ ...editingService, shortDescription: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 block mb-1">Full Clinical Description</label>
                      <textarea
                        rows={3}
                        value={editingService.fullDescription}
                        onChange={(e) =>
                          setEditingService({ ...editingService, fullDescription: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                      />
                    </div>

                    <button
                      onClick={() => {
                        BloodBankStore.updateService(editingService);
                        refreshAll();
                        setEditingService(null);
                        onToast('Service updated successfully.');
                      }}
                      className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold"
                    >
                      Save Service Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: HOMEPAGE SETTINGS */}
          {activeTab === 'homepage' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-xl font-extrabold text-white">Homepage &amp; Hero Settings</h2>
                <p className="text-xs text-slate-400">
                  Configure hero headlines, call-to-actions, and supporting copy.
                </p>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                    Hero Main Heading
                  </label>
                  <input
                    type="text"
                    value={content.heroHeading}
                    onChange={(e) => setContent({ ...content, heroHeading: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                    Hero Subheading / Tagline
                  </label>
                  <input
                    type="text"
                    value={content.heroSubheading}
                    onChange={(e) => setContent({ ...content, heroSubheading: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                    Hero Supporting Text
                  </label>
                  <textarea
                    rows={3}
                    value={content.heroSupportingText}
                    onChange={(e) => setContent({ ...content, heroSupportingText: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                    Hero Image URL
                  </label>
                  <input
                    type="text"
                    value={content.heroImage}
                    onChange={(e) => setContent({ ...content, heroImage: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => handleSaveContent({
                      heroHeading: content.heroHeading,
                      heroSubheading: content.heroSubheading,
                      heroSupportingText: content.heroSupportingText,
                      heroImage: content.heroImage,
                    })}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Save Homepage Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: ABOUT US SETTINGS */}
          {activeTab === 'about-us' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-xl font-extrabold text-white">About Us Content Editor</h2>
                <p className="text-xs text-slate-400">
                  Update Mission, Vision, Donor Care, and Patient Support text.
                </p>
              </div>

              {/* Founder Profile Spotlight Shortcut */}
              <div className="bg-gradient-to-r from-red-950/60 to-slate-900 border border-red-500/30 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-red-600 text-white shadow-md">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      <span>Founder &amp; Specialist Spotlight Card</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-red-900 text-red-200 border border-red-700">SAQIB NAWAB</span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      MLT, ACLS, BLS • Blood Bank Specialist • Blood flow Foundation (FOUNDER)
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('founder-profile')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-md"
                >
                  Edit Founder &amp; Custom Background &rarr;
                </button>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Our Mission</label>
                  <textarea
                    rows={2}
                    value={content.aboutMission}
                    onChange={(e) => setContent({ ...content, aboutMission: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Our Vision</label>
                  <textarea
                    rows={2}
                    value={content.aboutVision}
                    onChange={(e) => setContent({ ...content, aboutVision: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Quality &amp; Safety</label>
                  <textarea
                    rows={2}
                    value={content.aboutQualitySafety}
                    onChange={(e) => setContent({ ...content, aboutQualitySafety: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Donor Care Protocol</label>
                  <textarea
                    rows={2}
                    value={content.aboutDonorCare}
                    onChange={(e) => setContent({ ...content, aboutDonorCare: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => handleSaveContent({
                      aboutMission: content.aboutMission,
                      aboutVision: content.aboutVision,
                      aboutQualitySafety: content.aboutQualitySafety,
                      aboutDonorCare: content.aboutDonorCare,
                    })}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl"
                  >
                    Save About Us Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8.5: FOUNDER PROFILE SETTINGS (SAQIB NAWAB) */}
          {activeTab === 'founder-profile' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-300 text-xs font-bold mb-2">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Founder &amp; Leadership Spotlight</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">Founder Profile &amp; Background Image</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Customize the Founder card for SAQIB NAWAB with your own custom background photo and credentials.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const updatedFounder: FounderProfile = {
                      name: founderName.trim() || 'SAQIB NAWAB',
                      qualifications: founderQual.trim() || 'MLT, ACLS, BLS',
                      title: founderTitle.trim() || 'Blood Bank Specialist',
                      organization: founderOrg.trim() || 'Blood flow Foundation',
                      role: founderRole.trim() || 'FOUNDER',
                      bio: founderBio.trim(),
                      backgroundImage: founderBgImage.trim() || '/images/hero.jpg',
                    };
                    handleSaveContent(
                      { founder: updatedFounder, heroImage: updatedFounder.backgroundImage },
                      'Founder details & header background picture updated successfully!'
                    );
                  }}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-2 shrink-0"
                >
                  <Award className="w-4 h-4" />
                  <span>Save Founder Settings</span>
                </button>
              </div>

              {/* LIVE PREVIEW BOX */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-red-400" />
                  <span>Live Website Preview</span>
                </span>
                <div className="rounded-3xl overflow-hidden relative shadow-2xl border border-slate-700 text-white min-h-[320px] flex items-center bg-slate-950">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                    style={{
                      backgroundImage: `url("${founderBgImage || '/images/hero.jpg'}")`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(12,46,89,0.4),transparent_70%)] pointer-events-none" />

                  <div className="relative z-10 p-6 sm:p-8 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider mb-3 shadow-xs border border-white/30">
                      <Award className="w-3 h-3 text-amber-300" />
                      <span>{founderOrg} ({founderRole})</span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-1.5 leading-tight drop-shadow-md">
                      {founderName}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-red-300 mb-3">
                      <span className="px-2 py-0.5 rounded bg-white/10 backdrop-blur-xs border border-white/30 text-white font-extrabold">
                        {founderQual}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-white drop-shadow-sm">
                        {founderTitle}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-amber-300 font-extrabold drop-shadow-sm">
                        {founderOrg} ({founderRole})
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal mb-4 max-w-xl drop-shadow-md">
                      {founderBio || 'Dedicated to clinical excellence in blood banking and emergency transfusion.'}
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-black/20 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-emerald-300">
                        <BadgeCheck className="w-3 h-3 text-emerald-400" />
                        MLT Certified
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-black/20 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-sky-300">
                        <BadgeCheck className="w-3 h-3 text-sky-400" />
                        ACLS &amp; BLS
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-black/20 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-rose-300">
                        <Shield className="w-3 h-3 text-rose-400" />
                        Blood Bank Specialist
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 1: BACKGROUND IMAGE UPLOAD & SELECTION */}
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Founder Card Background Picture</h3>
                    <p className="text-xs text-slate-400">
                      Upload your own photo from device, enter an image URL, or choose from medical presets.
                    </p>
                  </div>
                </div>

                {/* Upload Button & Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-300 block mb-2">
                      Upload Your Picture from Device
                    </label>
                    <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-600 hover:border-red-500 rounded-2xl cursor-pointer bg-slate-900/60 hover:bg-slate-900 transition-colors group">
                      <Upload className="w-8 h-8 text-slate-400 group-hover:text-red-400 mb-2 transition-colors" />
                      <span className="text-xs font-bold text-slate-200 group-hover:text-white">
                        Click to Choose Picture (JPG, PNG, WebP)
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1">
                        Image is saved directly to your browser memory
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const b64 = event.target?.result as string;
                            if (b64) {
                              setFounderBgImage(b64);
                              onToast('Background photo loaded! Click Save to apply.');
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase text-slate-300 block mb-2">
                      Or Enter Image URL
                    </label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={founderBgImage}
                        onChange={(e) => setFounderBgImage(e.target.value)}
                        placeholder="e.g. /images/hero.jpg or https://..."
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                      />
                      <p className="text-[11px] text-slate-400">
                        Paste any online photo link or local path.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Preset Options */}
                <div>
                  <label className="text-xs font-bold uppercase text-slate-300 block mb-2">
                    Or Select A Preset Medical / Laboratory Background:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {[
                      { name: 'Transfusion Suite', url: '/images/hero.jpg' },
                      { name: 'Cold Storage Units', url: '/images/blood_storage.jpg' },
                      { name: 'Testing Lab', url: '/images/lab_facility.jpg' },
                      { name: 'Donation Camp Drive', url: '/images/donation_camp.jpg' },
                      { name: 'Donor Care Suite', url: '/images/donor_care.jpg' },
                    ].map((preset) => (
                      <button
                        key={preset.url}
                        type="button"
                        onClick={() => {
                          setFounderBgImage(preset.url);
                          onToast(`Selected preset: ${preset.name}`);
                        }}
                        className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                          founderBgImage === preset.url
                            ? 'border-red-500 bg-red-950/40 ring-1 ring-red-500'
                            : 'border-slate-700 bg-slate-900/60 hover:bg-slate-900'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-14 object-cover rounded-lg mb-1.5"
                        />
                        <span className="text-[10px] font-semibold text-slate-300 block truncate">
                          {preset.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* CARD 2: TEXT & CREDENTIALS FIELDS */}
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Founder Credentials &amp; Titles</h3>
                    <p className="text-xs text-slate-400">
                      Configure the exact names, certifications, and leadership roles shown in the spotlight.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-300 block mb-1">
                      Founder Name
                    </label>
                    <input
                      type="text"
                      value={founderName}
                      onChange={(e) => setFounderName(e.target.value)}
                      placeholder="SAQIB NAWAB"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase text-slate-300 block mb-1">
                      Credentials &amp; Qualifications
                    </label>
                    <input
                      type="text"
                      value={founderQual}
                      onChange={(e) => setFounderQual(e.target.value)}
                      placeholder="MLT, ACLS, BLS"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase text-slate-300 block mb-1">
                      Specialist Title
                    </label>
                    <input
                      type="text"
                      value={founderTitle}
                      onChange={(e) => setFounderTitle(e.target.value)}
                      placeholder="Blood Bank Specialist"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase text-slate-300 block mb-1">
                      Foundation / Organization
                    </label>
                    <input
                      type="text"
                      value={founderOrg}
                      onChange={(e) => setFounderOrg(e.target.value)}
                      placeholder="Blood flow Foundation"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase text-slate-300 block mb-1">
                      Role / Designation
                    </label>
                    <input
                      type="text"
                      value={founderRole}
                      onChange={(e) => setFounderRole(e.target.value)}
                      placeholder="FOUNDER"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-300 block mb-1">
                    Bio &amp; Leadership Statement
                  </label>
                  <textarea
                    rows={3}
                    value={founderBio}
                    onChange={(e) => setFounderBio(e.target.value)}
                    placeholder="Leadership message and commitment to transfusion safety..."
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      const updatedFounder: FounderProfile = {
                        name: founderName.trim() || 'SAQIB NAWAB',
                        qualifications: founderQual.trim() || 'MLT, ACLS, BLS',
                        title: founderTitle.trim() || 'Blood Bank Specialist',
                        organization: founderOrg.trim() || 'Blood flow Foundation',
                        role: founderRole.trim() || 'FOUNDER',
                        bio: founderBio.trim(),
                        backgroundImage: founderBgImage.trim() || '/images/hero.jpg',
                      };
                      handleSaveContent(
                        { founder: updatedFounder, heroImage: updatedFounder.backgroundImage },
                        'Founder details & header background picture updated successfully!'
                      );
                    }}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Save Founder Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: BLOOD AVAILABILITY SETTINGS */}
          {activeTab === 'blood-availability' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-xl font-extrabold text-white">Blood Availability Message Settings</h2>
                <p className="text-xs text-slate-400">
                  Staff does not manage daily stock numbers. Edit the verification notice shown across all 8 blood groups.
                </p>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/50 text-xs text-amber-300">
                  <b>Clinical Stock Policy:</b> To prevent clinical misinformation, individual bag counts and live stock meters are intentionally excluded. All availability must be confirmed directly.
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                    Availability Notice Text
                  </label>
                  <textarea
                    rows={3}
                    value={content.availabilityNotice}
                    onChange={(e) => setContent({ ...content, availabilityNotice: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleSaveContent({ availabilityNotice: content.availabilityNotice })}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl"
                  >
                    Save Availability Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: CONTACT SETTINGS */}
          {activeTab === 'contact-settings' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-xl font-extrabold text-white">Contact &amp; Facility Settings</h2>
                <p className="text-xs text-slate-400">
                  Update facility address, hotlines, and email addresses.
                </p>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Physical Address</label>
                  <input
                    type="text"
                    value={content.address}
                    onChange={(e) => setContent({ ...content, address: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Hotline / Telephone</label>
                    <input
                      type="text"
                      value={content.phone}
                      onChange={(e) => setContent({ ...content, phone: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Official Email</label>
                    <input
                      type="email"
                      value={content.email}
                      onChange={(e) => setContent({ ...content, email: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleSaveContent({
                      address: content.address,
                      phone: content.phone,
                      email: content.email,
                      emergencyHotline: content.phone,
                    })}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl"
                  >
                    Save Contact Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: SOCIAL MEDIA */}
          {activeTab === 'social-media' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-xl font-extrabold text-white">Social Media Links</h2>
                <p className="text-xs text-slate-400">
                  Links left blank will automatically hide the corresponding icon in the public footer.
                </p>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Facebook URL</label>
                  <input
                    type="text"
                    value={content.socialLinks?.facebook || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        socialLinks: { ...content.socialLinks, facebook: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Instagram URL</label>
                  <input
                    type="text"
                    value={content.socialLinks?.instagram || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        socialLinks: { ...content.socialLinks, instagram: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-300 block mb-1">WhatsApp URL / Number</label>
                  <input
                    type="text"
                    value={content.socialLinks?.whatsapp || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        socialLinks: { ...content.socialLinks, whatsapp: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-300 block mb-1">YouTube URL</label>
                  <input
                    type="text"
                    value={content.socialLinks?.youtube || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        socialLinks: { ...content.socialLinks, youtube: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleSaveContent({ socialLinks: content.socialLinks })}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl"
                  >
                    Save Social Media Links
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: LOGO & BRANDING */}
          {activeTab === 'logo-branding' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-xl font-extrabold text-white">Logo &amp; Branding</h2>
                <p className="text-xs text-slate-400">
                  Preview and manage official vector emblems and brand typography.
                </p>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-300 mb-3">Live Logo Previews</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-6 bg-white rounded-xl flex items-center justify-center border border-slate-300">
                      <Logo variant="full" size="md" />
                    </div>
                    <div className="p-6 bg-[#071629] rounded-xl flex items-center justify-center border border-slate-700">
                      <Logo variant="full" size="md" inverted={true} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Website Brand Name</label>
                  <input
                    type="text"
                    value={content.brandName}
                    onChange={(e) => setContent({ ...content, brandName: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Brand Tagline</label>
                  <input
                    type="text"
                    value={content.tagline}
                    onChange={(e) => setContent({ ...content, tagline: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleSaveContent({ brandName: content.brandName, tagline: content.tagline })}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl"
                  >
                    Save Branding Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: THEME & COLORS */}
          {activeTab === 'theme-colors' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-xl font-extrabold text-white">Theme &amp; Colors Customizer</h2>
                <p className="text-xs text-slate-400">
                  Fine-tune brand accents, rounded border radiuses, and button styles.
                </p>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Primary Color (Red)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={content.theme?.primaryColor || '#c4122f'}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            theme: { ...content.theme, primaryColor: e.target.value },
                          })
                        }
                        className="w-10 h-10 rounded-lg cursor-pointer bg-transparent"
                      />
                      <span className="text-xs font-mono text-slate-300">{content.theme?.primaryColor || '#c4122f'}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Secondary Color (Navy)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={content.theme?.secondaryColor || '#0c2e59'}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            theme: { ...content.theme, secondaryColor: e.target.value },
                          })
                        }
                        className="w-10 h-10 rounded-lg cursor-pointer bg-transparent"
                      />
                      <span className="text-xs font-mono text-slate-300">{content.theme?.secondaryColor || '#0c2e59'}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Border Radius</label>
                    <select
                      value={content.theme?.borderRadius || 'rounded-xl'}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          theme: { ...content.theme, borderRadius: e.target.value as any },
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    >
                      <option value="rounded-lg">Slight (Rounded-LG)</option>
                      <option value="rounded-xl">Standard (Rounded-XL)</option>
                      <option value="rounded-2xl">Modern Soft (Rounded-2XL)</option>
                    </select>
                  </div>
                </div>

                {/* Theme Mode Option */}
                <div className="pt-2 border-t border-slate-700">
                  <label className="text-xs font-bold uppercase text-slate-300 block mb-2">Website &amp; Admin Theme Mode</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setContent({
                          ...content,
                          theme: { ...content.theme, mode: 'light' },
                        })
                      }
                      className={`flex-1 p-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        content.theme?.mode !== 'dark'
                          ? 'bg-red-600/20 border-red-500 text-white font-bold ring-1 ring-red-500'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span>White (Light) Theme</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setContent({
                          ...content,
                          theme: { ...content.theme, mode: 'dark' },
                        })
                      }
                      className={`flex-1 p-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        content.theme?.mode === 'dark'
                          ? 'bg-red-600/20 border-red-500 text-white font-bold ring-1 ring-red-500'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Moon className="w-4 h-4 text-blue-400" />
                      <span>Dark Theme</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setContent({
                        ...content,
                        theme: {
                          primaryColor: '#c4122f',
                          secondaryColor: '#0c2e59',
                          accentColor: '#e11d48',
                          borderRadius: 'rounded-xl',
                          buttonStyle: 'gradient',
                          mode: 'light',
                        },
                      });
                      onToast('Theme reset to clinical default.');
                    }}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold rounded-xl"
                  >
                    Reset Defaults
                  </button>

                  <button
                    onClick={() => handleSaveContent({ theme: content.theme })}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl"
                  >
                    Apply &amp; Save Theme
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 14: WEBSITE CONTENT GENERAL */}
          {activeTab === 'website-content' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-xl font-extrabold text-white">Full Website Content</h2>
                <p className="text-xs text-slate-400">
                  Global copy, emergency banner alert, footer text, and hotline prompts.
                </p>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-300 block mb-1">
                    Emergency Headline Message
                  </label>
                  <input
                    type="text"
                    value={content.emergencyMessage}
                    onChange={(e) => setContent({ ...content, emergencyMessage: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-300 block mb-1">
                    Footer General Summary
                  </label>
                  <textarea
                    rows={3}
                    value={content.footerText}
                    onChange={(e) => setContent({ ...content, footerText: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-300 block mb-1">
                    WhatsApp Blood Request Pre-fill
                  </label>
                  <input
                    type="text"
                    value={content.whatsappMessageRequest}
                    onChange={(e) =>
                      setContent({ ...content, whatsappMessageRequest: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleSaveContent({
                      emergencyMessage: content.emergencyMessage,
                      footerText: content.footerText,
                      whatsappMessageRequest: content.whatsappMessageRequest,
                    })}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl"
                  >
                    Save All Content
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 15: ADMIN SETTINGS & RESET */}
          {activeTab === 'admin-settings' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-xl font-extrabold text-white">Admin System &amp; Data Settings</h2>
                <p className="text-xs text-slate-400">
                  Manage local browser storage, reset demo data, and review frontend architecture.
                </p>
              </div>

              {/* Data Status Card */}
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="font-bold text-sm text-white">Frontend-Only Local Storage Engine</h3>
                    <p className="text-xs text-slate-400">
                      All records are maintained securely in your browser's persistent localStorage.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 bg-slate-900 rounded-xl">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Requests</span>
                    <span className="text-lg font-black text-white">{requests.length}</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Donors</span>
                    <span className="text-lg font-black text-white">{donors.length}</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Messages</span>
                    <span className="text-lg font-black text-white">{messages.length}</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Gallery</span>
                    <span className="text-lg font-black text-white">{gallery.length}</span>
                  </div>
                </div>
              </div>

              {/* Data Management: Clear Activity Records */}
              <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-200">Purge Activity Records</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Clear all submitted blood requisitions and registered donors without reloading any demo data. Your website customization and founder settings will remain completely intact.
                  </p>
                </div>

                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-300 font-bold text-xs rounded-xl border border-slate-600 hover:border-red-700 transition-colors cursor-pointer"
                >
                  Clear All Submitted Records
                </button>
              </div>

              {/* Reset Confirmation Modal */}
              {showResetConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
                  <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 text-slate-200 shadow-2xl space-y-4">
                    <h4 className="text-base font-bold text-white">Clear All Submitted Records?</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      This will delete all submitted requisitions, registered donors, and contact messages. No demo data will be injected.
                    </p>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        onClick={() => setShowResetConfirm(false)}
                        className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          BloodBankStore.clearAllRecords();
                          refreshAll();
                          setShowResetConfirm(false);
                          onToast('All activity records cleared.');
                        }}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Clear Records
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
