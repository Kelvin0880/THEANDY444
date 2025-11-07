import { SITE_CONFIG, SOCIAL_LINKS, NAV_ITEMS } from "../../utils/constants";

export const FOOTER_CONSTANTS = {
  siteName: SITE_CONFIG.siteName,
  tagline: SITE_CONFIG.tagline,
  copyright: `© ${SITE_CONFIG.currentYear} ${SITE_CONFIG.siteName}. Todos los derechos reservados.`,
  socialLinks: SOCIAL_LINKS,
  navItems: NAV_ITEMS,
  sections: {
    navigation: "Navegación",
    social: "Redes Sociales",
    legal: "Legal",
  },
  legalLinks: [
    { label: "Privacidad", href: "#privacy" },
    { label: "Términos", href: "#terms" },
  ],
  madeWith: "Hecho",
  country: SITE_CONFIG.country,
};
