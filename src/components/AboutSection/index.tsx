import { motion } from "motion/react";
import { useSiteData } from "../../contexts/DataContext";
import bannerImage from "figma:asset/b650146f7a57d4e9b683697040fb002a6823df18.png";

export function AboutSection() {
  const { siteData } = useSiteData();
  const about = siteData.about;

  return (
    <section id="about" className="py-20 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00ff7f]/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-white mb-4 relative inline-block">
            {about.sectionTitle}
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00ff7f] to-transparent"></div>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#00ff7f]/30 shadow-[0_0_30px_rgba(0,255,127,0.2)]">
              <img
                src={bannerImage}
                alt={about.imageAlt}
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-[#00ff7f] mb-2">{about.name}</h3>
            <p className="text-xl text-white/60 mb-4">{about.title}</p>
            <p className="text-white/80 mb-6">{about.country}</p>
            
            <div className="space-y-4 mb-8">
              {about.bio.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-white/70"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {about.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#1a1a1a] border border-[#00ff7f]/20 rounded-lg p-4 text-center hover:border-[#00ff7f]/50 transition-all duration-300"
                >
                  <div className="text-2xl text-[#00ff7f] mb-1">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}