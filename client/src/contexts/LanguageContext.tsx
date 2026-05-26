import React, { createContext, useContext, useState } from "react";

type Language = "en" | "tl";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  "dashboard": { en: "Dashboard", tl: "Dashboard" },
  "good_morning": { en: "Good morning", tl: "Magandang umaga" },
  "my_farms": { en: "My Farms", tl: "Aking mga Bukid" },
  "new_farm": { en: "New Farm", tl: "Bagong Bukid" },
  "no_farms": { en: "You don't have any farms yet", tl: "Wala ka pang bukid" },
  "no_farms_desc": { en: "Click the button below to map your first farm.", tl: "I-click ang button sa ibaba para gumawa ng iyong unang farm." },
  "total_farms": { en: "Total Farms", tl: "Kabuuang Bukid" },
  "total_hectares": { en: "Total Hectares", tl: "Kabuuang Ektarya" },
  "pending_review": { en: "Pending Review", tl: "Pagsusuri" },
  "needs_correction": { en: "Needs Correction", tl: "May Mali" },
  "crop_library": { en: "Crop Library", tl: "Aklatan ng Pananim" },
  "crop_library_desc": { en: "Information about vegetables and crops in Negros Occidental", tl: "Impormasyon tungkol sa mga gulay at pananim sa Negros Occidental" },
  "search_crop": { en: "Search crop...", tl: "Maghanap ng tanim..." },
  "view_details": { en: "View details", tl: "Tingnan ang detalye" },
  "season": { en: "Season", tl: "Panahon" },
  "community": { en: "Community", tl: "Komunidad" },
  "verifications": { en: "Verifications", tl: "Pagsusuri" },
  "users": { en: "Users", tl: "Gumagamit" },
  "analytics": { en: "Analytics", tl: "Analitika" },
  "logout": { en: "Logout", tl: "Umalis" },
  "notifications": { en: "Notifications", tl: "Mga Abiso" },
  "no_notifications": { en: "No new notifications", tl: "Walang bagong abiso" }
};

const LanguageContext = createContext<TranslationContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("tl");

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useTranslation must be used within LanguageProvider");
  return context;
}
