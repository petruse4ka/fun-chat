import { ConnectionErrorModal } from '@/components/modals/connection-error-modal';
import { ServerErrorModal } from '@/components/modals/server-error-modal';
import { CONNECTION_ERROR_MODAL } from '@/constants/constants';
import { ConnectionErrorCondition } from '@/types/enums';
import { isLoggedUser, isWebSocketMessage, isWebSocketMessageWithPayload } from '@/types/guards';
import type {
  ErrorResponsePayload,
  MessageDeleteStatus,
  MessageDeliveryStatus,
  MessageEditStatus,
  MessageReadStatus,
  User,
  UserActiveResponsePayload,
  UserInactiveResponsePayload,
  UserLoginResponsePayload,
  UserLogoutResponsePayload,
  UserMessage,
  UserMessageDeletePayload,
  UserMessageDeleteResponsePayload,
  UserMessageDeliveryResponsePayload,
  UserMessageEditPayload,
  UserMessageEditResponsePayload,
  UserMessageReadPayload,
  UserMessageReadResponsePayload,
  UserMessageResponsePayload,
  WebSocketMessage,
} from '@/types/interfaces';
import type {
  ActiveUsersHandler,
  InactiveUsersHandler,
  LoginHandler,
  LogoutHandler,
  MessageDeleteHandler,
  MessageDeliverHandler,
  MessageEditHandler,
  MessageHistoryHandler,
  MessageReadHandler,
  OtherUserLoginHandler,
  OtherUserLogoutHandler,
  UserLoginRequest,
  UserLogoutRequest,
  UserMessageHandler,
  UserMessageRequest,
  UsersRequest,
} from '@/types/types';

export class WebSocketService {
  private static instance: WebSocketService | undefined = undefined;
  private socket: WebSocket | undefined = undefined;
  private url = 'ws://localhost:4000';
  private loginHandlers: LoginHandler[] = [];
  private logoutHandlers: LogoutHandler[] = [];
  private otherUsersLoginHandler: OtherUserLoginHandler | null = null;
  private otherUsersLogoutHandler: OtherUserLogoutHandler | null = null;
  private activeUsersHandler: ActiveUsersHandler | null = null;
  private inactiveUsersHandler: InactiveUsersHandler | null = null;
  private userMessageHandlers: UserMessageHandler[] = [];
  private messageHistoryHandlers: MessageHistoryHandler[] = [];
  private messageDeleteHandlers: MessageDeleteHandler[] = [];
  private messageEditHandler: MessageEditHandler | null = null;
  private messageDeliverHandler: MessageDeliverHandler | null = null;
  private messageReadHandlers: MessageReadHandler[] = [];
  private currentUser: { login: string; password: string } | null = null;
  private userPassword: string = '';
  private connectionLostModal: ConnectionErrorModal;
  private connectionUnavailableModal: ConnectionErrorModal;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = CONNECTION_ERROR_MODAL.maxReconnectAttempts;
  private reconnectInterval = CONNECTION_ERROR_MODAL.reconnectInterval;
  private reconnectModalShown = false;

