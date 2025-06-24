import { ElementBuilder } from '@/utils/element-builder';

import { Component } from '../base/component';
import { LanguageSelector } from './language-selector';
import { ThemeSelector } from './theme-selector';
import { UserInfo } from './user-info';

export class HeaderSubMenu extends Component {
  private userInfo: UserInfo = new UserInfo();
  private languageSelector: LanguageSelector = new LanguageSelector();
  private themeSelector: ThemeSelector = new ThemeSelector();

  constructor() {
    super({ tag: 'ul', className: 'header__submenu' });
    this.render();
  }

  protected render(): void {
    const submenuContainer = new ElementBuilder({
      tag: 'div',
      className: 'header__submenu--container',
    }).getElement();

    submenuContainer.append(
      this.languageSelector.getElement(),
      this.themeSelector.getElement(),
      this.userInfo.getElement()
    );

    this.container.append(submenuContainer);
  }
}
