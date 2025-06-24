import connectionError from '@/assets/images/connection-error.png';
import { CONNECTION_ERROR_MODAL } from '@/constants/constants';
import { ConnectionErrorCondition } from '@/types/enums';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

import { Modal } from './default-modal';

export class ConnectionErrorModal extends Modal {
  private errorCondition: ConnectionErrorCondition;
  private messageContainer: HTMLElement | null = null;

  constructor(errorCondition: ConnectionErrorCondition) {
    super(['connection-error-modal']);
    this.errorCondition = errorCondition;
    this.renderChildren();
  }

  public renderChildren(): void {
    this.messageContainer = new ElementBuilder({
      tag: 'div',
      className: 'connection-error-modal__message',
    }).getElement();

    const heading = new ElementBuilder({
      tag: 'h2',
      className: 'connection-error-modal__heading',
      textContent: CONNECTION_ERROR_MODAL.connectionErrorModalTitle,
    }).getElement();

    const image = new ImageBuilder({
      tag: 'img',
      className: 'connection-error-modal__image',
      source: connectionError,
      alt: 'Person in yellow builder helmet',
    }).getElement();

    const text = new ElementBuilder({
      tag: 'p',
      className: 'connection-error-modal__text',
      textContent:
        this.errorCondition === ConnectionErrorCondition.Lost
          ? CONNECTION_ERROR_MODAL.connectionLostModalMessage
          : CONNECTION_ERROR_MODAL.connectionUnavailableModalMessage,
    }).getElement();

    this.messageContainer.append(heading, image, text);
    this.modalContent.append(this.messageContainer);
  }
}
