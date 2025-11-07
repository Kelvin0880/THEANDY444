import { motion } from "motion/react";
import { Calendar, Clock, Gamepad2 } from "lucide-react";
import { useSiteData } from "../../contexts/DataContext";

export function StreamSchedule() {
  const { siteData } = useSiteData();
  const schedule = siteData.schedule;

  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="text-[#00ff7f]" size={32} />
            <h2 className="text-white">Horario de Streams</h2>
          </div>
          <p className="text-white/60 text-xl mb-2">Encuéntrame en vivo en estos horarios</p>
          <p className="text-white/40 text-sm">Hora del Este (EST)</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4 mb-8">
            {schedule.map((item, index) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-[#1a1a1a] border border-[#00ff7f]/20 rounded-xl p-6 hover:border-[#00ff7f]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,127,0.1)]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#00ff7f]/10 border border-[#00ff7f]/30">
                      <Calendar className="text-[#00ff7f]" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white mb-1">{item.day}</h3>
                      <div className="flex items-center gap-2 text-white/60">
                        <Clock size={16} />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#00ff7f]">
                    <Gamepad2 size={20} />
                    <span>{item.game}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-white/50 text-sm italic">Los horarios pueden variar. Sígueme en redes sociales para estar al día.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}