import {Injectable} from '@angular/core';
import {SocketService} from './socket.service';
import Peer from 'peerjs';
import {EntityDTO, EventDTO, MessageDTO, RosterDTO, RosterListDTO, SocketCall, SocketEvent} from '../models';
import {merge, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

const toEvent = (e: RosterDTO | MessageDTO, type: SocketEvent): EventDTO => {
  return {
    roomId: e.roomId,
    type,
    data: e,
    timestamp: new Date()
  }
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _peer: Peer;
  private _roster$: Observable<RosterListDTO>;
  private _roomUserConnect$: Observable<EventDTO>;
  private _roomUserDisconnect$: Observable<EventDTO>;
  private _roomMessage$: Observable<EventDTO>;
  room$: Observable<EntityDTO>;
  user: EntityDTO;

  constructor(private socketService: SocketService) {
    this.user = {id: this.socketService.socket};
    this._peer = new Peer();
    this._peer.on('open', peerId => {
      this.socketService.to<EntityDTO>(SocketCall.PEER, peerId).then(user => this.user = user);
    })
    this.room$ = this.socketService.from$<EntityDTO>(SocketEvent.ROOM);
    this._roster$ = this.socketService.from$<RosterListDTO>(SocketEvent.ROOM_ROSTER);
    this._roomUserConnect$ = this.socketService.from$<RosterDTO>(SocketEvent.ROOM_USER_CONNECT).pipe(
      map(e => toEvent(e, SocketEvent.ROOM_USER_CONNECT))
    );
    this._roomUserDisconnect$ = this.socketService.from$<RosterDTO>(SocketEvent.ROOM_USER_DISCONNECT).pipe(
      map(e => toEvent(e, SocketEvent.ROOM_USER_DISCONNECT))
    );
    this._roomMessage$ = this.socketService.from$<MessageDTO>(SocketEvent.ROOM_MESSAGE).pipe(
      map(e => toEvent(e, SocketEvent.ROOM_MESSAGE))
    );
  }

  roster$(roomId: string): Observable<RosterListDTO> {
    return this._roster$.pipe(filter(r => r.roomId === roomId));
  }

  events$(roomId: string): Observable<EventDTO[]> {
    const events = [];
    return merge(this._roomUserConnect$, this._roomUserDisconnect$, this._roomMessage$).pipe(
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
}
