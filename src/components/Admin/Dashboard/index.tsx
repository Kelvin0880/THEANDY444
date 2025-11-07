import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useRouter } from '../../../contexts/RouterContext';
import { isAuthenticated } from '../../../utils/auth';
import { DashboardSidebar } from '../DashboardSidebar';
import { HeroForm } from '../EditForms/HeroForm';
import { AboutForm } from '../EditForms/AboutForm';
import { VideoForm } from '../EditForms/VideoForm';
import { ScheduleForm } from '../EditForms/ScheduleForm';
import { SocialForm } from '../EditForms/SocialForm';
import { CTAForm } from '../EditForms/CTAForm';
import { ZoroForm } from '../EditForms/ZoroForm';

export function AdminDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin-login');
    }
  }, [router]);

  const renderForm = () => {
    switch (activeSection) {
      case 'hero':
        return <HeroForm />;
      case 'zoro':
        return <ZoroForm />;
      case 'about':
        return <AboutForm />;
      case 'video':
        return <VideoForm />;
      case 'schedule':
        return <ScheduleForm />;
      case 'social':
        return <SocialForm />;
      case 'cta':
        return <CTAForm />;
      default:
        return <HeroForm />;
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <DashboardSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-8">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderForm()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}