  constructor() {
    this.connect();
    this.connectionLostModal = new ConnectionErrorModal(ConnectionErrorCondition.Lost);
    this.connectionUnavailableModal = new ConnectionErrorModal(
      ConnectionErrorCondition.Unavailable
    );
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public setLoginHandler(callback: LoginHandler): void {
    this.loginHandlers.push(callback);
  }

  public setLogoutHandler(callback: LogoutHandler): void {
    this.logoutHandlers.push(callback);
  }

  public setOtherUsersLoginHandler(callback: OtherUserLoginHandler): void {
    this.otherUsersLoginHandler = callback;
  }

  public setOtherUsersLogoutHandler(callback: OtherUserLogoutHandler): void {
    this.otherUsersLogoutHandler = callback;
  }

  public setActiveUsersHandler(callback: ActiveUsersHandler): void {
    this.activeUsersHandler = callback;
  }

  public setInactiveUsersHandler(callback: InactiveUsersHandler): void {
    this.inactiveUsersHandler = callback;
  }

  public setUserMessagesHandler(callback: UserMessageHandler): void {
    this.userMessageHandlers.push(callback);
  }

  public setMessageHistoryHandler(callback: MessageHistoryHandler): void {
    this.messageHistoryHandlers.push(callback);
  }

  public setMessageDeleteHandler(callback: MessageDeleteHandler): void {
    this.messageDeleteHandlers.push(callback);
  }

  public setMessageEditHandler(callback: MessageEditHandler): void {
    this.messageEditHandler = callback;
  }

  public setMessageDeliverHandler(callback: MessageDeliverHandler): void {
    this.messageDeliverHandler = callback;
  }

  public setMessageReadHandler(callback: MessageReadHandler): void {
    this.messageReadHandlers.push(callback);
  }

  public getCurrentUser(): User | null {
    return this.currentUser ? { login: this.currentUser.login, isLogined: true } : null;
  }

  public sendLoginRequest(username: string, password: string): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.connectionUnavailableModal.open();
      throw new Error('Local server is unavailable');
    }

    this.userPassword = password;
    sessionStorage.setItem('loggedUser', JSON.stringify({ username, password }));

    const message: UserLoginRequest = {
      id: crypto.randomUUID(),
      type: 'USER_LOGIN',
      payload: {
        user: {
          login: username,
          password: password,
        },
      },
    };

