import { Component } from '@/components/base/component';
import type { UserItem } from '@/types/interfaces';
import { ElementBuilder } from '@/utils/element-builder';

export class User extends Component {
  private user: UserItem;
  private selectUser?: (user: UserItem) => void;
  private unreadMessagesCounter: number;

  constructor(user: UserItem, callback?: (user: UserItem) => void, unreadCount: number = 0) {
    super({ tag: 'div', className: 'user-list__user' });
    this.user = user;
    this.selectUser = callback;
    this.unreadMessagesCounter = unreadCount;
    this.render();
    this.addEventListeners();
  }

  protected render(): void {
    const username = new ElementBuilder({
      tag: 'span',
      className: ['user-list__username'],
      textContent: this.user.login,
    }).getElement();

    const status = new ElementBuilder({
      tag: 'div',
      className: [
        'user-list__status',
        this.user.isOnline ? 'user-list__status--online' : 'user-list__status--offline',
      ],
    }).getElement();

    this.container.append(status, username);

    if (this.unreadMessagesCounter > 0) {
      const unreadMessages = new ElementBuilder({
        tag: 'div',
        className: ['user-list__unread-messages'],
        textContent: this.unreadMessagesCounter > 9 ? '9+' : this.unreadMessagesCounter.toString(),
      }).getElement();
      this.container.append(unreadMessages);
    }
  }

  private addEventListeners(): void {
    this.container.addEventListener('click', () => {
      if (this.selectUser) {
        this.selectUser(this.user);
      }
    });
  }
}
