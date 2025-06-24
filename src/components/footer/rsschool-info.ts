import { SCHOOL_NAME, SCHOOL_URL } from '@/constants/constants';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';
import { LinkBuilder } from '@/utils/link-builder';

import logo from '../../assets/svg/rs-school-logo.svg';
import { Component } from '../base/component';

export class SchoolInfo extends Component {
  constructor() {
    super({ tag: 'div', className: 'footer__school-info' });
    this.render();
  }

  protected render(): void {
    const schoolName = new ElementBuilder({
      tag: 'p',
      className: 'school-info__name',
      textContent: SCHOOL_NAME,
    }).getElement();

    const schoolLogo = new ImageBuilder({
      tag: 'img',
      className: 'school-info__logo',
      source: logo,
      alt: 'RS School logo',
    }).getElement();

    const schoolLink = new LinkBuilder({
      tag: 'a',
      className: ['footer__link', 'footer__link--school'],
      href: SCHOOL_URL,
      target: '_blank',
    }).getElement();

    schoolLink.append(schoolLogo);

    this.container.append(schoolName, schoolLink);
  }
}
