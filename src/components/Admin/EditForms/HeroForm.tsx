import { useState } from 'react';
import { Save } from 'lucide-react';
import { useSiteData } from '../../../contexts/DataContext';
import { toast } from 'sonner';

export function HeroForm() {
  const { siteData, updateSiteData, saveSiteData } = useSiteData();
  const [formData, setFormData] = useState(siteData.hero);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleButtonChange = (buttonType: 'primaryButton' | 'secondaryButton', field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [buttonType]: {
        ...prev[buttonType],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      console.log('🔄 HeroForm - Iniciando guardado...', formData);
      
      // Crear los nuevos datos completos
      const newSiteData = { ...siteData, hero: formData };
      
      // Primero actualizar el estado local
      updateSiteData({ hero: formData });
      
      // Luego guardar en Supabase con los datos específicos y esperar a que termine
      await saveSiteData(newSiteData);
      
      console.log('✅ HeroForm - Guardado exitoso');
      toast.success('Hero Section actualizada correctamente');
    } catch (error) {
      console.error('❌ HeroForm - Error al guardar:', error);
      toast.error('Error al guardar los cambios');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white">Hero Section</h2>
          <p className="text-white/60">Edita el contenido de la sección principal</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-[#00ff7f] text-black rounded-lg hover:bg-[#00ff99] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,127,0.5)]"
        >
          <Save size={18} />
          Guardar Cambios
        </button>
      </div>

      <div className="grid gap-6">
        {/* Title */}
        <div>
          <label className="block text-white/80 mb-2">Título</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-3 text-white focus:border-[#00ff7f] focus:outline-none transition-colors"
          />
        </div>

        {/* Highlight Text */}
        <div>
          <label className="block text-white/80 mb-2">Texto Destacado</label>
          <input
            type="text"
            value={formData.highlightText}
            onChange={(e) => handleChange('highlightText', e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-3 text-white focus:border-[#00ff7f] focus:outline-none transition-colors"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-white/80 mb-2">Subtítulo</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-3 text-white focus:border-[#00ff7f] focus:outline-none transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-white/80 mb-2">Descripción</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
            className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-3 text-white focus:border-[#00ff7f] focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Primary Button */}
        <div className="bg-[#1a1a1a] border border-[#00ff7f]/20 rounded-lg p-4">
          <h3 className="text-white mb-4">Botón Principal</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-white/80 mb-2 text-sm">Texto del Botón</label>
              <input
                type="text"
                value={formData.primaryButton.text}
                onChange={(e) => handleButtonChange('primaryButton', 'text', e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-2 text-white focus:border-[#00ff7f] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-white/80 mb-2 text-sm">URL del Botón</label>
              <input
                type="url"
                value={formData.primaryButton.url}
                onChange={(e) => handleButtonChange('primaryButton', 'url', e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-2 text-white focus:border-[#00ff7f] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Secondary Button */}
        <div className="bg-[#1a1a1a] border border-[#00ff7f]/20 rounded-lg p-4">
          <h3 className="text-white mb-4">Botón Secundario</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-white/80 mb-2 text-sm">Texto del Botón</label>
              <input
                type="text"
                value={formData.secondaryButton.text}
                onChange={(e) => handleButtonChange('secondaryButton', 'text', e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-2 text-white focus:border-[#00ff7f] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-white/80 mb-2 text-sm">URL del Botón</label>
              <input
                type="url"
                value={formData.secondaryButton.url}
                onChange={(e) => handleButtonChange('secondaryButton', 'url', e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-2 text-white focus:border-[#00ff7f] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
