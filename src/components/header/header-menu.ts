import { MENU_ITEMS } from '@/constants/constants';
import { Router } from '@/router/router';
import { ElementBuilder } from '@/utils/element-builder';

import { Component } from '../base/component';

export class HeaderMenu extends Component {
  constructor() {
    super({ tag: 'ul', className: 'header__menu' });
    this.render();
  }

  protected render(): void {
    for (const item of MENU_ITEMS) {
      const menuItem = new ElementBuilder({
        tag: 'li',
        className: 'menu__item',
        textContent: item.name,
      }).getElement();

      menuItem.addEventListener('click', () => {
        Router.followRoute(item.route);
      });

      this.container.append(menuItem);
    }
  }
}
