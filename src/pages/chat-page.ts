import { Component } from '@/components/base/component';
import { ChatList } from '@/components/chat/chat-list';
import { ChatPreview } from '@/components/chat/chat-preview';
import { UserList } from '@/components/chat/user-list';
import { PAGE_TITLES } from '@/constants/constants';
import { ElementBuilder } from '@/utils/element-builder';

export class ChatPage extends Component {
  private userList: UserList;
  private chatList: ChatList;
  private chatPreview: ChatPreview;
  private showPreview: boolean;

  constructor() {
    super({ tag: 'main', className: 'chat' });
    this.userList = new UserList();
    this.chatList = new ChatList();
    this.chatPreview = new ChatPreview();
    this.showPreview = true;

    this.userList.setChatList(this.chatList);

    this.render();
    this.addEventListeners();
  }

  protected render(): void {
    const title = new ElementBuilder({
      tag: 'h1',
      className: ['chat__title'],
      textContent: PAGE_TITLES.chat,
    }).getElement();

    const content = new ElementBuilder({
      tag: 'div',
      className: ['chat__content'],
    }).getElement();

    content.append(this.userList.getElement());
    content.append(this.showPreview ? this.chatPreview.getElement() : this.chatList.getElement());

    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }
    this.container.append(title, content);
  }

  private addEventListeners(): void {
    this.container.addEventListener('userSelected', () => {
      this.showPreview = false;
      this.render();
    });

    document.addEventListener('connectionLost', () => {
      this.showPreview = true;
      this.render();
    });

    document.addEventListener('userLogout', () => {
      this.showPreview = true;
      this.render();
    });

    globalThis.addEventListener('popstate', () => {
      this.showPreview = true;
      this.render();
    });
  }
}
