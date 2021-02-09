import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SocketService} from '../socket.service';
import {SocketEvent} from '../../models';

@Injectable({
  providedIn: 'root'
})
export class SocketGuard implements CanActivate {

  constructor(private socketService: SocketService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.socketService.from$<boolean>(SocketEvent.CONNECTED);
  }
}
