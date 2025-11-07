'use client';

import { motion } from 'motion/react';
import { useSiteData } from '../../contexts/DataContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

/**
 * Mini versión flotante de Zoroversionmarimo
 * Aparece en la esquina inferior derecha como un easter egg
 */
export function ZoroFloatingMini() {
  const { siteData } = useSiteData();
  
  const zoroData = siteData.zoroSection || {
    image: "/assets/Zoroversionmarimo.png",
    enabled: true
  };

  // Don't render if disabled
  if (!zoroData.enabled) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: 100, y: 100 }}
      animate={{ opacity: 0.3, scale: 1, x: 0, y: 0 }}
      transition={{ 
        duration: 1,
        delay: 2,
        ease: "easeOut"
      }}
      whileHover={{ 
        opacity: 1, 
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
      className="fixed bottom-4 right-4 z-40 pointer-events-auto cursor-pointer"
    >
      {/* Floating animation */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Glow effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#00ff7f]/20 rounded-full blur-xl"></div>
          
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-[#00ff7f]/30 hover:border-[#00ff7f] transition-all duration-300">
            <ImageWithFallback
              src={zoroData.image}
              alt="Zoroversionmarimo Mini"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* Tooltip on hover */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute bottom-full right-0 mb-2 bg-[#1a1a1a] border-2 border-[#00ff7f]/50 px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none"
      >
        <p className="text-[#00ff7f] text-xs">Zoroversionmarimo 🗡️</p>
        <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#00ff7f]/50"></div>
      </motion.div>
    </motion.div>
  );
}
