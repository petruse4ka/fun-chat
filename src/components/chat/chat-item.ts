import { Component } from '@/components/base/component';
import { BUTTON_TITLES, CHAT_TEXT } from '@/constants/constants';
import type { UserMessage } from '@/types/interfaces';
import { ElementBuilder } from '@/utils/element-builder';
import { InputBuilder } from '@/utils/input-builder';
import type { WebSocketService } from '@/websocket/websocket-service';

import { Button } from '../buttons/base-button';

export class ChatItem extends Component {
  private message: UserMessage;
  private wsService: WebSocketService;
  private currentUser: string;
  private contentContainer: HTMLElement;

  constructor(message: UserMessage, wsService: WebSocketService) {
    super({
      tag: 'div',
      className: 'chat-item',
      attributes: {
        'data-message-id': message.id,
      },
    });
    this.message = message;
    this.wsService = wsService;
    this.currentUser = wsService.getCurrentUser()?.login || '';
    this.contentContainer = ChatItem.createContentContainer();
    this.render();
    this.addEventListeners();
  }

  private static createContentContainer(): HTMLElement {
    return new ElementBuilder({
      tag: 'div',
      className: 'chat-item__content-container',
    }).getElement();
  }

  protected render(): void {
    const messageContainer = new ElementBuilder({
      tag: 'div',
      className:
        this.message.from === this.currentUser
          ? ['chat-item__container', 'chat-item__container--own']
          : ['chat-item__container'],
    }).getElement();

    this.contentContainer.append(this.createContent());

    messageContainer.append(this.createHeader(), this.contentContainer, this.createFooter());

    this.container.append(messageContainer);
  }

  private addEventListeners(): void {
    this.wsService.setMessageDeleteHandler((deletedMessage) => {
      if (deletedMessage.id === this.message.id) {
        this.container.remove();
      }
    });

    this.wsService.setMessageReadHandler((readMessage) => {
      if (readMessage.id === this.message.id) {
        this.message.status.isReaded = true;
      }
    });
  }

  private createHeader(): HTMLElement {
    const messageHeader = new ElementBuilder({
      tag: 'div',
      className: 'chat-item__header',
    }).getElement();

    const messageSender = new ElementBuilder({
      tag: 'span',
      className: 'chat-item__sender',
      textContent: this.message.from,
    }).getElement();

    const messageTime = new ElementBuilder({
      tag: 'span',
      className: 'chat-item__time',
      textContent: new Date(this.message.datetime).toLocaleTimeString(),
    }).getElement();

    messageHeader.append(messageSender, messageTime);
    return messageHeader;
  }

  private createContent(): HTMLElement {
    const content = new ElementBuilder({
      tag: 'div',
      className: 'chat-item__content',
    }).getElement();

    const text = new ElementBuilder({
      tag: 'p',
      className: 'chat-item__text',
      textContent: this.message.text,
    }).getElement();

    content.append(text);

    if (this.message.status.isEdited) {
      const editedText = new ElementBuilder({
        tag: 'div',
        className: 'chat-item__edited',
        textContent: CHAT_TEXT.editedMessage,
      }).getElement();

      content.append(text, editedText);
    }

    return content;
  }

  private createEditForm(): HTMLElement {
    const form = new ElementBuilder({
      tag: 'div',
      className: 'chat-item__edit-form',
    }).getElement();

    const input = new InputBuilder({
      tag: 'input',
      className: ['chat-list__input', 'input__field'],
      type: 'text',
      value: this.message.text,
      placeholder: CHAT_TEXT.messagePlaceholder,
    }).getElement();

    const confirmButton = new Button({
      className: ['button', 'button--confirm'],
      textContent: '✓',
      callback: (): void => {
        if (input instanceof HTMLInputElement) this.confirmEditMessage(input.value);
      },
    }).getElement();

    const cancelButton = new Button({
      className: ['button', 'button--cancel'],
      textContent: '✕',
      callback: (): void => this.cancelEditMessage(),
    }).getElement();

    form.append(input, confirmButton, cancelButton);
    return form;
  }

  private createStatusContainer(): HTMLElement {
    const statusContainer = new ElementBuilder({
      tag: 'div',
      className: 'chat-item__status-container',
    }).getElement();

    if (!this.message.status.isDelivered) {
      const notDeliveredStatus = new ElementBuilder({
        tag: 'span',
        className: 'chat-item__status-not-delivered',
        textContent: CHAT_TEXT.notDeliveredMessage,
      }).getElement();

      statusContainer.append(notDeliveredStatus);
    } else if (this.message.status.isReaded) {
      const readStatus = new ElementBuilder({
        tag: 'span',
        className: 'chat-item__status-read',
        textContent: CHAT_TEXT.readMessage,
      }).getElement();

      statusContainer.append(readStatus);
    } else {
      const deliveredStatus = new ElementBuilder({
        tag: 'span',
        className: 'chat-item__status-delivered',
        textContent: CHAT_TEXT.deliveredMessage,
      }).getElement();

      statusContainer.append(deliveredStatus);
    }

    return statusContainer;
  }

  private createButtonsContainer(): HTMLElement {
    const buttonsContainer = new ElementBuilder({
      tag: 'div',
      className: 'chat-item__buttons-container',
    }).getElement();

    const editButton = new Button({
      className: ['button', 'button--edit'],
      textContent: BUTTON_TITLES.edit,
      callback: (): void => this.editMessage(),
    }).getElement();

    const deleteButton = new Button({
      className: ['button', 'button--delete'],
      textContent: BUTTON_TITLES.delete,
      callback: (): void => this.deleteMessage(),
    }).getElement();

    buttonsContainer.append(editButton, deleteButton);
    return buttonsContainer;
  }

  private createFooter(): HTMLElement {
    const footer = new ElementBuilder({
      tag: 'div',
      className: 'chat-item__footer',
    }).getElement();

    if (this.message.from === this.currentUser) {
      footer.append(this.createStatusContainer(), this.createButtonsContainer());
    }

    return footer;
  }

  private editMessage(): void {
    while (this.contentContainer.firstChild) {
      this.contentContainer.firstChild.remove();
    }
    const editForm = this.createEditForm();
    this.contentContainer.append(editForm);
  }

  private cancelEditMessage(): void {
    while (this.contentContainer.firstChild) {
      this.contentContainer.firstChild.remove();
    }
    const content = this.createContent();
    this.contentContainer.append(content);
  }

  private confirmEditMessage(newText: string): void {
    if (newText.trim() === this.message.text) {
      this.cancelEditMessage();
      return;
    }

    if (newText.trim() === '') {
      this.cancelEditMessage();
      return;
    }

    this.wsService.editMessage(this.message.id, newText);
    this.message.text = newText;
    this.cancelEditMessage();
  }

  private deleteMessage(): void {
    this.wsService.deleteMessage(this.message.id);
  }
}
