import { Component } from '@/components/base/component';
import { CHAT_TEXT } from '@/constants/constants';
import { BUTTON_TITLES } from '@/constants/constants';
import type { UserItem, UserMessage } from '@/types/interfaces';
import { ElementBuilder } from '@/utils/element-builder';
import { InputBuilder } from '@/utils/input-builder';
import { WebSocketService } from '@/websocket/websocket-service';

import { Button } from '../buttons/base-button';
import { ChatItem } from './chat-item';

export class ChatList extends Component {
  private messageContainer: HTMLElement;
  private messageInput: InputBuilder;
  private sendButton: Button;
  private selectedUser: UserItem | null;
  private wsService: WebSocketService;
  private messages: UserMessage[] = [];
  private unreadMessagesCount: Map<string, number> = new Map();
  private isRead: boolean = false;
  private isManualScrolling: boolean = false;

  constructor() {
    super({ tag: 'div', className: 'chat-list' });
    this.wsService = WebSocketService.getInstance();
    this.messageContainer = ChatList.createMessageContainer();
    this.messageInput = ChatList.createMessageInput();
    this.sendButton = this.createSendButton();
    this.selectedUser = null;
    this.render();
    this.addEventListeners();
    this.addWebSocketHandlers();
  }

  private static createMessageContainer(): HTMLElement {
    return new ElementBuilder({
      tag: 'div',
      className: ['chat-list__list'],
    }).getElement();
  }

  private static createMessageInput(): InputBuilder {
    return new InputBuilder({
      tag: 'input',
      className: ['chat-list__input', 'input__field'],
      type: 'text',
      value: '',
      placeholder: CHAT_TEXT.messagePlaceholder,
      readonly: false,
    });
  }

  private static createEmptyChat(): HTMLElement {
    const emptyChat = new ElementBuilder({
      tag: 'div',
      className: ['chat-list__empty'],
    }).getElement();

    const message = new ElementBuilder({
      tag: 'p',
      className: ['chat-list__empty-message'],
      textContent: CHAT_TEXT.emptyChat,
    }).getElement();

    emptyChat.append(message);
    return emptyChat;
  }

  private static createDividerLine(): HTMLElement {
    const divider = new ElementBuilder({
      tag: 'div',
      className: ['chat-list__divider'],
    }).getElement();

    const line = new ElementBuilder({
      tag: 'div',
      className: ['chat-list__divider-line'],
    }).getElement();

    const text = new ElementBuilder({
      tag: 'span',
      className: ['chat-list__divider-text'],
      textContent: CHAT_TEXT.dividerText,
    }).getElement();

    divider.append(line, text);
    return divider;
  }

  public setSelectedUser(user: UserItem | null): void {
    this.selectedUser = user;
    this.isRead = false;
    if (user) {
      this.fetchMessageHistory(user.login);
    } else {
      this.messages = [];
      this.renderMessages();
    }
    this.messageInput.setValue('');
    this.messageInput.getElement().classList.remove('input__field--error');
    this.render();
  }

  public getUnreadMessagesCounter(userLogin: string): number {
    return this.unreadMessagesCount.get(userLogin) || 0;
  }

  public updateUnreadMessagesCounter(userLogin: string, newCount: number): void {
    const currentMessagesCounter = this.unreadMessagesCount.get(userLogin) || 0;
    const newMessagesCounter = currentMessagesCounter + newCount;

    if (newCount === 0) {
      this.unreadMessagesCount.delete(userLogin);
    } else {
      this.unreadMessagesCount.set(userLogin, newMessagesCounter);
    }

    document.dispatchEvent(new CustomEvent('unreadMessagesCounterUpdated'));
  }

  public countUnreadMessages(messages: UserMessage[]): void {
    if (messages.length === 0) return;

    const currentUser = this.wsService.getCurrentUser();
    if (!currentUser) return;

    let unreadMessagesCounter = 0;
    for (const message of messages) {
      if (message.to === currentUser.login && !message.status.isReaded) {
        unreadMessagesCounter += 1;
      }
    }

    if (this.selectedUser) {
      this.unreadMessagesCount.set(this.selectedUser.login, unreadMessagesCounter);
    }

    document.dispatchEvent(new CustomEvent('unreadMessagesCounterUpdated'));
  }

