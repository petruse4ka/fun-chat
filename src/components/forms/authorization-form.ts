import { ERROR_TEXT, SIGNIN_FORM, TOOLTIP_TEXT } from '@/constants/constants';
import { BUTTON_TITLES } from '@/constants/constants';
import { Router } from '@/router/router';
import { Route } from '@/types/enums';
import type { InputParameters } from '@/types/interfaces';
import { ElementBuilder } from '@/utils/element-builder';
import { InputBuilder } from '@/utils/input-builder';
import { WebSocketService } from '@/websocket/websocket-service';

import { Component } from '../base/component';
import { Button } from '../buttons/base-button';

export class AuthorizationForm extends Component {
  private usernameInput: InputBuilder;
  private passwordInput: InputBuilder;
  private usernameError: HTMLElement;
  private passwordError: HTMLElement;
  private wsService: WebSocketService;

  constructor() {
    super({ tag: 'form', className: 'auth-form' });
    this.wsService = WebSocketService.getInstance();
    this.wsService.setLoginHandler(AuthorizationForm.loginUser.bind(this));
    this.usernameInput = AuthorizationForm.createFieldInput(
      SIGNIN_FORM.usernamePlaceholder,
      'text'
    );
    this.passwordInput = AuthorizationForm.createFieldInput(
      SIGNIN_FORM.passwordPlaceholder,
      'password'
    );
    this.usernameError = AuthorizationForm.createError(ERROR_TEXT.username);
    this.passwordError = AuthorizationForm.createError(ERROR_TEXT.password);
    this.render();
  }

  private static createFieldInput(
    placeholder: string,
    inputType: InputParameters['type']
  ): InputBuilder {
    const fieldInput = new InputBuilder({
      tag: 'input',
      className: ['auth-form__input', 'input__field'],
      type: inputType,
      value: '',
      placeholder,
      readonly: false,
      attributes:
        inputType === 'password'
          ? { autocomplete: 'current-password' }
          : { autocomplete: 'username' },
    });

    return fieldInput;
  }

  private static createTooltip(tooltipText: string): HTMLElement {
    const tooltipIcon = new ElementBuilder({
      tag: 'span',
      className: 'auth-form__tooltip-icon',
      textContent: '?',
    }).getElement();

    const tooltip = new ElementBuilder({
      tag: 'div',
      className: 'auth-form__tooltip',
      textContent: tooltipText,
    }).getElement();

    tooltipIcon.addEventListener('mouseenter', () => {
      tooltip.style.display = 'block';
    });
    tooltipIcon.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });

    tooltipIcon.append(tooltip);

    return tooltipIcon;
  }

  private static createError(errorText: string): HTMLElement {
    const error = new ElementBuilder({
      tag: 'div',
      className: 'auth-form__error',
      textContent: errorText,
    }).getElement();

    return error;
  }

  private static validateUsername(username: string): boolean {
    return username.length >= 5 && username.length <= 15;
  }

  private static validatePassword(password: string): boolean {
    return (
      password.length >= 8 &&
      password.length <= 20 &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[^\dA-Za-z]/.test(password)
    );
  }

  private static loginUser(): void {
    Router.followRoute(Route.Chat);
  }

  protected render(): void {
    const usernameField = this.createUsernameField();
    const passwordField = this.createPasswordField();
    const signinButton = new Button({
      className: ['button--signin'],
      textContent: BUTTON_TITLES.signin,
      callback: (): void => this.handleSignin(),
    });

    signinButton.getElement().addEventListener('click', (event) => {
      event.preventDefault();
    });

    this.container.append(usernameField, passwordField, signinButton.getElement());
  }

  private createUsernameField(): HTMLElement {
    const usernameItem = new ElementBuilder({
      tag: 'div',
      className: 'auth-form__item',
    }).getElement();

    const usernameLabelContainer = new ElementBuilder({
      tag: 'div',
      className: 'auth-form__field-container',
    }).getElement();

    const usernameLabel = new ElementBuilder({
      tag: 'label',
      className: 'auth-form__label',
      textContent: SIGNIN_FORM.username,
    }).getElement();

    const tooltip = AuthorizationForm.createTooltip(TOOLTIP_TEXT.username);

    usernameLabelContainer.append(usernameLabel, tooltip);

    usernameItem.append(
      usernameLabelContainer,
      this.usernameInput.getElement(),
      this.usernameError
    );

    this.usernameInput.getElement().addEventListener('click', () => {
      this.usernameInput.getElement().classList.remove('input__field--error');
      this.usernameError.classList.remove('auth-form__error--visible');
    });

    return usernameItem;
  }

  private createPasswordField(): HTMLElement {
    const passwordItem = new ElementBuilder({
      tag: 'div',
      className: 'auth-form__item',
    }).getElement();

    const passwordLabelContainer = new ElementBuilder({
      tag: 'div',
      className: 'auth-form__field-container',
    }).getElement();

    const passwordLabel = new ElementBuilder({
      tag: 'label',
      className: 'auth-form__label',
      textContent: SIGNIN_FORM.password,
    }).getElement();

    const tooltip = AuthorizationForm.createTooltip(TOOLTIP_TEXT.password);

    passwordLabelContainer.append(passwordLabel, tooltip);

    passwordItem.append(
      passwordLabelContainer,
      this.passwordInput.getElement(),
      this.passwordError
    );

    this.passwordInput.getElement().addEventListener('click', () => {
      this.passwordInput.getElement().classList.remove('input__field--error');
      this.passwordError.classList.remove('auth-form__error--visible');
    });

    return passwordItem;
  }

  private handleSignin(): void {
    const usernameValue = this.usernameInput.getValue();
    const passwordValue = this.passwordInput.getValue();

    if (AuthorizationForm.validateUsername(usernameValue)) {
      this.usernameError.classList.remove('auth-form__error--visible');
      this.usernameInput.getElement().classList.remove('input__field--error');
    } else {
      this.usernameError.classList.add('auth-form__error--visible');
      this.usernameInput.getElement().classList.add('input__field--error');
      return;
    }

    if (AuthorizationForm.validatePassword(passwordValue)) {
      this.passwordError.classList.remove('auth-form__error--visible');
      this.passwordInput.getElement().classList.remove('input__field--error');
    } else {
      this.passwordError.classList.add('auth-form__error--visible');
      this.passwordInput.getElement().classList.add('input__field--error');
      return;
    }

    try {
      this.wsService.sendLoginRequest(usernameValue, passwordValue);
    } catch (error) {
      console.error('Login request error:', error);
    }
  }
}
