import { AboutPage } from '@/pages/about-page';
import { ChatPage } from '@/pages/chat-page';
import { ErrorPage } from '@/pages/error-page';
import { LoginPage } from '@/pages/login-page';
import { Router } from '@/router/router';
import { Route } from '@/types/enums';
import { WebSocketService } from '@/websocket/websocket-service';

import { Component } from '../base/component';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

export class App extends Component {
  private header: Header = new Header();
  private loginPage: LoginPage = new LoginPage();
  private aboutPage: AboutPage = new AboutPage();
  private chatPage: ChatPage = new ChatPage();
  private errorPage: ErrorPage = new ErrorPage();
  private footer: Footer = new Footer();
  private router: Router;
  private currentPage: Component = this.loginPage;
  private wsService: WebSocketService;

  constructor() {
    super({ tag: 'div', className: 'app' });
    this.router = new Router(Route.Login);
    this.wsService = WebSocketService.getInstance();
    this.setupRoutes();
    this.render();
  }

  protected render(): void {
    this.container.append(
      this.header.getElement(),
      this.currentPage.getElement(),
      this.footer.getElement()
    );
  }

  private setupRoutes(): void {
    this.router.addRoute(Route.Login, () => {
      if (this.wsService.getCurrentUser()) {
        Router.followRoute(Route.Chat);
        return;
      }
      this.showPage(this.loginPage);
    });

    this.router.addRoute(Route.Chat, () => {
      if (!this.wsService.getCurrentUser()) {
        Router.followRoute(Route.Login);
        return;
      }
      this.showPage(this.chatPage);
    });

    this.router.addRoute(Route.About, () => this.showPage(this.aboutPage));
    this.router.addRoute(Route.Error, () => this.showPage(this.errorPage));
  }

  private showPage(newPage: Component): void {
    if (this.currentPage !== newPage) {
      this.currentPage.getElement().remove();
      this.currentPage = newPage;
      this.container.insertBefore(this.currentPage.getElement(), this.footer.getElement());
    }
  }
}
