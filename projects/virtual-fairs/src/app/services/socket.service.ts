import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {io} from 'socket.io-client';
import {environment} from '../../environments/environment';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket;
  observables$ = {};

  constructor() {
    this.socket = io(environment.wsUrl || '');
  }

  from$<T>(name: string): Observable<T> {
    if (!this.observables$[name]) {
      this.observables$[name] = new Observable<T>(subscriber => {
        const listener = (data: T) => subscriber.next(data);
        this.socket.on(name, listener);
        return () => this.socket.removeListener(name, listener);
      }).pipe(shareReplay(1));
    }
    return this.observables$[name]
  }

  to<T>(name: string, ...data: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.socket.emit(name, ...data, resolve);
    })
  }
}
