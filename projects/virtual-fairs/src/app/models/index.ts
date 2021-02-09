export enum OptionType {
  AUDIO,
  VIDEO,
  DISPLAY,
  RECORD,
  CALL,
  CHAT,
  SETTINGS
}

export interface OptionElement<T> {
  name?: string;
  value: T;
  disabled?: boolean
  valueChanged?: (T) => void;
}

export interface EntityDTO {
  id: string;
  name?: string;
  description?: string;
  image?: string
  peerId?: string;
}

export interface MessageDTO {
  from: EntityDTO;
  to?: EntityDTO;
  message?: string;
}

export enum SocketCall {
  LOGIN = 'login',
  LOGOUT = 'logout',
  PEER = 'peer',
  ROOM_CONNECT = 'room:connect',
  ROOM_MESSAGE = 'room:message'
}

export enum SocketEvent {
  CONNECTED = 'connected',
  AUTHORIZATION = 'authorization',
  ROOMS = 'rooms',
  ROOM = 'room',
  ROOM_ROSTER = 'room:roster',
  ROOM_USER_CONNECT = 'room:user:connect',
  ROOM_USER_DISCONNECT = 'room:user:disconnect',
  ROOM_MESSAGE = 'room:message',
}

export interface EventDTO {
  type: SocketEvent,
  data: MessageDTO | EntityDTO;
  timestamp: Date
}
