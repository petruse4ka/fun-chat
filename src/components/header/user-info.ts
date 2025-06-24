import { Component } from '@/components/base/component';
import { Button } from '@/components/buttons/base-button';
import { BUTTON_TITLES } from '@/constants/constants';
import { Router } from '@/router/router';
import { Route } from '@/types/enums';
import type { User } from '@/types/interfaces';
import { ElementBuilder } from '@/utils/element-builder';
import { ImageBuilder } from '@/utils/image-builder';
import { WebSocketService } from '@/websocket/websocket-service';

import icon from '../../assets/icons/user.png';

export class UserInfo extends Component {
  private isLoggedIn: boolean = false;
  private username: string = '';
  private wsService: WebSocketService;

  constructor() {
    super({
      tag: 'div',
      className: 'header__user-info',
    });
    this.wsService = WebSocketService.getInstance();
    const currentUser = this.wsService.getCurrentUser();
    this.isLoggedIn = currentUser !== null;
    this.username = currentUser?.login || '';
    this.wsService.setLoginHandler(this.loginUser.bind(this));
    this.wsService.setLogoutHandler(this.logoutUser.bind(this));
    this.render();
  }

  private static handleLogin(): void {
    Router.followRoute(Route.Login);
  }

  protected render(): void {
    const userIcon = new ImageBuilder({
      tag: 'img',
      className: 'header__user-icon',
      source: icon,
      alt: 'User icon',
    }).getElement();

    const status = new ElementBuilder({
      tag: 'div',
      className: 'header__status',
    }).getElement();

    if (this.isLoggedIn) {
      const userName = new ElementBuilder({
        tag: 'span',
        className: 'header__username',
        textContent: this.username,
      }).getElement();

      status.classList.add('header__status--online');

      const logoutButton = new Button({
        className: ['button--logout'],
        textContent: BUTTON_TITLES.logout,
        callback: (): void => this.handleLogout(),
      }).getElement();

      this.container.append(status, userIcon, userName, logoutButton);
    } else {
      status.classList.remove('header__status--online');
      const loginButton = new Button({
        className: ['button--login'],
        textContent: BUTTON_TITLES.login,
        callback: (): void => UserInfo.handleLogin(),
      }).getElement();

      this.container.append(status, userIcon, loginButton);
    }
  }

  private handleLogout(): void {
    this.wsService.sendLogoutRequest();
  }

  private loginUser(user: User): void {
    this.isLoggedIn = true;
    this.username = user.login;
    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }
    this.render();
  }

  private logoutUser(): void {
    this.isLoggedIn = false;
    this.username = '';
    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }
    this.render();
    Router.followRoute(Route.Login);
  }
}
