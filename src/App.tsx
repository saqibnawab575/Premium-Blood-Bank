import React, { useState, useEffect } from 'react';
import { BloodBankStore } from './services/store';
import { WebsiteContent, AdminUser } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BloodAvailability } from './components/BloodAvailability';
import { ServicesSection } from './components/ServicesSection';
import { AboutUs } from './components/AboutUs';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingRequestBlood } from './components/FloatingRequestBlood';
import { ToastContainer, ToastMessage } from './components/Toast';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const [content, setContent] = useState<WebsiteContent>(BloodBankStore.getContent());
  const [services, setServices] = useState(BloodBankStore.getServices());
  const [gallery, setGallery] = useState(BloodBankStore.getGallery());

  // Active section for navigation highlight
  const [activeSection, setActiveSection] = useState('home');

  // Admin Auth state
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync state when store updates
  useEffect(() => {
    const handleStoreUpdate = () => {
      setContent(BloodBankStore.getContent());
      setServices(BloodBankStore.getServices());
      setGallery(BloodBankStore.getGallery());
      setAdminUser(BloodBankStore.getAdminSession());
    };

    window.addEventListener('pbb_store_update', handleStoreUpdate);
    return () => window.removeEventListener('pbb_store_update', handleStoreUpdate);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (isAdminDashboardOpen) {
      setIsAdminDashboardOpen(false);
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenAdmin = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    setIsAdminDashboardOpen(true);
    addToast('Welcome Administrator', `Signed in as ${user.name}`);
  };

  const handleAdminLogout = () => {
    BloodBankStore.logoutAdmin();
    setAdminUser(null);
    setIsAdminDashboardOpen(false);
    addToast('Logged Out', 'Administrator session ended.');
  };

  const handleToggleTheme = () => {
    const currentMode = content.theme?.mode || 'light';
    const nextMode: 'light' | 'dark' = currentMode === 'dark' ? 'light' : 'dark';
    const updatedTheme: WebsiteContent['theme'] = {
      ...content.theme,
      mode: nextMode,
    };
    BloodBankStore.updateContent({ theme: updatedTheme });
    setContent((prev) => ({ ...prev, theme: updatedTheme }));
    addToast('Theme Updated', `Switched to ${nextMode === 'dark' ? 'Dark' : 'White (Light)'} theme mode.`);
  };

  const isDarkMode = content.theme?.mode === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 selection:bg-[#c4122f] selection:text-white ${
        isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Sticky Header with Navigation, Hotline and Admin Login */}
      <Navbar
        content={content}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenAdmin={handleOpenAdmin}
        isAdminLoggedIn={!!adminUser}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Website Sections */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <div id="home">
          <Hero content={content} onNavigate={handleNavigate} />
        </div>

        {/* Section 2: Blood Availability (Direct confirmation with all 8 blood groups) */}
        <BloodAvailability
          content={content}
          onNavigateToContact={() => handleNavigate('contact')}
        />

        {/* Section 3: Clinical Services */}
        <ServicesSection
          services={services}
          onContactFacility={() => handleNavigate('contact')}
        />

        {/* Section 4: About Us */}
        <AboutUs content={content} />

        {/* Section 5: Photo Gallery */}
        <GallerySection items={gallery} />

        {/* Section 6: Contact & Facility Desk */}
        <ContactSection
          content={content}
          onSuccessToast={(msg) => addToast('Message Sent', msg)}
        />
      </main>

      {/* Footer */}
      <Footer
        content={content}
        onNavigate={handleNavigate}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Floating Action Button: Replaced WhatsApp with "Request Blood" popup & direct desk */}
      <FloatingRequestBlood content={content} />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Admin Dashboard */}
      {isAdminDashboardOpen && adminUser && (
        <AdminDashboard
          user={adminUser}
          onClose={() => setIsAdminDashboardOpen(false)}
          onLogout={handleAdminLogout}
          onToast={(msg) => addToast('Dashboard Update', msg)}
        />
      )}

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
