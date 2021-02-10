import {Component, Input} from '@angular/core';
import {EntityDTO, EventDTO, MessageDTO, SocketEvent} from '../../models';
import {ChatService} from '../../services/chat.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'chat',
  styles: [`
    mat-card-content {
      overflow-y: auto;
    }
  `],
  template: `
    <mat-card fxFlex="grow" fxLayout="column">
      <mat-card-header>
        <img mat-card-avatar [src]="entity.image">
        <mat-card-title>{{entity.name}}</mat-card-title>
        <mat-card-subtitle>{{entity.description}}</mat-card-subtitle>
        <span fxFlex="1 1 auto"></span>
        <call-option></call-option>
      </mat-card-header>
      <mat-card-content fxFlex="1 1 auto">

        <mat-list *ngIf="events$ | async as events">
          <ng-container *ngFor="let event of events; index as i">
            <ng-container *ngIf="event.type === type.ROOM_USER_CONNECT">
              <div mat-subheader fxLayoutAlign="center">
                {{event.data.name}}&nbsp;connected,&nbsp;{{event.timestamp | date:'shortTime'}}
              </div>
            </ng-container>
            <ng-container *ngIf="event.type === type.ROOM_USER_DISCONNECT">
              <div mat-subheader fxLayoutAlign="center">
                {{event.data.name}}&nbsp;disconnected&nbsp;{{event.timestamp | date:'shortTime'}}
              </div>
            </ng-container>
            <ng-container *ngIf="event.type === type.ROOM_MESSAGE">
              <ng-container *ngIf="showSender(event, i, events)">
                <mat-list-item mat-subheader *ngIf="event.data.from as from" [fxLayoutAlign]="align(from)">
                  <img matListAvatar [src]="from.image">
                  <span>{{from.name}}, {{event.timestamp | date:'shortTime'}}</span>
                </mat-list-item>
              </ng-container>
              <mat-list-item [fxLayoutAlign]="align(event.data.from)">
                {{event.data.message}}
              </mat-list-item>
            </ng-container>
          </ng-container>
        </mat-list>

      </mat-card-content>
      <div>
        <mat-card-actions fxLayoutAlign="center">
          <div fxFlex="60%">
            <mat-form-field fxFlex="grow">
              <mat-label>Message</mat-label>
              <input matInput [(ngModel)]="message" (keydown.enter)="send()">
              <button mat-button matSuffix (click)="send()">
                <mat-icon>send</mat-icon>
              </button>
            </mat-form-field>
          </div>
        </mat-card-actions>
      </div>
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

  showSender(event: EventDTO, i: number, events: EventDTO[]) {
    if (i > 0) {
      const previous = events[i - 1];
      if (previous.type === SocketEvent.ROOM_MESSAGE) {
        const message = event.data as MessageDTO;
        const previousMessage = previous.data as MessageDTO;
        return message.from.id !== previousMessage.from.id;
      }
    }
    return true;
  }
}
