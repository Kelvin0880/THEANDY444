import { useState } from 'react';
import { Save } from 'lucide-react';
import { useSiteData } from '../../../contexts/DataContext';
import { toast } from 'sonner';

export function SocialForm() {
  const { siteData, updateSiteData, saveSiteData } = useSiteData();
  const [formData, setFormData] = useState(siteData.socialLinks);

  const handleSocialChange = (index: number, field: string, value: string) => {
    const newSocial = [...formData];
    newSocial[index] = { ...newSocial[index], [field]: value };
    setFormData(newSocial);
  };

  const handleSave = () => {
    updateSiteData({ socialLinks: formData });
    saveSiteData();
    toast.success('Redes sociales actualizadas correctamente');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white">Redes Sociales</h2>
          <p className="text-white/60">Actualiza tus enlaces de redes sociales</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-[#00ff7f] text-black rounded-lg hover:bg-[#00ff99] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,127,0.5)]"
        >
          <Save size={18} />
          Guardar Cambios
        </button>
      </div>

      <div className="grid gap-4">
        {formData.map((social: any, index: number) => (
          <div key={index} className="bg-[#1a1a1a] border border-[#00ff7f]/20 rounded-lg p-4">
            <h3 className="text-white mb-4">{social.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 mb-2 text-sm">Nombre de la Red</label>
                <input
                  type="text"
                  value={social.name}
                  onChange={(e) => handleSocialChange(index, 'name', e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-2 text-white focus:border-[#00ff7f] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2 text-sm">URL</label>
                <input
                  type="url"
                  value={social.url}
                  onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-2 text-white focus:border-[#00ff7f] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2 text-sm">Ícono (Lucide)</label>
                <input
                  type="text"
                  value={social.icon}
                  onChange={(e) => handleSocialChange(index, 'icon', e.target.value)}
                  placeholder="Zap, Twitch, etc."
                  className="w-full bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-2 text-white focus:border-[#00ff7f] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/80 mb-2 text-sm">Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={social.color}
                    onChange={(e) => handleSocialChange(index, 'color', e.target.value)}
                    className="w-12 h-10 bg-[#0a0a0a] border border-[#00ff7f]/30 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={social.color}
                    onChange={(e) => handleSocialChange(index, 'color', e.target.value)}
                    className="flex-1 bg-[#0a0a0a] border border-[#00ff7f]/30 rounded-lg px-4 py-2 text-white focus:border-[#00ff7f] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
