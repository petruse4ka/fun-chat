import { Component } from '@/components/base/component';
import { AuthorizationForm } from '@/components/forms/authorization-form';
import { PAGE_TITLES } from '@/constants/constants';
import { ElementBuilder } from '@/utils/element-builder';

export class LoginPage extends Component {
  private authForm: AuthorizationForm = new AuthorizationForm();

  constructor() {
    super({ tag: 'main', className: 'login' });
    this.render();
  }

  protected render(): void {
    const title = new ElementBuilder({
      tag: 'h1',
      className: ['login__title'],
      textContent: PAGE_TITLES.login,
    }).getElement();

    this.container.append(title, this.authForm.getElement());
  }
}
