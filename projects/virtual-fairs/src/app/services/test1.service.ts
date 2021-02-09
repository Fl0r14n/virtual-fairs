// import {Injectable} from '@angular/core';
// import {TestService} from './socket.service';
// import {ReplaySubject, Subject} from 'rxjs';
// import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
// import {WsMessage} from '../models';
// import {io} from 'socket.io-client';
// import Peer from 'peerjs';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class Test1Service {
//
//   // messages: Subject<any>;
//   //
//   // // Our constructor calls our wsService connect method
//   // constructor(private wsService: SocketService) {
//   //   this.messages = <Subject<any>>wsService
//   //     .open()
//   //     .map((response: any): any => {
//   //       return response;
//   //     })
//   // }
//   //
//   // // Our simplified interface for sending
//   // // messages back to our socket.io server
//   // sendMsg(msg) {
//   //   this.messages.next(msg);
//   // }
//
//   // private socket$: WebSocketSubject<WsMessage>;
//   // messages$: ReplaySubject<WsMessage> = new ReplaySubject();
//   //
//   // connect(path?: string) {
//   //   this.socket$ = webSocket({
//   //     url: path || 'ws://localhost:4000/',
//   //     openObserver: {
//   //       next: () => console.log('Socket Connection OK')
//   //     },
//   //     closeObserver: {
//   //       next: () => console.log('Socket Closed')
//   //       // some retry functionality
//   //     }
//   //   })
//   //   this.socket$.subscribe(v => this.messages$.next(v));
//   // }
//   //
//   // send(m: WsMessage) {
//   //   console.log(m);
//   //   this.socket$.next(m);
//   // }
//
//   private socket;
//   private peers = {};
//
//   constructor() {
//     const localStream = null;
//     this.socket = io('ws://localhost:4000/');
//     const peer = new Peer();
//     peer.on('open', userId => {
//       console.log(userId);
//       // inform others of my existence
//       this.socket.emit('join-room', 'room', userId)
//     })
//
//     peer.on('call', call => {
//       //answer
//       call.answer(localStream);
//       call.on('stream', userStream => {
//         //add user stream in video
//       })
//     })
//
//     //chat connection
//     peer.on('connection', conn => {
//       conn.on('data', data => {
//         console.log(data);
//       })
//     })
//
//     this.socket.on('user-connected', userId => {
//       console.log('User connected', userId);
//
//       //call the user
//       // const call = peer.call(userId, localStream);
//       // call.on('stream', userStream => {
//       //   //pass it to video
//       // })
//       // call.on('close', () => {
//       //   //remove the video
//       // })
//
//       // this.peers[userId] = call;
//
//       //DM chat functionality
//       // const chat = peer.connect(userId);
//       // chat.on('open', ()=> {
//       //   chat.send('Hi!')
//       // })
//     });
//
//     this.socket.on('user-disconnected', userId => {
//       console.log('User disconnected', userId);
//       if (this.peers[userId]) {
//         this.peers[userId].close();
//       }
//     })
//   }
// }
