import {Injectable} from '@angular/core';
import {SocketService} from './socket.service';
import {EntityDTO, PeerEvent, PeerEventDTO, SocketCall} from '../models';
import Peer from 'peerjs';
import {Observable, Subject} from 'rxjs';
import {AnonymousSubject} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class PeerService {

  private readonly _peer: Peer;
  user: EntityDTO;

  constructor(private socketService: SocketService) {
    this.user = {id: this.socketService.socket};
    this._peer = new Peer();
    this._peer.on('error', err => console.log(err));
    this._peer.on('disconnected', () => this._peer.reconnect());
    this._peer.on('open', peerId => {
      this.socketService.to<EntityDTO>(SocketCall.PEER, peerId).then(user => this.user = user);
    });
    this._peer.on('call', call => {
      // call.answer(localStream);
      // call.close();
      // call.on('stream', stream => {})
    });
    this._peer.on('connection', conn => {
      conn.on('data', data => {
      })
    });

  }

  call(peerId: string, stream: MediaStream): CallSubject {
    return new CallSubject(this._peer, peerId, stream);
  }

  connect(peerId: string) {
    const conn = this._peer.connect(peerId);
    conn.on('data', data => {
    });
    conn.on('close', () => {
    });
  }
}

class CallSubject extends AnonymousSubject<PeerEventDTO> {

  call: Peer.MediaConnection;

  constructor(peer: Peer, peerId: string, stream: MediaStream) {
    const observable = new Observable<PeerEventDTO>(subscriber => {
      this.call = peer.call(peerId, stream);
      subscriber.next({
        type: PeerEvent.CALL,
      });
      this.call.on('error', err => subscriber.error(err));
      this.call.on('stream', stream => subscriber.next({
        type: PeerEvent.STREAM,
        data: stream
      }));
      this.call.on('close', () => {
        subscriber.next({
          type: PeerEvent.CLOSE
        });
        subscriber.complete();
      });
    });
    // super(null, observable);
    super(null, observable)
  }

  next(value: PeerEventDTO): void {
    this.call && value.type === PeerEvent.CLOSE && this.call.close();
  }
}
