import {Component} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {SocketService} from '../../services/socket.service';
import {EntityDTO, SocketEvent} from '../../models';
import {Observable} from 'rxjs';

@Component({
  template: `
    <div class="container" fxFill fxLayout="column" [class.mobile]="mobileQuery.matches">
      <mat-toolbar color="primary" class="toolbar">
        <button mat-icon-button (click)="snav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <h1 class="logo">Virtual Fairs</h1>
      </mat-toolbar>
      <mat-sidenav-container class="sidenav-container" [style.marginTop.px]="mobileQuery.matches ? 56 : 0">
        <mat-sidenav #snav
                     fixedTopGap="56"
                     [mode]="mobileQuery.matches ? 'over' : 'side'"
                     [fixedInViewport]="mobileQuery.matches">
          <mat-nav-list *ngIf="rooms$ | async as rooms">
            <a mat-list-item
               [routerLink]="getRoomLink(room.id)"
               (click)="snav.toggle()"
               *ngFor="let room of rooms">
              <img matListAvatar [src]="room.image">
              <h3 matLine>{{room.name}}</h3>
            </a>
          </mat-nav-list>
        </mat-sidenav>
        <mat-sidenav-content>
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styleUrls: ['layout.page.scss']
})
export class LayoutPageComponent {

  mobileQuery: MediaQueryList;
  rooms$: Observable<EntityDTO>;

  constructor(media: MediaMatcher,
              socketService: SocketService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.rooms$ = socketService.from$<EntityDTO>(SocketEvent.ROOMS);
  }

  getRoomLink(id) {
    return `/room/${id}`;
  }
}
