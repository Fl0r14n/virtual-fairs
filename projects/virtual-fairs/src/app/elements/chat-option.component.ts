import {Component} from '@angular/core';
import {OptionComponent} from './option.component';

@Component({
  selector: 'chat-option',
  template: `
    <button mat-mini-fab
            [color]="value ? undefined : 'primary'"
            [matTooltip]="tooltip(value)"
            (click)="toggle()"
            *ngIf="!disabled">
      <mat-icon>chat</mat-icon>
    </button>
    <ng-content></ng-content>
  `
})
export class ChatOptionComponent extends OptionComponent {

  tooltip(checked: boolean): string {
    return checked ? 'Hide chat' : 'Show chat';
  }
}
