import { motion } from "motion/react";
import { useSiteData } from "../../contexts/DataContext";
import andyLogo from "figma:asset/c86ccb4e1e7532d858cdb990dbcac7534ebc2d3c.png";

export function HeroSection() {
  const { siteData } = useSiteData();
  const hero = siteData.hero;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-black to-[#0a0a0a]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ff7f]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00ff99]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white mb-4"
            >
              {hero.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-6"
            >
              <span className="text-[#00ff7f] text-5xl md:text-7xl" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {hero.highlightText}
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/80 mb-4"
            >
              {hero.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white/60 mb-8"
            >
              {hero.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <a
                href={hero.primaryButton.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#00ff7f] text-black rounded-lg hover:bg-[#00ff99] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,127,0.5)] hover:scale-105"
              >
                {hero.primaryButton.text}
              </a>
              <a
                href={hero.secondaryButton.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-[#00ff7f] text-[#00ff7f] rounded-lg hover:bg-[#00ff7f] hover:text-black transition-all duration-300"
              >
                {hero.secondaryButton.text}
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src={andyLogo}
                alt={hero.imageAlt}
                className="w-full max-w-md mx-auto drop-shadow-[0_0_50px_rgba(0,255,127,0.5)]"
              />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[#00ff7f]/20 blur-3xl rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}