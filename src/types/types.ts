import type {
  ErrorResponsePayload,
  MessageDeleteStatus,
  MessageDeliveryStatus,
  MessageEditStatus,
  MessageReadStatus,
  User,
  UserLoginRequestPayload,
  UserLoginResponsePayload,
  UserLogoutRequestPayload,
  UserLogoutResponsePayload,
  UserMessage,
  UserMessageRequestPayload,
  WebSocketMessage,
} from './interfaces';

export type UserLoginRequest = WebSocketMessage<UserLoginRequestPayload>;

export type UserLoginResponse = WebSocketMessage<UserLoginResponsePayload>;

export type UserLogoutRequest = WebSocketMessage<UserLogoutRequestPayload>;

export type UserLogoutResponse = WebSocketMessage<UserLogoutResponsePayload>;

export type UsersRequest = WebSocketMessage<null>;

export type ErrorResponse = WebSocketMessage<ErrorResponsePayload>;

export type UserMessageRequest = WebSocketMessage<UserMessageRequestPayload>;

export type LoginHandler = (user: User) => void;

export type LogoutHandler = (user: User) => void;

export type OtherUserLoginHandler = (user: User) => void;

export type OtherUserLogoutHandler = (user: User) => void;

export type ActiveUsersHandler = (users: User[]) => void;

export type InactiveUsersHandler = (users: User[]) => void;

export type UserMessageHandler = (message: UserMessage) => void;

export type MessageHistoryHandler = (messages: UserMessage[]) => void;

export type MessageDeleteHandler = (message: MessageDeleteStatus) => void;

export type MessageEditHandler = (message: MessageEditStatus) => void;

export type MessageDeliverHandler = (message: MessageDeliveryStatus) => void;

export type MessageReadHandler = (message: MessageReadStatus) => void;
