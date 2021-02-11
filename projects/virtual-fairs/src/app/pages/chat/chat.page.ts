import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ChatService} from '../../services/chat.service';
import {EntityDTO, RosterListDTO} from '../../models';

@Component({
  template: `
    <ng-container *ngIf="page$ | async as page">
      <mat-sidenav-container class="{{page}}" fxFill *ngIf="room$ | async as room">
        <mat-sidenav opened mode="side">
          <mat-toolbar>
            <mat-list>
              <mat-list-item>
                <img matListAvatar [src]="room.image">
                <span fxFlex="1 1 auto"></span>
                <h3 matLine>{{room.name}}</h3>
              </mat-list-item>
            </mat-list>
          </mat-toolbar>
          <mat-action-list *ngIf="roster$ | async as roster">
            <mat-list-item *ngFor="let user of roster">
              <img matListAvatar [src]="user.image">
              <span fxFlex="1 1 auto"></span>
              <h3 matLine [class.active]="isActiveUser(user)">{{user.name}}</h3>
            </mat-list-item>
          </mat-action-list>
        </mat-sidenav>
        <mat-sidenav-content>
          <chat [entity]="room" fxLayout="row" fxFill></chat>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </ng-container>
  `,
  styles: [`
    .active {
      font-weight: bold !important;
    }
  `]
})
export class ChatPageComponent {

  private _roomId;
  page$: Observable<string>;
  roster$: Observable<EntityDTO[]>;
  room$: Observable<EntityDTO>;

  constructor(route: ActivatedRoute,
              private chatService: ChatService) {
    this.page$ = route.params.pipe(
      map(v => v.roomId),
      tap(roomId => {
        if (this._roomId && this._roomId !== roomId) {
          this.chatService.leave(this._roomId);
        }
        this.chatService.join(roomId);
        this._roomId = roomId;
        this.roster$ = this.chatService.roster$(roomId).pipe(map(r => r.roster));
      })
    )
    this.room$ = this.chatService.room$;
  }

  isActiveUser(user) {
    return user.id === this.chatService.user.id;
  }
}
