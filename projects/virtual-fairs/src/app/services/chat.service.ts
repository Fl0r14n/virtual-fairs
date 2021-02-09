import {Injectable} from '@angular/core';
import {SocketService} from './socket.service';
import Peer from 'peerjs';
import {EntityDTO, EventDTO, MessageDTO, SocketCall, SocketEvent} from '../models';
import {merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  roster$: Observable<EntityDTO[]>;
  room$: Observable<EntityDTO>;
  private peer: Peer;
  events$: Observable<EventDTO[]>;
  user: EntityDTO;

  constructor(private socketService: SocketService) {
    this.user = {id: this.socketService.socket};
    this.peer = new Peer();
    this.peer.on('open', peerId => {
      this.socketService.to<EntityDTO>(SocketCall.PEER, peerId).then(user => this.user = user);
    })
    this.room$ = this.socketService.from$<EntityDTO>(SocketEvent.ROOM);
    this.roster$ = this.socketService.from$<EntityDTO[]>(SocketEvent.ROOM_ROSTER);

    const roomUserConnect$: Observable<EventDTO> = this.socketService.from$<EntityDTO>(SocketEvent.ROOM_USER_CONNECT).pipe(
      map(e => {
        return {
          type: SocketEvent.ROOM_USER_CONNECT,
          data: e,
          timestamp: new Date()
        }
      })
    );
    const roomUserDisconnect$: Observable<EventDTO> = this.socketService.from$<EntityDTO>(SocketEvent.ROOM_USER_DISCONNECT).pipe(
      map(e => {
        return {
          type: SocketEvent.ROOM_USER_DISCONNECT,
          data: e,
          timestamp: new Date()
        }
      })
    );
    const roomMessage$: Observable<EventDTO> = this.socketService.from$<MessageDTO>(SocketEvent.ROOM_MESSAGE).pipe(
      map(e => {
        return {
          type: SocketEvent.ROOM_MESSAGE,
          data: e,
          timestamp: new Date()
        }
      })
    );
    const events: EventDTO[] = [];
    this.events$ = merge(roomUserConnect$, roomUserDisconnect$, roomMessage$).pipe(
      map(e => {
        events.push(e);
        return events;
      })
    );
  }

  async join(roomId: string) {
    await this.socketService.to(SocketCall.ROOM_CONNECT, roomId);
  }

  send(message: string) {
    this.socketService.to(SocketCall.ROOM_MESSAGE, this.user, message);
  }
}
