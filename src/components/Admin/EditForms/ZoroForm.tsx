'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, Sword } from 'lucide-react';
import { useSiteData } from '../../../contexts/DataContext';
import { toast } from 'sonner@2.0.3';

export function ZoroForm() {
  const { siteData, updateSiteData, saveSiteData } = useSiteData();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    themeColor: '',
    enabled: true
  });

  useEffect(() => {
    if (siteData.zoroSection) {
      setFormData(siteData.zoroSection);
    }
  }, [siteData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log('🔄 ZoroForm - Iniciando guardado...', formData);
      
      // Crear los nuevos datos completos
      const newSiteData = { ...siteData, zoroSection: formData };
      
      // Primero actualizar el estado local
      updateSiteData({ zoroSection: formData });
      
      // Luego guardar en Supabase con los datos específicos y esperar a que termine
      await saveSiteData(newSiteData);
      
      console.log('✅ ZoroForm - Guardado exitoso');
      toast.success('Sección Zoroversionmarimo actualizada correctamente', {
        description: 'Los cambios se han guardado exitosamente',
        duration: 3000,
      });
    } catch (error) {
      console.error('❌ ZoroForm - Error al guardar:', error);
      toast.error('Error al guardar los cambios');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#1a1a1a] border-2 border-[#00ff7f]/30 rounded-xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-[#00ff7f]/10 border border-[#00ff7f]/30 flex items-center justify-center">
          <Sword className="text-[#00ff7f]" size={24} />
        </div>
        <div>
          <h2 className="text-white text-xl">Editar Zoroversionmarimo</h2>
          <p className="text-white/60 text-sm">Personaliza la sección del personaje</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Enable/Disable Toggle */}
        <div className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-[#00ff7f]/20">
          <div>
            <label className="text-white">Mostrar sección</label>
            <p className="text-white/60 text-sm">Activar o desactivar esta sección en el sitio</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="enabled"
              checked={formData.enabled}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00ff7f]"></div>
          </label>
        </div>

        {/* Title */}
        <div>
          <label className="block text-white/80 mb-2">
            Título
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Zoroversionmarimo"
            className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00ff7f] focus:outline-none transition-colors"
            required
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-white/80 mb-2">
            Subtítulo
          </label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="El espíritu guerrero de TheAndy444"
            className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00ff7f] focus:outline-none transition-colors"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-white/80 mb-2">
            Descripción
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Una fusión inspirada en la energía y carisma..."
            rows={4}
            className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00ff7f] focus:outline-none transition-colors resize-none"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-white/80 mb-2">
            URL de la Imagen
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="/assets/Zoroversionmarimo.png"
            className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00ff7f] focus:outline-none transition-colors"
            required
          />
          <p className="text-white/40 text-xs mt-2">Ruta relativa o URL completa de la imagen</p>
        </div>

        {/* Theme Color */}
        <div>
          <label className="block text-white/80 mb-2">
            Color del Tema
          </label>
          <div className="flex gap-3">
            <input
              type="color"
              name="themeColor"
              value={formData.themeColor}
              onChange={handleChange}
              className="w-16 h-12 bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              name="themeColor"
              value={formData.themeColor}
              onChange={handleChange}
              placeholder="#00FF80"
              className="flex-1 bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00ff7f] focus:outline-none transition-colors"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#00ff7f] text-black py-3 rounded-lg hover:bg-[#00ff99] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,127,0.3)] hover:shadow-[0_0_30px_rgba(0,255,127,0.5)]"
        >
          <Save size={20} />
          <span>Guardar Cambios</span>
        </motion.button>
      </form>
    </motion.div>
  );
}