    this.socket.send(JSON.stringify(message));
  }

  public sendLogoutRequest(): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not connected');
    }

    if (!this.currentUser) {
      throw new Error('No user is currently logged in');
    }

    const message: UserLogoutRequest = {
      id: crypto.randomUUID(),
      type: 'USER_LOGOUT',
      payload: {
        user: {
          login: this.currentUser.login,
          password: this.currentUser.password,
        },
      },
    };

    this.socket.send(JSON.stringify(message));
    sessionStorage.removeItem('loggedUser');
  }

  public requestAllUsers(): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not connected');
    }

    const activeMessage: UsersRequest = {
      id: crypto.randomUUID(),
      type: 'USER_ACTIVE',
      payload: null,
    };

    const inactiveMessage: UsersRequest = {
      id: crypto.randomUUID(),
      type: 'USER_INACTIVE',
      payload: null,
    };

    this.socket.send(JSON.stringify(activeMessage));
    this.socket.send(JSON.stringify(inactiveMessage));
  }

  public sendMessage(receiver: string, text: string): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.connectionUnavailableModal.open();
      throw new Error('WebSocket is not connected');
    }

    const message: UserMessageRequest = {
      id: crypto.randomUUID(),
      type: 'MSG_SEND',
      payload: {
        message: {
          to: receiver,
          text: text,
        },
      },
    };

    this.socket.send(JSON.stringify(message));
  }

  public editMessage(messageId: string, newText: string): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not connected');
    }

    const message: WebSocketMessage<UserMessageEditPayload> = {
      id: crypto.randomUUID(),
      type: 'MSG_EDIT',
      payload: {
        message: {
          id: messageId,
          text: newText,
        },
      },
    };

    this.socket.send(JSON.stringify(message));
  }

  public deleteMessage(messageId: string): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not connected');
    }

    const message: WebSocketMessage<UserMessageDeletePayload> = {
      id: crypto.randomUUID(),
      type: 'MSG_DELETE',
      payload: {
        message: {
          id: messageId,
        },
      },
    };

    this.socket.send(JSON.stringify(message));
  }

  public fetchMessageHistory(userLogin: string): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not connected');
    }

    const request: WebSocketMessage<{ user: { login: string } }> = {
      id: crypto.randomUUID(),
      type: 'MSG_FROM_USER',
      payload: {
        user: {
          login: userLogin,
        },
      },
    };

    this.socket.send(JSON.stringify(request));
  }

  public readMessage(messageId: string): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not connected');
    }

    const message: WebSocketMessage<UserMessageReadPayload> = {
      id: crypto.randomUUID(),
      type: 'MSG_READ',
      payload: {
        message: {
          id: messageId,
        },
      },
    };

    this.socket.send(JSON.stringify(message));
  }

  private connect(): void {
    this.socket = new WebSocket(this.url);
    this.addEventListeners();
  }

  private addEventListeners(): void {
    if (!this.socket) return;

    this.socket.addEventListener('open', this.handleSocketOpenEvent);
    this.socket.addEventListener('message', this.handleMessageEvent);
    this.socket.addEventListener('close', this.handleSocketCloseEvent);
  }

  private handleSocketOpenEvent = (): void => {
    this.reconnectAttempts = 0;
    this.reconnectModalShown = false;
    this.connectionLostModal.close();

    const loggedUser = sessionStorage.getItem('loggedUser');
    if (loggedUser) {
      try {
        const parsedData: unknown = JSON.parse(loggedUser);
        if (isLoggedUser(parsedData)) {
          this.sendLoginRequest(parsedData.username, parsedData.password);
        }
      } catch (error) {
        console.error('Error', error);
      }
    }
  };

  private handleMessageEvent = (event: MessageEvent<string>): void => {
    try {
      const message: unknown = JSON.parse(event.data);
      if (isWebSocketMessage(message)) {
        this.handleMessage(message);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  private handleSocketCloseEvent = (): void => {
    const user = this.currentUser;
    this.currentUser = null;
    if (user) {
      for (const handler of this.logoutHandlers) {
        handler({ login: user.login, isLogined: false });
      }
    }

    document.dispatchEvent(new CustomEvent('connectionLost'));

    if (!this.reconnectModalShown) {
      this.connectionLostModal.open();
      this.reconnectModalShown = true;
    }

    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => this.connect(), this.reconnectInterval);
    }
  };

  private handleMessage(message: WebSocketMessage<unknown>): void {
    this.handleAuthMessages(message);
    this.handleUserMessages(message);
    this.handleErrorMessage(message);
  }

  private handleAuthMessages(message: WebSocketMessage<unknown>): void {
    if (isWebSocketMessageWithPayload<UserLoginResponsePayload>(message, 'USER_LOGIN', 'user')) {
      this.handleLogin(message.payload.user);
      return;
    }

    if (isWebSocketMessageWithPayload<UserLogoutResponsePayload>(message, 'USER_LOGOUT', 'user')) {
      this.handleLogout(message.payload.user);
      return;
    }

    if (
      isWebSocketMessageWithPayload<UserLoginResponsePayload>(
        message,
        'USER_EXTERNAL_LOGIN',
        'user'
      )
    ) {
      this.handleOtherUserLogin(message.payload.user);
      return;
    }

    if (
      isWebSocketMessageWithPayload<UserLoginResponsePayload>(
        message,
        'USER_EXTERNAL_LOGOUT',
        'user'
      )
    ) {
      this.handleOtherUsersLogout(message.payload.user);
      return;
    }
  }

  private handleUserMessages(message: WebSocketMessage<unknown>): void {
    this.handleUserStatusMessages(message);
    this.handleMessageDeliveryMessages(message);
    this.handleMessageStatusMessages(message);
  }

  private handleUserStatusMessages(message: WebSocketMessage<unknown>): void {
    if (isWebSocketMessageWithPayload<UserActiveResponsePayload>(message, 'USER_ACTIVE', 'users')) {
      this.handleActiveUsers(message.payload.users);
      return;
    }

    if (
      isWebSocketMessageWithPayload<UserInactiveResponsePayload>(message, 'USER_INACTIVE', 'users')
    ) {
      this.handleInactiveUsers(message.payload.users);
      return;
    }
  }

  private handleMessageDeliveryMessages(message: WebSocketMessage<unknown>): void {
    if (
      isWebSocketMessageWithPayload<{ messages: UserMessage[] }>(
        message,
        'MSG_FROM_USER',
        'messages'
      )
    ) {
      this.handleMessageHistory(message.payload.messages);
      return;
    }

    if (isWebSocketMessageWithPayload<UserMessageResponsePayload>(message, 'MSG_SEND', 'message')) {
      this.handleUserMessageSent(message.payload.message);
      return;
    }
  }

  private handleMessageStatusMessages(message: WebSocketMessage<unknown>): void {
    if (
      isWebSocketMessageWithPayload<UserMessageDeleteResponsePayload>(
        message,
        'MSG_DELETE',
        'message'
      )
    ) {
      this.handleMessageDelete(message.payload.message);
      return;
    }

    if (
      isWebSocketMessageWithPayload<UserMessageEditResponsePayload>(message, 'MSG_EDIT', 'message')
    ) {
      this.handleMessageEdit(message.payload.message);
      return;
    }

    if (
      isWebSocketMessageWithPayload<UserMessageDeliveryResponsePayload>(
        message,
        'MSG_DELIVER',
        'message'
      )
    ) {
      this.handleMessageDelivered(message.payload.message);
      return;
    }

    if (
      isWebSocketMessageWithPayload<UserMessageReadResponsePayload>(message, 'MSG_READ', 'message')
    ) {
      this.handleMessageRead(message.payload.message);
      return;
    }
  }

  private handleErrorMessage(message: WebSocketMessage<unknown>): void {
    if (isWebSocketMessageWithPayload<ErrorResponsePayload>(message, 'ERROR', 'error')) {
      this.handleError(message.payload);
      return;
    }
  }

  private handleLogin(user: User): void {
    if (this) {
      this.currentUser = {
        login: user.login,
        password: this.userPassword,
      };
      for (const handler of this.loginHandlers) handler(user);
    }
  }

  private handleLogout(user: User): void {
    if (this) {
      this.currentUser = null;
      for (const handler of this.logoutHandlers) handler(user);
      document.dispatchEvent(new CustomEvent('userLogout'));
    }
  }

  private handleError(error: ErrorResponsePayload): void {
    if (this) {
      console.error('Error received:', error);
      const modal = new ServerErrorModal(error.error.toUpperCase());
      modal.open();
    }
  }

  private handleOtherUserLogin(user: User): void {
    if (this.otherUsersLoginHandler) {
      this.otherUsersLoginHandler(user);
    }
  }

  private handleOtherUsersLogout(user: User): void {
    if (this.otherUsersLogoutHandler) {
      this.otherUsersLogoutHandler(user);
    }
  }

  private handleActiveUsers(users: User[]): void {
    if (this.activeUsersHandler) {
      this.activeUsersHandler(users);
    }
  }

  private handleInactiveUsers(users: User[]): void {
    if (this.inactiveUsersHandler) {
      this.inactiveUsersHandler(users);
    }
  }

  private handleUserMessageSent(message: UserMessage): void {
    if (this) {
      for (const handler of this.userMessageHandlers) {
        handler(message);
      }
    }
  }

  private handleMessageHistory(messages: UserMessage[]): void {
    if (this) {
      for (const handler of this.messageHistoryHandlers) {
        handler(messages);
      }
    }
  }

  private handleMessageDelete(message: MessageDeleteStatus): void {
    if (this) {
      for (const handler of this.messageDeleteHandlers) {
        handler(message);
      }
    }
  }

  private handleMessageEdit(message: MessageEditStatus): void {
    if (this.messageEditHandler) {
      this.messageEditHandler(message);
    }
  }

  private handleMessageDelivered(message: MessageDeliveryStatus): void {
    if (this.messageDeliverHandler) {
      this.messageDeliverHandler(message);
    }
  }

  private handleMessageRead(message: MessageReadStatus): void {
    if (this) {
      for (const handler of this.messageReadHandlers) {
        handler(message);
      }
    }
  }
}
