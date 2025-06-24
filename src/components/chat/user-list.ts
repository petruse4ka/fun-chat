import { Component } from '@/components/base/component';
import { CHAT_TEXT } from '@/constants/constants';
import type {
  MessageDeleteStatus,
  MessageReadStatus,
  User as UserType,
  UserActiveResponsePayload,
  UserInactiveResponsePayload,
  UserItem,
  UserMessage,
} from '@/types/interfaces';
import { ElementBuilder } from '@/utils/element-builder';
import { InputBuilder } from '@/utils/input-builder';
import { WebSocketService } from '@/websocket/websocket-service';

import type { ChatList } from './chat-list';
import { User } from './user-item';

export class UserList extends Component {
  private users: Map<string, UserItem> = new Map();
  private searchInput: InputBuilder;
  private userListContainer: HTMLElement;
  private wsService: WebSocketService;
  private chatList?: ChatList;
  private selectedUser: UserItem | null = null;
  private messages: Map<string, UserMessage> = new Map();

  constructor() {
    super({ tag: 'div', className: 'user-list' });
    this.wsService = WebSocketService.getInstance();
    this.searchInput = UserList.createSearchInput();
    this.userListContainer = UserList.createUserListContainer();
    this.addWebSocketHandlers();
    this.addEventListeners();
    this.render();
    this.requestMessageHistory();
  }

  private static createUserListContainer(): HTMLElement {
    return new ElementBuilder({
      tag: 'div',
      className: ['user-list__list'],
    }).getElement();
  }

  private static createSearchInput(): InputBuilder {
    return new InputBuilder({
      tag: 'input',
      className: ['user-list__input', 'input__field'],
      type: 'text',
      value: '',
      placeholder: CHAT_TEXT.searchPlaceholder,
      readonly: false,
    });
  }

  public setChatList(chatList: ChatList): void {
    this.chatList = chatList;
  }

  protected render(): void {
    this.container.append(this.searchInput.getElement(), this.userListContainer);
  }

  private selectUser(user: UserItem): void {
    this.selectedUser = user;
    if (this.chatList) {
      this.chatList.setSelectedUser(user);
      const event = new CustomEvent('userSelected', { bubbles: true });
      this.container.dispatchEvent(event);
    }
    this.searchInput.setValue('');
    this.renderUsers();
  }

  private addWebSocketHandlers(): void {
    this.wsService.setLoginHandler((user) => {
      this.handleUserLogin(user);
      this.wsService.requestAllUsers();
    });
    this.wsService.setLogoutHandler(this.handleUserLogout.bind(this));
    this.wsService.setOtherUsersLoginHandler(this.handleUserLogin.bind(this));
    this.wsService.setOtherUsersLogoutHandler(this.handleUserLogout.bind(this));
    this.wsService.setActiveUsersHandler(this.handleActiveUsers.bind(this));
    this.wsService.setInactiveUsersHandler(this.handleInactiveUsers.bind(this));
    this.wsService.setMessageHistoryHandler(this.handleMessageHistory.bind(this));
    this.wsService.setUserMessagesHandler(this.handleUserMessage.bind(this));
    this.wsService.setMessageDeleteHandler(this.handleMessageDelete.bind(this));
    this.wsService.setMessageReadHandler(this.handleMessageRead.bind(this));
  }

  private handleUserLogin(user: UserType): void {
    const currentUser = this.wsService.getCurrentUser();
    if (user.login !== currentUser?.login) {
      this.users.set(user.login, { login: user.login, isOnline: true });
      if (this.selectedUser && user.login === this.selectedUser.login && this.chatList) {
        this.chatList.setSelectedUser({ ...this.selectedUser, isOnline: true });
      }
      this.renderUsers();
    }
  }

  private handleUserLogout(user: UserType): void {
    const currentUser = this.wsService.getCurrentUser();
    if (user.login !== currentUser?.login) {
      this.users.set(user.login, { login: user.login, isOnline: false });
      if (this.selectedUser && user.login === this.selectedUser.login && this.chatList) {
        this.chatList.setSelectedUser({ ...this.selectedUser, isOnline: false });
      }
      this.renderUsers();
    }
  }

