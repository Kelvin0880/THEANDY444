import { Home, User, Video, Calendar, Share2, Megaphone, LogOut, ExternalLink, Sword } from 'lucide-react';
import { useRouter } from '../../../contexts/RouterContext';
import { clearAuthToken } from '../../../utils/auth';
import { SIDEBAR_CONSTANTS } from './constants';
import andyLogo from "figma:asset/c86ccb4e1e7532d858cdb990dbcac7534ebc2d3c.png";

const iconMap: Record<string, any> = {
  Home,
  Sword,
  User,
  Video,
  Calendar,
  Share2,
  Megaphone,
};

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function DashboardSidebar({ activeSection, onSectionChange }: DashboardSidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    clearAuthToken();
    router.push('/admin-login');
  };

  const handleViewSite = () => {
    router.push('/');
  };

  return (
    <div className="w-64 bg-[#1a1a1a] border-r border-[#00ff7f]/20 min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[#00ff7f]/20">
        <div className="flex items-center gap-3 mb-2">
          <img
            src={andyLogo}
            alt={SIDEBAR_CONSTANTS.subtitle}
            className="h-10 w-auto"
          />
        </div>
        <h2 className="text-[#00ff7f]">{SIDEBAR_CONSTANTS.title}</h2>
        <p className="text-white/60 text-sm">{SIDEBAR_CONSTANTS.subtitle}</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {SIDEBAR_CONSTANTS.menuItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-[#00ff7f] text-black'
                      : 'text-white/70 hover:bg-[#00ff7f]/10 hover:text-[#00ff7f]'
                  }`}
                >
                  {Icon && <Icon size={20} />}
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-[#00ff7f]/20 space-y-2">
        <button
          onClick={handleViewSite}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-[#00ff7f]/30 text-[#00ff7f] rounded-lg hover:bg-[#00ff7f]/10 transition-all duration-300"
        >
          <ExternalLink size={18} />
          <span className="text-sm">{SIDEBAR_CONSTANTS.viewSiteButton}</span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-all duration-300"
        >
          <LogOut size={18} />
          <span className="text-sm">{SIDEBAR_CONSTANTS.logoutButton}</span>
        </button>
      </div>
    </div>
  );
}