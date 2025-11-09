import { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useSiteData } from '../../../contexts/DataContext';
import { toast } from 'sonner';

export function AboutForm() {
  const { siteData, updateSiteData, saveSiteData } = useSiteData();
  const [formData, setFormData] = useState(siteData.about);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleBioChange = (index: number, value: string) => {
    const newBio = [...formData.bio];
    newBio[index] = value;
    setFormData((prev: any) => ({ ...prev, bio: newBio }));
  };

  const addBioParagraph = () => {
    setFormData((prev: any) => ({ ...prev, bio: [...prev.bio, ''] }));
  };

  const removeBioParagraph = (index: number) => {
    const newBio = formData.bio.filter((_: any, i: number) => i !== index);
    setFormData((prev: any) => ({ ...prev, bio: newBio }));
  };

  const handleStatChange = (index: number, field: string, value: string) => {
    const newStats = [...formData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData((prev: any) => ({ ...prev, stats: newStats }));
  };

  const handleSave = async () => {
    try {
      console.log('🔄 AboutForm - Iniciando guardado...', formData);
      
      // Crear los nuevos datos completos
      const newSiteData = { ...siteData, about: formData };
      
      // Primero actualizar el estado local
      updateSiteData({ about: formData });
      
      // Luego guardar en Supabase con los datos específicos y esperar a que termine
      await saveSiteData(newSiteData);
      
      console.log('✅ AboutForm - Guardado exitoso');
      toast.success('Sección "Sobre Mí" actualizada correctamente');
    } catch (error) {
      console.error('❌ AboutForm - Error al guardar:', error);
      toast.error('Error al guardar los cambios');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white">Sobre Mí</h2>
          <p className="text-white/60">Edita tu información personal</p>
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
        {/* Section Title */}
        <div>
          <label className="block text-white/80 mb-2">Título de Sección</label>
          <input
            type="text"
            value={formData.sectionTitle}
            onChange={(e) => handleChange('sectionTitle', e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-3 text-white focus:border-[#00ff7f] focus:outline-none transition-colors"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-white/80 mb-2">Nombre</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-3 text-white focus:border-[#00ff7f] focus:outline-none transition-colors"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-white/80 mb-2">Título Profesional</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-3 text-white focus:border-[#00ff7f] focus:outline-none transition-colors"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-white/80 mb-2">País</label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-3 text-white focus:border-[#00ff7f] focus:outline-none transition-colors"
          />
        </div>

        {/* Bio Paragraphs */}
        <div className="bg-[#1a1a1a] border border-[#00ff7f]/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white">Biografía</h3>
            <button
              onClick={addBioParagraph}
              className="flex items-center gap-2 px-3 py-2 bg-[#00ff7f]/10 border border-[#00ff7f]/30 text-[#00ff7f] rounded-lg hover:bg-[#00ff7f]/20 transition-colors"
            >
              <Plus size={16} />
              Añadir Párrafo
            </button>
          </div>
          <div className="space-y-3">
            {formData.bio.map((paragraph: string, index: number) => (
              <div key={index} className="flex gap-2">
                <textarea
                  value={paragraph}
                  onChange={(e) => handleBioChange(index, e.target.value)}
                  rows={3}
                  placeholder={`Párrafo ${index + 1}`}
                  className="flex-1 bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-2 text-white focus:border-[#00ff7f] focus:outline-none transition-colors resize-none"
                />
                {formData.bio.length > 1 && (
                  <button
                    onClick={() => removeBioParagraph(index)}
                    className="px-3 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-[#1a1a1a] border border-[#00ff7f]/20 rounded-lg p-4">
          <h3 className="text-white mb-4">Estadísticas</h3>
          <div className="grid gap-4">
            {formData.stats.map((stat: any, index: number) => (
              <div key={index} className="grid grid-cols-2 gap-4 bg-[#0a0a0a] border border-[#00ff7f]/20 rounded-lg p-3">
                <div>
                  <label className="block text-white/60 mb-1 text-xs">Etiqueta</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                    className="w-full bg-black border border-[#00ff7f]/30 rounded px-3 py-2 text-white text-sm focus:border-[#00ff7f] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/60 mb-1 text-xs">Valor</label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                    className="w-full bg-black border border-[#00ff7f]/30 rounded px-3 py-2 text-white text-sm focus:border-[#00ff7f] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
