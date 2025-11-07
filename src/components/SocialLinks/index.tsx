import { motion } from "motion/react";
import { Zap, Twitch, MessageCircle, Youtube, ExternalLink, Facebook, Music, Instagram } from "lucide-react";
import { useSiteData } from "../../contexts/DataContext";

const iconMap: Record<string, any> = {
  Zap,
  Twitch,
  MessageCircle,
  Youtube,
  Facebook,
  Music, // TikTok
  Instagram,
};

export function SocialLinks() {
  const { siteData } = useSiteData();
  const links = siteData.socialLinks;

  return (
    <section id="social-links" className="py-20 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00ff7f]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-white mb-4">Conéctate Conmigo</h2>
          <p className="text-white/60 text-xl">Sígueme en todas mis redes sociales</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {links.map((link, index) => {
            const Icon = iconMap[link.icon];
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative bg-[#1a1a1a] border-2 border-[#00ff7f]/20 rounded-xl p-6 text-center hover:border-[#00ff7f] transition-all duration-300 overflow-hidden"
              >
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff7f]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-[#0a0a0a] border-2 border-[#00ff7f]/30 group-hover:border-[#00ff7f] transition-colors duration-300">
                    {Icon && <Icon size={32} className="text-[#00ff7f]" />}
                  </div>
                  <h3 className="text-white mb-2">{link.name}</h3>
                  <div className="flex items-center justify-center gap-2 text-[#00ff7f] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm">Visitar</span>
                    <ExternalLink size={16} />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-white/80 text-xl">¡Únete a la comunidad más divertida!</p>
        </motion.div>
      </div>
    </section>
  );
}