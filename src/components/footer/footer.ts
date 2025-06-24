import { ElementBuilder } from '@/utils/element-builder';

import { Component } from '../base/component';
import { Copyright } from './copyright';
import { SchoolInfo } from './rsschool-info';

export class Footer extends Component {
  private copyright: Copyright = new Copyright();
  private schoolInfo: SchoolInfo = new SchoolInfo();

  constructor() {
    super({ tag: 'footer', className: 'footer' });
    this.render();
  }

  protected render(): void {
    const footerContainer = new ElementBuilder({
      tag: 'div',
      className: 'footer__container',
    }).getElement();

    footerContainer.append(this.copyright.getElement(), this.schoolInfo.getElement());

    this.container.append(footerContainer);
  }
}
