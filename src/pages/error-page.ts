import { Component } from '@/components/base/component';
import { Button } from '@/components/buttons/base-button';
import { ERROR_PAGE_MESSAGE, PAGE_TITLES } from '@/constants/constants';
import { BUTTON_TITLES } from '@/constants/constants';
import { Router } from '@/router/router';
import { Route } from '@/types/enums';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

import error from '../assets/svg/404.svg';

export class ErrorPage extends Component {
  constructor() {
    super({ tag: 'main', className: 'error' });
    this.render();
  }

  protected render(): void {
    const errorSection = new ElementBuilder({
      tag: 'div',
      className: ['error__container'],
    }).getElement();

    const errorImage = new ImageBuilder({
      tag: 'img',
      className: 'error__image',
      source: error,
      alt: '404 Error Page Image',
    }).getElement();

    const heading = new ElementBuilder({
      tag: 'h2',
      className: ['error__heading'],
      textContent: PAGE_TITLES.error,
    }).getElement();

    const message = new ElementBuilder({
      tag: 'p',
      className: ['error__message'],
      textContent: ERROR_PAGE_MESSAGE,
    }).getElement();

    const homeButton = new Button({
      className: ['button--homepage'],
      textContent: BUTTON_TITLES.home,
      callback: (): void => Router.followRoute(Route.Login),
    }).getElement();

    errorSection.append(heading, errorImage, message, homeButton);
    this.container.append(errorSection);
  }
}
