// import {Injectable} from '@angular/core';
// import {io} from 'socket.io-client';
// import {Observable, Subject} from "rxjs";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class TestService {
//
//
//   // eventObservables$: Record<string, Observable<any>> = {};
//   //
//   private socket;
//   //
//   open(path?: string) {
//     this.socket = io(path || 'http://localhost:4200/');
//     let observable = new Observable(observer => {
//       this.socket.on('message', (data) => {
//         console.log("Received message from Websocket Server")
//         observer.next(data);
//       })
//       return () => {
//         this.socket.disconnect();
//       }
//     });
//
//     // We define our Observer which will listen to messages
//     // from our other components and send messages back to our
//     // socket server whenever the `next()` method is called.
//     let observer = {
//       next: (data: Object) => {
//         this.socket.emit('message', JSON.stringify(data));
//       },
//     };
//
//     // we return our Rx.Subject which is a combination
//     // of both an observer and observable.
//     return Subject.create(observer, observable);
//     // socket.emit('join-room', 'roomID', 'userID');
//   }
//
//
//   // fromEvent<T>(eventName: string): Observable<T> {
//   //   if (!this.subscribersCounter[eventName]) {
//   //     this.subscribersCounter[eventName] = 0;
//   //   }
//   //   this.subscribersCounter[eventName]++;
//   //
//   //   if (!this.eventObservables$[eventName]) {
//   //     this.eventObservables$[eventName] = new Observable((observer: any) => {
//   //       const listener = (data: T) => {
//   //         observer.next(data);
//   //       };
//   //       this.ioSocket.on(eventName, listener);
//   //       return () => {
//   //         this.subscribersCounter[eventName]--;
//   //         if (this.subscribersCounter[eventName] === 0) {
//   //           this.ioSocket.removeListener(eventName, listener);
//   //           delete this.eventObservables$[eventName];
//   //         }
//   //       };
//   //     }).pipe(
//   //       share()
//   //     );
//   //   }
//   //   return this.eventObservables$[eventName];
//   // }
// }