  private handleActiveUsers(users: UserActiveResponsePayload['users']): void {
    const currentUser = this.wsService.getCurrentUser();
    this.users.clear();
    const otherUsers = users.filter((user) => user.login !== currentUser?.login);
    for (const user of otherUsers) {
      this.users.set(user.login, { login: user.login, isOnline: true });
    }
    this.renderUsers();
    this.requestMessageHistory();
  }

  private handleInactiveUsers(users: UserInactiveResponsePayload['users']): void {
    const currentUser = this.wsService.getCurrentUser();
    const otherUsers = users.filter((user) => user.login !== currentUser?.login);
    for (const user of otherUsers) {
      this.users.set(user.login, { login: user.login, isOnline: false });
    }
    this.renderUsers();
  }

  private handleMessageHistory(messages: UserMessage[]): void {
    if (this.chatList) {
      this.chatList.countUnreadMessages(messages);
    }
    for (const message of messages) this.messages.set(message.id, message);
  }

  private handleUserMessage(message: UserMessage): void {
    if (this.chatList && !message.status.isReaded) {
      this.chatList.updateUnreadMessagesCounter(message.from, 1);
    }
    this.messages.set(message.id, message);
  }

  private handleMessageDelete(deletedMessage: MessageDeleteStatus): void {
    const previousMessage = this.messages.get(deletedMessage.id);
    if (previousMessage && !previousMessage.status.isReaded) {
      this.chatList?.updateUnreadMessagesCounter(previousMessage.from, -1);
    }
    this.messages.delete(deletedMessage.id);
  }

  private handleMessageRead(readMessage: MessageReadStatus): void {
    const message = this.messages.get(readMessage.id);
    const currentUser = this.wsService.getCurrentUser();
    if (message && !message.status.isReaded && message.to === currentUser?.login) {
      this.chatList?.updateUnreadMessagesCounter(message.from, -1);
      message.status.isReaded = true;
    }
  }

  private addEventListeners(): void {
    this.searchInput.getElement().addEventListener('input', () => this.filterUsers());

    document.addEventListener('connectionLost', () => {
      this.selectedUser = null;
      this.messages.clear();
      if (this.chatList) {
        this.chatList.setSelectedUser(null);
      }
      this.renderUsers();
    });

    document.addEventListener('userLogout', () => {
      this.selectedUser = null;
      this.messages.clear();
      if (this.chatList) {
        this.chatList.setSelectedUser(null);
      }
      this.renderUsers();
    });

    document.addEventListener('unreadMessagesCounterUpdated', () => {
      this.renderUsers();
    });

    globalThis.addEventListener('popstate', () => {
      this.selectedUser = null;
      if (this.chatList) {
        this.chatList.setSelectedUser(null);
      }
      this.renderUsers();
    });
  }

  private filterUsers(): void {
    const searchTerm = this.searchInput.getValue().toLowerCase();
    const filteredUsers = [...this.users.values()].filter((user) =>
      user.login.toLowerCase().includes(searchTerm)
    );
    this.renderUsers(filteredUsers);
  }

  private renderUsers(users?: UserItem[]): void {
    while (this.userListContainer.firstChild) {
      this.userListContainer.firstChild.remove();
    }

    const searchTerm = this.searchInput.getValue().toLowerCase();
    const renderedUsers = users || [...this.users.values()];
    const filteredUsers = searchTerm
      ? renderedUsers.filter((user) => user.login.toLowerCase().includes(searchTerm))
      : renderedUsers;

    if (filteredUsers.length === 0) {
      const noOtherUsersMessage = new ElementBuilder({
        tag: 'p',
        className: 'user-list__no-other-users',
        textContent: CHAT_TEXT.noOtherUser,
      }).getElement();
      this.userListContainer.append(noOtherUsersMessage);
      return;
    }

    for (const user of filteredUsers) {
      const unreadCount = this.chatList?.getUnreadMessagesCounter(user.login) || 0;
      const userElement = new User(user, this.selectUser.bind(this), unreadCount).getElement();

      if (this.selectedUser && this.selectedUser.login === user.login) {
        userElement.classList.add('user-list__user--selected');
      }

      this.userListContainer.append(userElement);
    }
  }

  private requestMessageHistory(): void {
    const currentUser = this.wsService.getCurrentUser();
    if (currentUser) {
      for (const user of this.users.values()) {
        this.wsService.fetchMessageHistory(user.login);
      }
    }
  }
}
