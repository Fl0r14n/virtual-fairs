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

export enum SocketCall {
  LOGIN = 'login',
  LOGOUT = 'logout',
  PEER = 'peer',
  ROOM_CONNECT = 'room:connect',
  ROOM_DISCONNECT = 'room:disconnect',
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

export interface EntityDTO {
  id: string;
  name?: string;
  description?: string;
  image?: string
  peerId?: string;
}

export interface RoomDTO {
  roomId: string;
}

export interface MessageDTO extends RoomDTO {
  from: EntityDTO;
  to?: EntityDTO;
  message?: string;
}

export interface RosterDTO extends RoomDTO, EntityDTO {
}

export interface RosterListDTO extends RoomDTO {
  roster?: EntityDTO[];
}

export interface EventDTO extends RoomDTO {
  type: SocketEvent,
  data: MessageDTO | RosterDTO;
  timestamp: Date
}
