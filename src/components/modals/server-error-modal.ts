import serverError from '@/assets/svg/server-error.svg';
import { SERVER_ERROR_MODAL } from '@/constants/constants';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

import { Modal } from './default-modal';

export class ServerErrorModal extends Modal {
  private errorMessage: string;
  private messageContainer: HTMLElement | null = null;

  constructor(message: string) {
    super(['server-error-modal']);
    this.errorMessage = message;
    this.renderChildren();
  }

  public renderChildren(): void {
    this.messageContainer = new ElementBuilder({
      tag: 'div',
      className: 'server-error-modal__message',
    }).getElement();

    const heading = new ElementBuilder({
      tag: 'h2',
      className: 'server-error-modal__heading',
      textContent: SERVER_ERROR_MODAL.errorTitle,
    }).getElement();

    const image = new ImageBuilder({
      tag: 'img',
      className: 'server-error-modal__image',
      source: serverError,
      alt: 'Sever Error',
    }).getElement();

    const text = new ElementBuilder({
      tag: 'p',
      className: 'server-error-modal__text',
      textContent: SERVER_ERROR_MODAL.errorMessage,
    }).getElement();

    const error = new ElementBuilder({
      tag: 'p',
      className: 'server-error-modal__error-text',
      textContent: this.errorMessage,
    }).getElement();

    this.messageContainer.append(heading, image, text, error);
    this.modalContent.append(this.messageContainer);
  }
}
