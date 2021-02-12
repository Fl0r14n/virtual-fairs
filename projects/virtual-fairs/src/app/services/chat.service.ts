import {Injectable} from '@angular/core';
import {SocketService} from './socket.service';
import {
  EntityDTO,
  EventDTO,
  RoomMessageDTO,
  RoomDTO,
  RoomEntityDTO,
  RoomRosterDTO,
  SocketCall,
  SocketEvent
} from '../models';
import {merge, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {PeerService} from './peer.service';

const toEvent = (e: RoomEntityDTO | RoomMessageDTO | RoomDTO, type: SocketEvent): EventDTO => {
  return {
    type,
    timestamp: new Date(),
    ...e
  }
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _events$: Observable<EventDTO>;
  private _roster$: Observable<RoomRosterDTO>;
  room$: Observable<EntityDTO>;

  get user() {
    return this.peerService.user;
  }

  constructor(private socketService: SocketService,
              private peerService: PeerService) {
    this.room$ = this.socketService.from$<EntityDTO>(SocketEvent.ROOM);
    this._roster$ = this.socketService.from$<RoomRosterDTO>(SocketEvent.ROOM_ROSTER);
    const roomUserConnect$ = this.socketService.from$<RoomEntityDTO>(SocketEvent.ROOM_USER_CONNECT).pipe(
      map(e => toEvent(e, SocketEvent.ROOM_USER_CONNECT))
    );
    const roomUserDisconnect$ = this.socketService.from$<RoomEntityDTO>(SocketEvent.ROOM_USER_DISCONNECT).pipe(
      map(e => toEvent(e, SocketEvent.ROOM_USER_DISCONNECT))
    );
    const roomMessage$ = this.socketService.from$<RoomMessageDTO>(SocketEvent.ROOM_MESSAGE).pipe(
      map(e => toEvent(e, SocketEvent.ROOM_MESSAGE))
    );
    const roomCall$ = this.socketService.from$<RoomDTO>(SocketEvent.ROOM_CALL).pipe(
      map(e => toEvent(e, SocketEvent.ROOM_CALL))
    );
    const roomCallConnect$ = this.socketService.from$<RoomEntityDTO>(SocketEvent.ROOM_CALL_CONNECT).pipe(
      map(e => toEvent(e, SocketEvent.ROOM_CALL_CONNECT))
    );
    const roomCallDisconnect$ = this.socketService.from$<RoomEntityDTO>(SocketEvent.ROOM_CALL_DISCONNECT).pipe(
      map(e => toEvent(e, SocketEvent.ROOM_CALL_DISCONNECT))
    );
    this._events$ = merge(roomUserConnect$, roomUserDisconnect$, roomMessage$);
  }

  roster$(roomId: string): Observable<RoomRosterDTO> {
    return this._roster$.pipe(filter(r => r.roomId === roomId));
  }

  events$(roomId: string): Observable<EventDTO[]> {
    const events = [];
    return this._events$.pipe(
      filter(e => e.roomId === roomId),
      map(e => {
        events.push(e);
        return events;
      })
    );
  }

  async join(roomId: string) {
    await this.socketService.to(SocketCall.ROOM_CONNECT, roomId);
  }

  async leave(roomId: string) {
    await this.socketService.to(SocketCall.ROOM_DISCONNECT, roomId);
  }

  async send(roomId: string, message: string) {
    await this.socketService.to(SocketCall.ROOM_MESSAGE, roomId, this.user, message);
  }

  async call(roomId: string) {
    await this.socketService.to(SocketCall.ROOM_CALL, roomId);
  }

  async callAnswer(roomId: string) {
    await this.socketService.to(SocketCall.ROOM_CALL_CONNECT, this.user);
  }

  async callDrop(roomId: string) {
    await this.socketService.to(SocketCall.ROOM_CALL_DISCONNECT, this.user);
  }
}
