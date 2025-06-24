import type { Language, Route } from './enums';

export interface ElementParameters {
  tag: string;
  className: string | string[];
  textContent?: string;
  callback?: (event: Event) => void;
  eventType?: string;
  attributes?: Record<string, string>;
}

export interface LinkParameters extends ElementParameters {
  href: string;
  target: '_blank' | '_self';
}

export interface ImageParameters extends ElementParameters {
  source: string;
  alt: string;
}

export interface InputParameters extends ElementParameters {
  type: 'text' | 'number' | 'color' | 'password';
  value?: string;
  placeholder?: string;
  readonly?: boolean;
}

export interface MenuItem {
  name: string;
  route: Route;
}

export interface UserItem {
  login: string;
  isOnline: boolean;
}

export interface LanguageChangeEvent extends CustomEvent {
  detail: {
    language: Language;
  };
}

export interface WebSocketMessage<T> {
  id: string | null;
  type: string;
  payload: T;
}

export interface ErrorResponsePayload {
  error: string;
}

export interface UserLoginRequestPayload {
  user: {
    login: string;
    password: string;
  };
}

export interface User {
  login: string;
  isLogined: boolean;
}

export interface MessageStatus {
  isDelivered: boolean;
  isReaded: boolean;
  isEdited: boolean;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: MessageStatus;
}

export interface MessageDeliveryStatus {
  id: string;
  status: {
    isDelivered: boolean;
  };
}

export interface MessageReadStatus {
  id: string;
  status: {
    isReaded: boolean;
  };
}

export interface MessageEditStatus {
  id: string;
  text: string;
  status: {
    isEdited: boolean;
  };
}

export interface MessageDeleteStatus {
  id: string;
  status: {
    isDeleted: boolean;
  };
}

export interface UserLoginResponsePayload {
  user: User;
}

export interface UserLogoutRequestPayload {
  user: {
    login: string;
    password: string;
  };
}

export interface UserLogoutResponsePayload {
  user: User;
}

export interface LoggedUser {
  username: string;
  password: string;
}

export interface UserMessage {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: MessageStatus;
}

export interface UserMessageRequestPayload {
  message: {
    to: string;
    text: string;
  };
}

export interface UserMessageResponsePayload {
  message: UserMessage;
}

export interface UserActiveResponsePayload {
  users: UserLoginResponsePayload['user'][];
}

export interface UserInactiveResponsePayload {
  users: UserLoginResponsePayload['user'][];
}

export interface UserMessageDeliveryResponsePayload {
  message: MessageDeliveryStatus;
}

export interface UserMessageReadPayload {
  message: {
    id: string;
  };
}

export interface UserMessageReadResponsePayload {
  message: MessageReadStatus;
}

export interface UserMessageDeletePayload {
  message: {
    id: string;
  };
}

export interface UserMessageDeleteResponsePayload {
  message: MessageDeleteStatus;
}

export interface UserMessageEditPayload {
  message: {
    id: string;
    text: string;
  };
}

export interface UserMessageEditResponsePayload {
  message: MessageEditStatus;
}
