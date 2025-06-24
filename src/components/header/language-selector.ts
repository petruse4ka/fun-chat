import ruFlag from '@/assets/icons/rus.png';
import ukFlag from '@/assets/icons/uk.png';
import { Component } from '@/components/base/component';
import { LanguageSelectorUtility } from '@/locales/language-selector';
import type { Language } from '@/types/enums';
import { isLanguageChangeEvent } from '@/types/guards';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

export class LanguageSelector extends Component {
  private isOpen: boolean = false;
  private languageDropdown: HTMLElement = new ElementBuilder({
    tag: 'div',
    className: 'header__language-dropdown',
  }).getElement();
  private languageSelectorUtility: LanguageSelectorUtility = new LanguageSelectorUtility();
  private currentLanguage: Language = this.languageSelectorUtility.getLanguage();
  private currentFlag: HTMLElement = new ImageBuilder({
    tag: 'img',
    className: 'header__language-flag',
    source: this.currentLanguage === 'en' ? ukFlag : ruFlag,
    alt: this.currentLanguage === 'en' ? 'UK Flag' : 'Russian Flag',
  }).getElement();

  constructor() {
    super({
      tag: 'div',
      className: 'header__language-option',
    });
    this.render();
    this.addEventListeners();
  }

  protected render(): void {
    const languageSelector = new ElementBuilder({
      tag: 'div',
      className: 'header__language-selector',
      callback: (): void => {
        this.showDropdown();
      },
    }).getElement();

    const enOption = this.createLanguageItem('en', ukFlag, 'English');
    const ruOption = this.createLanguageItem('ru', ruFlag, 'Русский');

    languageSelector.append(this.currentFlag);
    this.languageDropdown.append(enOption, ruOption);
    this.container.append(languageSelector, this.languageDropdown);
  }

  private createLanguageItem(language: Language, flag: string, text: string): HTMLElement {
    const languageItem = new ElementBuilder({
      tag: 'div',
      className: 'header__language-item',
      callback: (): void => {
        this.changeLanguage(language);
      },
    }).getElement();

    const countryFlag = new ImageBuilder({
      tag: 'img',
      className: 'header__language-flag',
      source: flag,
      alt: language === 'en' ? 'UK Flag' : 'Russian Flag',
    }).getElement();

    const languageText = new ElementBuilder({
      tag: 'span',
      className: 'header__language-text',
      textContent: text,
    }).getElement();

    languageItem.append(countryFlag, languageText);
    return languageItem;
  }

  private addEventListeners(): void {
    globalThis.addEventListener('click', (event: Event) => {
      if (
        this.isOpen &&
        event.target !== null &&
        event.target instanceof Node &&
        !this.container.contains(event.target)
      ) {
        this.closeDropdown();
      }
    });

    document.addEventListener('languageChange', (event: Event): void => {
      if (isLanguageChangeEvent(event)) {
        this.currentLanguage = event.detail.language;
        if (this.currentFlag instanceof HTMLImageElement) {
          this.currentFlag.src = this.currentLanguage === 'en' ? ukFlag : ruFlag;
          this.currentFlag.alt = this.currentLanguage === 'en' ? 'UK Flag' : 'Russian Flag';
        }
      }
    });
  }

  private showDropdown(): void {
    this.isOpen = !this.isOpen;
    if (this.languageDropdown) {
      this.languageDropdown.classList.toggle('header__language-dropdown--active');
    }
  }

  private closeDropdown(): void {
    if (this.isOpen && this.languageDropdown) {
      this.isOpen = false;
      this.languageDropdown.classList.remove('header__language-dropdown--active');
    }
  }

  private changeLanguage(language: Language): void {
    if (language === this.currentLanguage) {
      this.closeDropdown();
      return;
    }
    this.languageSelectorUtility.setLanguage(language);
    this.closeDropdown();
    globalThis.location.reload();
  }
}
