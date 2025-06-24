import type { LanguageChangeEvent, LoggedUser, WebSocketMessage } from './interfaces';

export function isLanguageChangeEvent(event: Event): event is LanguageChangeEvent {
  return event instanceof CustomEvent && 'language' in event.detail;
}

export function isWebSocketMessage<T>(message: unknown): message is WebSocketMessage<T> {
  return typeof message === 'object' && message !== null && 'payload' in message;
}

export function isLoggedUser(data: unknown): data is LoggedUser {
  return typeof data === 'object' && data !== null && 'username' in data && 'password' in data;
}

export function isWebSocketMessageWithPayload<T>(
  message: WebSocketMessage<unknown>,
  type: string,
  payloadProperty: string
): message is WebSocketMessage<T> {
  return (
    typeof message === 'object' &&
    message !== null &&
    message.type === type &&
    typeof message.payload === 'object' &&
    message.payload !== null &&
    payloadProperty in message.payload
  );
}
