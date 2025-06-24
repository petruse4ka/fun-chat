import type { Language } from '@/types/enums';

import { en } from './en';
import { ru } from './ru';

export class LanguageSelectorUtility {
  private currentLanguage: Language;

  constructor(defaultLanguage: Language = 'en') {
    const savedLanguage = localStorage.getItem('fun-chat-konstantin-language');
    this.currentLanguage =
      savedLanguage === 'en' || savedLanguage === 'ru' ? savedLanguage : defaultLanguage;
  }

  public setLanguage(lang: Language): void {
    this.currentLanguage = lang;
    localStorage.setItem('fun-chat-konstantin-language', lang);
    document.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }));
  }

  public getLanguage(): Language {
    return this.currentLanguage;
  }

  public getTranslations(): typeof en | typeof ru {
    return this.currentLanguage === 'en' ? en : ru;
  }
}
