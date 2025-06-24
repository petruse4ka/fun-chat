import { APP_NAME } from '@/constants/constants';
import { ElementBuilder } from '@/utils/element-builder';

import { Component } from '../base/component';
import { HeaderMenu } from './header-menu';
import { HeaderSubMenu } from './header-submenu';

export class Header extends Component {
  private menu: HeaderMenu = new HeaderMenu();
  private submenu: HeaderSubMenu = new HeaderSubMenu();

  constructor() {
    super({ tag: 'header', className: 'header' });
    this.render();
  }

  protected render(): void {
    const headerContainer = new ElementBuilder({
      tag: 'div',
      className: 'header__container',
    }).getElement();

    const logo = new ElementBuilder({
      tag: 'h1',
      className: 'header__logo',
      textContent: APP_NAME,
    }).getElement();

    headerContainer.append(logo, this.menu.getElement());
    this.container.append(this.submenu.getElement(), headerContainer);
  }
}
