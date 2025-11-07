import { motion } from "motion/react";
import { Play } from "lucide-react";
import { useSiteData } from "../../contexts/DataContext";

export function VideoSection() {
  const { siteData } = useSiteData();
  const video = siteData.featuredVideo;

  return (
    <section id="videos" className="py-20 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Play className="text-[#00ff7f]" size={32} />
            <h2 className="text-white">
              {video.title}
            </h2>
          </div>
          <p className="text-white/60 text-xl">Featured Clip</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Video Container */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#00ff7f]/30 shadow-[0_0_50px_rgba(0,255,127,0.2)] mb-8">
            <div className="relative pb-[56.25%]">
              <iframe
                src={video.embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
          </div>

          {/* Video Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-white/80 mb-6">
              {video.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://www.youtube.com/@theandy4"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="px-8 py-3 bg-[#00ff7f] text-black rounded-lg hover:bg-[#00ff99] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,127,0.5)]"
              >
                Más Videos
              </motion.a>
              <motion.a
                href="https://www.youtube.com/@theandy4?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="px-8 py-3 border-2 border-[#00ff7f] text-[#00ff7f] rounded-lg hover:bg-[#00ff7f] hover:text-black transition-all duration-300"
              >
                Suscríbete
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}