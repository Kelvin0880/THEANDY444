import { useState } from 'react';
import { Save } from 'lucide-react';
import { useSiteData } from '../../../contexts/DataContext';
import { toast } from 'sonner';

export function CTAForm() {
  const { siteData, updateSiteData, saveSiteData } = useSiteData();
  const [formData, setFormData] = useState(siteData.cta);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleButtonChange = (index: number, field: string, value: string) => {
    const newButtons = [...formData.buttons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    setFormData((prev: any) => ({ ...prev, buttons: newButtons }));
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData((prev: any) => ({ ...prev, features: newFeatures }));
  };

  const handleSave = () => {
    updateSiteData({ cta: formData });
    saveSiteData();
    toast.success('CTA Section actualizada correctamente');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white">Call to Action</h2>
          <p className="text-white/60">Edita la sección de llamada a la acción</p>
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
          <label className="block text-white/80 mb-2">Título Principal</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
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
            rows={4}
            className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-3 text-white focus:border-[#00ff7f] focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="bg-[#1a1a1a] border border-[#00ff7f]/20 rounded-lg p-4">
          <h3 className="text-white mb-4">Botones</h3>
          <div className="space-y-4">
            {formData.buttons.map((button: any, index: number) => (
              <div key={index} className="bg-[#0a0a0a] border border-[#00ff7f]/20 rounded-lg p-3">
                <h4 className="text-white/80 mb-3 text-sm">Botón {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/60 mb-1 text-xs">Texto</label>
                    <input
                      type="text"
                      value={button.text}
                      onChange={(e) => handleButtonChange(index, 'text', e.target.value)}
                      className="w-full bg-black border border-[#00ff7f]/30 rounded px-3 py-2 text-white text-sm focus:border-[#00ff7f] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 mb-1 text-xs">URL</label>
                    <input
                      type="url"
                      value={button.url}
                      onChange={(e) => handleButtonChange(index, 'url', e.target.value)}
                      className="w-full bg-black border border-[#00ff7f]/30 rounded px-3 py-2 text-white text-sm focus:border-[#00ff7f] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 mb-1 text-xs">Variante</label>
                    <select
                      value={button.variant}
                      onChange={(e) => handleButtonChange(index, 'variant', e.target.value)}
                      className="w-full bg-black border border-[#00ff7f]/30 rounded px-3 py-2 text-white text-sm focus:border-[#00ff7f] focus:outline-none transition-colors"
                    >
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/60 mb-1 text-xs">Ícono</label>
                    <input
                      type="text"
                      value={button.icon}
                      onChange={(e) => handleButtonChange(index, 'icon', e.target.value)}
                      className="w-full bg-black border border-[#00ff7f]/30 rounded px-3 py-2 text-white text-sm focus:border-[#00ff7f] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-[#1a1a1a] border border-[#00ff7f]/20 rounded-lg p-4">
          <h3 className="text-white mb-4">Características</h3>
          <div className="grid gap-4">
            {formData.features.map((feature: any, index: number) => (
              <div key={index} className="bg-[#0a0a0a] border border-[#00ff7f]/20 rounded-lg p-3">
                <div className="grid gap-3">
                  <div>
                    <label className="block text-white/60 mb-1 text-xs">Título</label>
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                      className="w-full bg-black border border-[#00ff7f]/30 rounded px-3 py-2 text-white text-sm focus:border-[#00ff7f] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 mb-1 text-xs">Descripción</label>
                    <input
                      type="text"
                      value={feature.description}
                      onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                      className="w-full bg-black border border-[#00ff7f]/30 rounded px-3 py-2 text-white text-sm focus:border-[#00ff7f] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
