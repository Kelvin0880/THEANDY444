import { motion } from "motion/react";
import { MessageCircle, Zap, Users, Gift, Star } from "lucide-react";
import { useSiteData } from "../../contexts/DataContext";

const iconMap: Record<string, any> = {
  MessageCircle,
  Zap,
  Users,
  Gift,
  Star,
};

export function CTASection() {
  const { siteData } = useSiteData();
  const cta = siteData.cta;

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-[#1a1a1a] via-[#0a0a0a] to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00ff7f]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00ff7f]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-white mb-4">{cta.title}</h2>
          <p className="text-xl text-[#00ff7f] mb-4">{cta.subtitle}</p>
          <p className="text-white/70 max-w-2xl mx-auto">{cta.description}</p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {cta.features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#1a1a1a] border border-[#00ff7f]/20 rounded-xl p-6 text-center hover:border-[#00ff7f]/50 transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#00ff7f]/10 flex items-center justify-center">
                {index === 0 && <Users className="text-[#00ff7f]" size={24} />}
                {index === 1 && <Star className="text-[#00ff7f]" size={24} />}
                {index === 2 && <Gift className="text-[#00ff7f]" size={24} />}
              </div>
              <h3 className="text-white mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {cta.buttons.map((button, index) => {
            const Icon = iconMap[button.icon];
            return (
              <motion.a
                key={button.text}
                href={button.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={
                  button.variant === "primary"
                    ? "flex items-center gap-2 px-8 py-4 bg-[#00ff7f] text-black rounded-lg hover:bg-[#00ff99] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,127,0.5)] text-lg"
                    : "flex items-center gap-2 px-8 py-4 border-2 border-[#00ff7f] text-[#00ff7f] rounded-lg hover:bg-[#00ff7f] hover:text-black transition-all duration-300 text-lg"
                }
              >
                {Icon && <Icon size={20} />}
                {button.text}
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}