  protected render(): void {
    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }

    const userInfo = this.createUserInfo();
    this.container.append(userInfo);

    const chatContainer = new ElementBuilder({
      tag: 'div',
      className: ['chat-list__container'],
    }).getElement();

    if (this.messageContainer.children.length === 0) {
      const emptyChat = ChatList.createEmptyChat();
      this.messageContainer.append(emptyChat);
    }

    chatContainer.append(this.messageContainer);

    const chatControls = new ElementBuilder({
      tag: 'div',
      className: ['chat-list__controls'],
    }).getElement();

    chatControls.append(this.messageInput.getElement(), this.sendButton.getElement());
    chatContainer.append(chatControls);

    this.container.append(chatContainer);
  }

  private fetchMessageHistory(userLogin: string): void {
    this.wsService.fetchMessageHistory(userLogin);
  }

  private createUserInfo(): HTMLElement {
    const userInfo = new ElementBuilder({
      tag: 'div',
      className: ['chat-list__user-info'],
    }).getElement();

    if (this.selectedUser) {
      const userName = new ElementBuilder({
        tag: 'span',
        className: ['chat-list__username'],
        textContent: this.selectedUser.login,
      }).getElement();

      const userStatus = new ElementBuilder({
        tag: 'span',
        className: [
          'chat-list__user-status',
          this.selectedUser.isOnline
            ? 'chat-list__user-status--online'
            : 'chat-list__user-status--offline',
        ],
        textContent: this.selectedUser.isOnline ? CHAT_TEXT.userOnline : CHAT_TEXT.userOffline,
      }).getElement();

      userInfo.append(userName, userStatus);
    }

    return userInfo;
  }

  private createSendButton(): Button {
    return new Button({
      className: ['button--send'],
      textContent: BUTTON_TITLES.send,
      callback: (): void => this.SendMessage(),
    });
  }

  private addEventListeners(): void {
    this.messageInput.getElement().addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.SendMessage();
      }
    });

    this.messageInput.getElement().addEventListener('input', () => {
      this.messageInput.getElement().classList.remove('input__field--error');
    });

    this.messageInput.getElement().addEventListener('focus', () => {
      this.messageInput.getElement().classList.remove('input__field--error');
    });

    this.messageContainer.addEventListener(
      'wheel',
      () => {
        this.isManualScrolling = true;
        this.ReadMessages();
        setTimeout(() => {
          this.isManualScrolling = false;
        }, 1000);
      },
      { passive: true }
    );

    this.messageContainer.addEventListener('click', () => {
      this.ReadMessages();
    });

    globalThis.addEventListener('popstate', () => {
      this.setSelectedUser(null);
    });

    document.addEventListener('userLogout', () => {
      this.messages = [];
      this.unreadMessagesCount.clear();
    });

    document.addEventListener('connectionLost', () => {
      this.messages = [];
      this.unreadMessagesCount.clear();
    });
  }

  private addUserMessageHandlers(): void {
    this.wsService.setUserMessagesHandler((newMessage) => {
      if (
        this.selectedUser &&
        (newMessage.from === this.selectedUser.login || newMessage.to === this.selectedUser.login)
      ) {
        const index = this.messages.find((previousMessage) => previousMessage.id === newMessage.id);
        if (index === undefined) {
          this.messages.push(newMessage);
          if (this.isRead) {
            this.ReadMessages();
          }
          this.renderMessages();
        }
      }
    });

    this.wsService.setMessageHistoryHandler((messages) => {
      this.messages = messages;
      this.renderMessages();

      const currentUser = this.wsService.getCurrentUser();
      if (currentUser) {
        const unreadMessages = new Map<string, number>();
        for (const message of messages) {
          if (message.to === currentUser.login && !message.status.isReaded) {
            const currentUnreadMessagesCount = unreadMessages.get(message.from) || 0;
            unreadMessages.set(message.from, currentUnreadMessagesCount + 1);
          }
        }

        for (const [sender, count] of unreadMessages.entries()) {
          this.unreadMessagesCount.set(sender, count);
        }
        document.dispatchEvent(new CustomEvent('unreadMessagesCounterUpdated'));
      }
    });
  }

  private addUserMessageStatusHandlers(): void {
    this.wsService.setMessageDeleteHandler((deletedMessage) => {
      this.messages = this.messages.filter((message) => message.id !== deletedMessage.id);
      this.renderMessages();
    });

    this.wsService.setMessageEditHandler((editedMessage) => {
      const index = this.messages.findIndex((message) => message.id === editedMessage.id);
      if (index !== -1) {
        this.messages[index].text = editedMessage.text;
        this.messages[index].status.isEdited = true;
        this.renderMessages();
      }
    });

    this.wsService.setMessageDeliverHandler((deliveredMessage) => {
      const index = this.messages.findIndex((message) => message.id === deliveredMessage.id);
      if (index !== -1) {
        this.messages[index].status.isDelivered = true;
        this.renderMessages();
      }
    });

    this.wsService.setMessageReadHandler((readMessage) => {
      const index = this.messages.findIndex((message) => message.id === readMessage.id);
      if (index !== -1) {
        this.messages[index].status.isReaded = true;
        this.renderMessages();
      }
    });
  }

  private addWebSocketHandlers(): void {
    this.addUserMessageHandlers();
    this.addUserMessageStatusHandlers();
  }

  private renderMessages(): void {
    while (this.messageContainer.firstChild) {
      this.messageContainer.firstChild.remove();
    }

    if (this.messages.length === 0) {
      const emptyChat = ChatList.createEmptyChat();
      this.messageContainer.append(emptyChat);
      return;
    }

    const currentUser = this.wsService.getCurrentUser();
    if (!currentUser) return;

    let hasUnreadMessages = false;
    let wasDividerShown = false;
    let dividerElement: HTMLElement | null = null;

    if (this.isRead) {
      for (const message of this.messages) {
        const chatItem = new ChatItem(message, this.wsService);
        this.messageContainer.append(chatItem.getElement());
      }
    } else {
      for (const message of this.messages) {
        if (!wasDividerShown && message.to === currentUser.login && !message.status.isReaded) {
          hasUnreadMessages = true;
          const divider = ChatList.createDividerLine();
          this.messageContainer.append(divider);
          wasDividerShown = true;
          dividerElement = divider;
        }

        const chatItem = new ChatItem(message, this.wsService);
        this.messageContainer.append(chatItem.getElement());
      }
    }

    if (hasUnreadMessages && dividerElement) {
      dividerElement.scrollIntoView({ behavior: 'instant', block: 'start' });
    } else {
      if (!this.isManualScrolling) {
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
      }
    }
  }

  private SendMessage(): void {
    if (!this.selectedUser) return;

    const currentUser = this.wsService.getCurrentUser();
    if (!currentUser) return;

    const inputElement = this.messageInput.getElement();
    if (inputElement instanceof HTMLInputElement) {
      const message = inputElement.value.trim();
      if (message.length === 0) {
        inputElement.classList.add('input__field--error');
        return;
      }
      this.wsService.sendMessage(this.selectedUser.login, message);
      inputElement.value = '';
      this.ReadMessages();
      this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }
  }

  private ReadMessages(): void {
    const currentUser = this.wsService.getCurrentUser();
    if (!currentUser || !this.selectedUser) return;

    const unreadMessages = this.messages.filter(
      (message) =>
        message.from === this.selectedUser?.login &&
        message.to === currentUser.login &&
        !message.status.isReaded
    );

    if (unreadMessages.length > 0) {
      for (const message of unreadMessages) {
        this.wsService.readMessage(message.id);
      }
    }

    this.isRead = true;
  }
}
