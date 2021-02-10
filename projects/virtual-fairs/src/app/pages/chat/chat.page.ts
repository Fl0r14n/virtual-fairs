import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ChatService} from '../../services/chat.service';
import {EntityDTO, EventDTO} from '../../models';

@Component({
  styleUrls: ['chat.page.scss'],
  template: `
    <ng-container *ngIf="page$ | async as page">
      <mat-sidenav-container class="container {{page}}" *ngIf="room$ | async as room">
        <mat-sidenav opened mode="side">
          <mat-toolbar>
            <mat-list>
              <mat-list-item>
                <img matListAvatar [src]="room.image">
                <span class="spacer"></span>
                <h3 matLine>{{room.name}}</h3>
              </mat-list-item>
            </mat-list>
          </mat-toolbar>
          <mat-action-list *ngIf="roster$ | async as roster">
            <mat-list-item *ngFor="let user of roster">
              <img matListAvatar [src]="user.image">
              <span class="spacer"></span>
              <h3 matLine [class.active]="isActiveUser(user)">{{user.name}}</h3>
            </mat-list-item>
          </mat-action-list>
        </mat-sidenav>
        <mat-sidenav-content>
          <chat [entity]="room" fxLayout="row" fxFill></chat>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </ng-container>
  `
})
export class ChatPageComponent {

  page$: Observable<string>;
  roster$: Observable<EntityDTO[]>;
  room$: Observable<EntityDTO>;
  events$: Observable<EventDTO[]>

  constructor(route: ActivatedRoute,
              private chatService: ChatService) {
    this.page$ = route.params.pipe(
      map(v => v.roomId),
      tap(id => this.chatService.join(id))
    )
    this.roster$ = this.chatService.roster$;
    this.room$ = this.chatService.room$;
  }

  isActiveUser(user) {
    return user.id === this.chatService.user.id;
  }
}
