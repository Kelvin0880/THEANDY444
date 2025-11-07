import { Heart, Zap, Twitch, MessageCircle, Youtube } from "lucide-react";
import { FOOTER_CONSTANTS } from "./constants";
import andyLogo from "figma:asset/c86ccb4e1e7532d858cdb990dbcac7534ebc2d3c.png";

const iconMap: Record<string, any> = {
  Zap,
  Twitch,
  MessageCircle,
  Youtube,
};

export function Footer() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-black border-t border-[#00ff7f]/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={andyLogo}
                alt={FOOTER_CONSTANTS.siteName}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-white/60 mb-4 max-w-md">{FOOTER_CONSTANTS.tagline}</p>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <span>{FOOTER_CONSTANTS.madeWith}</span>
              <span>desde {FOOTER_CONSTANTS.country}</span>
            </div>
          </div>

          {/* Navigation Section */}
          <div>
            <h3 className="text-white mb-4">{FOOTER_CONSTANTS.sections.navigation}</h3>
            <ul className="space-y-2">
              {FOOTER_CONSTANTS.navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-white/60 hover:text-[#00ff7f] transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-white mb-4">{FOOTER_CONSTANTS.sections.social}</h3>
            <div className="flex flex-col gap-3">
              {FOOTER_CONSTANTS.socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/60 hover:text-[#00ff7f] transition-colors duration-300"
                  >
                    {Icon && <Icon size={18} />}
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-[#00ff7f]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">{FOOTER_CONSTANTS.copyright}</p>
            <div className="flex gap-4">
              {FOOTER_CONSTANTS.legalLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-white/50 hover:text-[#00ff7f] text-sm transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
