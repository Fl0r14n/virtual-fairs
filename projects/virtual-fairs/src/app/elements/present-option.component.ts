import {OptionComponent} from './option.component';
import {Component} from '@angular/core';

@Component({
  selector: 'present-option',
  template: `
    <button mat-mini-fab
            [color]="value? 'accent': 'primary'"
            [matTooltip]="tooltip(value)"
            (click)="toggle()"
            *ngIf="!disabled">
      <mat-icon>{{value ? 'cancel_presentation' : 'present_to_all'}}</mat-icon>
    </button>
    <ng-content></ng-content>
  `
})
export class PresentOptionComponent extends OptionComponent {

  tooltip(checked: boolean): string {
    return checked ? 'Stop presenting' : 'Start presenting';
  }
}
