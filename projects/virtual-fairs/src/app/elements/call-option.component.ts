import {OptionComponent} from './option.component';
import {Component} from '@angular/core';

@Component({
  selector: 'call-option',
  template: `
    <button mat-mini-fab
            [color]="value ? 'warn' : 'primary'"
            [matTooltip]="tooltip(value)"
            (click)="toggle()"
            *ngIf="!disabled">
      <mat-icon>{{value ? 'call_end' : 'call'}}</mat-icon>
    </button>
    <ng-content></ng-content>
  `
})
export class CallOptionComponent extends OptionComponent {

  tooltip(checked: boolean): string {
    return checked ? 'End call' : 'Call';
  }
}
