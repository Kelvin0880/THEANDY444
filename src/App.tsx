import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { DataProvider } from "./contexts/DataContext";
import { RouterProvider, useRouter } from "./contexts/RouterContext";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ZoroversionMarimo } from "./components/ZoroversionMarimo";
import { ZoroFloatingMini } from "./components/ZoroFloatingMini";
import { AboutSection } from "./components/AboutSection";
import { VideoSection } from "./components/VideoSection";
import { StreamSchedule } from "./components/StreamSchedule";
import { SocialLinks } from "./components/SocialLinks";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { AdminLogin } from "./components/Admin/Login";
import { AdminDashboard } from "./components/Admin/Dashboard";

function AppContent() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Shift + Ctrl + A to access admin login
      if (e.shiftKey && e.ctrlKey && e.key === 'A') {
        e.preventDefault();
        router.push('/admin-login');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [router]);

  // Route rendering
  if (router.currentPath === '/admin-login') {
    return <AdminLogin />;
  }

  if (router.currentPath === '/admin-dashboard') {
    return <AdminDashboard />;
  }

  // Home page
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <HeroSection />
        <ZoroversionMarimo />
        <AboutSection />
        <VideoSection />
        <StreamSchedule />
        <SocialLinks />
        <CTASection />
      </main>
      <Footer />
      <ZoroFloatingMini />
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #00ff7f',
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </RouterProvider>
  );
}