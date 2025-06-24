import chatPreviewImage from '@/assets/images/users.png';
import { Component } from '@/components/base/component';
import { CHAT_TEXT } from '@/constants/constants';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';

export class ChatPreview extends Component {
  constructor() {
    super({ tag: 'div', className: 'chat-preview' });
    this.render();
  }

  protected render(): void {
    const container = new ElementBuilder({
      tag: 'div',
      className: 'chat-preview__container',
    }).getElement();

    const icon = new ImageBuilder({
      tag: 'img',
      className: 'chat-preview__icon',
      source: chatPreviewImage,
      alt: 'Icons of several users',
    }).getElement();

    const message = new ElementBuilder({
      tag: 'p',
      className: 'chat-preview__message',
      textContent: CHAT_TEXT.selectUserMessage,
    }).getElement();

    container.append(icon, message);
    this.container.append(container);
  }
}
