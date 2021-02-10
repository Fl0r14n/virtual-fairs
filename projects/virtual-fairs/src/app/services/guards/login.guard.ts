import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SocketService} from '../socket.service';
import {tap} from 'rxjs/operators';
import {SocketEvent} from '../../models';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private socketService: SocketService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.socketService.from$<boolean>(SocketEvent.AUTHORIZATION).pipe(
      tap(authorized => {
        if (!authorized) {
          this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        }
      })
    )
  }
}
