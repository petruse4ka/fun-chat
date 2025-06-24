import darkIcon from '@/assets/icons/dark.png';
import lightIcon from '@/assets/icons/light.png';
import { Component } from '@/components/base/component';
import { THEME_OPTIONS } from '@/constants/constants';
import type { Theme } from '@/types/enums';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

export class ThemeSelector extends Component {
  private currentTheme: Theme = 'dark';
  private isOpen: boolean = false;
  private themeDropdown: HTMLElement = new ElementBuilder({
    tag: 'div',
    className: 'header__theme-dropdown',
  }).getElement();
  private currentIcon: HTMLElement = new ImageBuilder({
    tag: 'img',
    className: 'header__theme-icon',
    source: this.currentTheme === 'dark' ? darkIcon : lightIcon,
    alt: this.currentTheme === 'dark' ? 'Moon Icon' : 'Sun Icon',
  }).getElement();

  constructor() {
    super({
      tag: 'div',
      className: 'header__theme-option',
    });
    this.loadTheme();
    this.render();
    this.addEventListeners();
  }

  protected render(): void {
    const themeSelector = new ElementBuilder({
      tag: 'div',
      className: 'header__theme-selector',
      callback: (): void => {
        this.showDropdown();
      },
    }).getElement();

    const darkOption = this.createThemeItem('dark', darkIcon, THEME_OPTIONS.darkTheme);
    const lightOption = this.createThemeItem('light', lightIcon, THEME_OPTIONS.lightTheme);

    themeSelector.append(this.currentIcon);
    this.themeDropdown.append(darkOption, lightOption);
    this.container.append(themeSelector, this.themeDropdown);
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem('fun-chat-konstantin-theme');
    if (savedTheme === undefined) {
      this.currentTheme = 'dark';
    } else if (savedTheme === 'dark' || savedTheme === 'light') {
      this.currentTheme = savedTheme;
    } else {
      this.currentTheme = 'dark';
    }
    this.applyTheme(this.currentTheme);
  }

  private createThemeItem(theme: Theme, icon: string, text: string): HTMLElement {
    const themeItem = new ElementBuilder({
      tag: 'div',
      className: 'header__theme-item',
      callback: (): void => {
        this.changeTheme(theme);
      },
    }).getElement();

    const themeIcon = new ImageBuilder({
      tag: 'img',
      className: 'header__theme-icon',
      source: icon,
      alt: theme === 'dark' ? 'Moon Icon' : 'Sun Icon',
    }).getElement();

    const themeText = new ElementBuilder({
      tag: 'span',
      className: 'header__theme-text',
      textContent: text,
    }).getElement();

    themeItem.append(themeIcon, themeText);
    return themeItem;
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
  }

  private showDropdown(): void {
    this.isOpen = !this.isOpen;
    if (this.themeDropdown) {
      this.themeDropdown.classList.toggle('header__theme-dropdown--active');
    }
  }

  private closeDropdown(): void {
    if (this.isOpen && this.themeDropdown) {
      this.isOpen = false;
      this.themeDropdown.classList.remove('header__theme-dropdown--active');
    }
  }

  private applyTheme(theme: Theme): void {
    if (theme === 'light') {
      document.body.classList.add('body--light-theme');
    } else {
      document.body.classList.remove('body--light-theme');
    }
    if (this.currentIcon instanceof HTMLImageElement) {
      this.currentIcon.src = theme === 'dark' ? darkIcon : lightIcon;
      this.currentIcon.alt = theme === 'dark' ? 'Moon Icon' : 'Sun Icon';
    }
  }

  private changeTheme(theme: Theme): void {
    if (theme === this.currentTheme) {
      this.closeDropdown();
      return;
    }
    this.currentTheme = theme;
    this.applyTheme(theme);
    localStorage.setItem('fun-chat-konstantin-theme', theme);
    this.closeDropdown();
  }
}
