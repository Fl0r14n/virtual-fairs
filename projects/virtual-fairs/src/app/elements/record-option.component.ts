import {Component} from '@angular/core';
import {OptionComponent} from './option.component';

@Component({
  selector: 'record-option',
  template: `
    <button mat-mini-fab
            [color]="value ? 'warn' : 'primary'"
            [matTooltip]="tooltip(value)"
            (click)="toggle()"
            *ngIf="!disabled">
      <mat-icon>{{value ? 'stop' : 'fiber_manual_record'}}</mat-icon>
    </button>
    <ng-content></ng-content>
  `
})
export class RecordOptionComponent extends OptionComponent {

  tooltip(checked: boolean): string {
    return checked ? 'Stop recording' : 'Start recording';
  }
}
