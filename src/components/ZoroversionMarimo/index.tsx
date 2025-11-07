'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Sword } from 'lucide-react';
import { useSiteData } from '../../contexts/DataContext';
import { ZORO_CONSTANTS } from './constants';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function ZoroversionMarimo() {
  const { siteData } = useSiteData();
  const [isHovered, setIsHovered] = useState(false);
  
  const zoroData = siteData.zoroSection || {
    title: ZORO_CONSTANTS.defaultTitle,
    subtitle: ZORO_CONSTANTS.defaultSubtitle,
    description: ZORO_CONSTANTS.defaultDescription,
    image: ZORO_CONSTANTS.defaultImage,
    themeColor: ZORO_CONSTANTS.defaultThemeColor,
    enabled: true
  };

  // Don't render if disabled
  if (!zoroData.enabled) return null;

  return (
    <section className="relative py-20 md:py-32 bg-black overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00ff7f]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00ff99]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#00ff7f]/10 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Katana Animation (Optional decorative element) */}
      <motion.div
        initial={{ x: -100, opacity: 0, rotate: -45 }}
        whileInView={{ x: 0, opacity: 0.1, rotate: -45 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute top-10 right-10 hidden lg:block"
      >
        <Sword size={120} className="text-[#00ff7f]/20" strokeWidth={1} />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Section with Glow Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: ZORO_CONSTANTS.animationDuration, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-1 flex justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative group">
              {/* Glow effect container */}
              <motion.div
                animate={{
                  boxShadow: isHovered 
                    ? `0 0 60px ${ZORO_CONSTANTS.glowIntensity}, 0 0 100px rgba(0, 255, 127, 0.2)`
                    : `0 0 40px rgba(0, 255, 127, 0.2), 0 0 80px rgba(0, 255, 127, 0.1)`
                }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden border-2 border-[#00ff7f]/30"
              >
                <ImageWithFallback
                  src={zoroData.image}
                  alt={zoroData.title}
                  className="w-full h-auto max-w-[280px] md:max-w-[400px] object-contain"
                />
                
                {/* Pulsating overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 0.1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-[#00ff7f]"
                />
              </motion.div>

              {/* Floating animation effect */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 pointer-events-none"
              />

              {/* Tooltip on hover */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border-2 border-[#00ff7f]/50 px-4 py-2 rounded-lg whitespace-nowrap"
                >
                  <p className="text-[#00ff7f] text-sm">{ZORO_CONSTANTS.tooltip}</p>
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-[#00ff7f]/50"></div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: ZORO_CONSTANTS.animationDuration, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-[#00ff7f] mb-4 tracking-wider uppercase text-sm"
            >
              {zoroData.subtitle}
            </motion.p>

            {/* Title with Neon Effect */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-white mb-6 relative inline-block"
              style={{
                textShadow: '0 0 20px rgba(0, 255, 127, 0.5), 0 0 40px rgba(0, 255, 127, 0.3)'
              }}
            >
              {zoroData.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-white/80 mb-8 max-w-xl leading-relaxed"
            >
              {zoroData.description}
            </motion.p>

            {/* CTA Button */}
            <motion.a
              href="#social-links"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-[#00ff7f] text-black px-6 py-3 rounded-lg hover:bg-[#00ff99] transition-all duration-300 shadow-[0_0_20px_rgba(0,255,127,0.3)] hover:shadow-[0_0_30px_rgba(0,255,127,0.5)]"
            >
              <Sword size={20} />
              <span>{ZORO_CONSTANTS.ctaText}</span>
            </motion.a>

            {/* Decorative Elements */}
            <div className="mt-12 flex gap-4 justify-center lg:justify-start">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="w-16 h-1 bg-gradient-to-r from-[#00ff7f] to-transparent rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff7f]/50 to-transparent"></div>
    </section>
  );
}
