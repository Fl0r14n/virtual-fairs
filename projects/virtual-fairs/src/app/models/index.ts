import {Observer} from 'rxjs';

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
  ROOM_MESSAGE = 'room:message',
  ROOM_CALL = 'room:call',
  ROOM_CALL_CONNECT = 'room:call:connect',
  ROOM_CALL_DISCONNECT = 'room:call:disconnect'
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
  ROOM_CALL = 'room:call',
  ROOM_CALL_CONNECT = 'room:call:connect',
  ROOM_CALL_DISCONNECT = 'room:call:disconnect'
}

export enum PeerEvent {
  CALL,
  STREAM,
  CLOSE,
  DATA
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

export interface RoomMessageDTO extends RoomDTO {
  from: EntityDTO;
  to?: EntityDTO;
  message?: string;
}

export interface RoomEntityDTO extends RoomDTO, EntityDTO {
}

export interface RoomRosterDTO extends RoomDTO {
  roster?: EntityDTO[];
}

export interface EventDTO extends RoomDTO {
  type: SocketEvent;
  timestamp: Date;

  [x: string]: any;
}

export interface PeerEventDTO {
  type: PeerEvent,
  // to: string;
  // from: string;
  data?: MediaStream,
}
