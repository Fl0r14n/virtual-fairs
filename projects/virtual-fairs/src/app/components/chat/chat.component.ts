import {Component, Input} from '@angular/core';
import {EntityDTO, EventDTO, SocketEvent} from '../../models';
import {ChatService} from '../../services/chat.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'chat',
  template: `
    <mat-card>
      <mat-card-header>
        <img mat-card-avatar [src]="entity.image">
        <mat-card-title>{{entity.name}}</mat-card-title>
        <mat-card-subtitle>{{entity.description}}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <mat-list *ngIf="events$ | async as events">
          <ng-container *ngFor="let event of events">
            <ng-container *ngIf="event.type === type.ROOM_USER_CONNECT">
              <div mat-subheader fxLayoutAlign="center">
                {{event.data.name}}&nbsp;connected,&nbsp;{{event.timestamp | date:'shortTime'}}
              </div>
            </ng-container>
            <ng-container *ngIf="event.type === type.ROOM_USER_DISCONNECT">
              <div mat-subheader fxLayoutAlign="center">
                {{event.data.name}}&nbsp&nbsp;disconnected&nbsp;{{event.timestamp | date:'shortTime'}}
              </div>
            </ng-container>
            <ng-container *ngIf="event.type === type.ROOM_MESSAGE">
              <mat-list-item mat-subheader *ngIf="event.data.from as from" [fxLayoutAlign]="align(from)">
                <img matListAvatar [src]="from.image">
                <span>{{from.name}}, {{event.timestamp | date:'shortTime'}}</span>
              </mat-list-item>
              <mat-list-item [fxLayoutAlign]="align(event.data.from)">
                {{event.data.message}}
              </mat-list-item>
            </ng-container>
          </ng-container>
        </mat-list>
      </mat-card-content>
      <mat-card-actions>
        <mat-form-field>
          <mat-label>Message</mat-label>
          <input matInput [(ngModel)]="message" (keydown.enter)="send()">
          <button mat-button matSuffix (click)="send()">
            <mat-icon>send</mat-icon>
          </button>
        </mat-form-field>
      </mat-card-actions>
    </mat-card>
  `
})
export class ChatComponent {

  @Input()
  entity: EntityDTO;
  message: string;
  events$: Observable<EventDTO[]>;
  type = SocketEvent;

  constructor(private chatService: ChatService) {
    this.events$ = this.chatService.events$;
  }

  send() {
    this.message && this.message.length > 0 && this.chatService.send(this.message);
  }

  align(from: EntityDTO) {
    return from.id === this.chatService.user.id ? 'end' : 'start'
  }
}
