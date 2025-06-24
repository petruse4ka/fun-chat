import type { ActionHandler } from '@/types/enums';
import { Route } from '@/types/enums';

export class Router {
  private routes: Map<Route, ActionHandler>;
  private loginRoute: Route;

  constructor(loginRoute: Route) {
    this.routes = new Map();
    this.loginRoute = loginRoute;

    this.setDefaultRoute();
    this.setEventListeners();
  }

  public static followRoute(route: Route): void {
    globalThis.location.hash = route;
  }

  private static checkRouteValidity(hash: string): hash is Route {
    const validRoutes = new Set<string>([Route.Login, Route.About, Route.Chat, Route.Error]);
    return validRoutes.has(hash);
  }

  public addRoute(route: Route, handler: ActionHandler): void {
    this.routes.set(route, handler);
  }

  private setDefaultRoute(): void {
    if (!globalThis.location.hash) {
      globalThis.location.hash = this.loginRoute;
    }
  }

  private setEventListeners(): void {
    globalThis.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  private handleRoute(): void {
    const currentHash = globalThis.location.hash || this.loginRoute;
    const route = Router.checkRouteValidity(currentHash) ? currentHash : Route.Error;
    const handler = this.routes.get(route);

    if (handler) {
      handler();
    } else {
      globalThis.location.hash = this.loginRoute;
    }
  }
}
