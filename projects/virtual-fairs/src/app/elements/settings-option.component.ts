import {Component} from '@angular/core';
import {OptionComponent} from './option.component';

@Component({
  selector: 'settings-option',
  template: `
    <button mat-mini-fab
            [color]="value ? undefined : 'primary'"
            [matTooltip]="tooltip(value)"
            (click)="toggle()"
            *ngIf="!disabled">
      <mat-icon>settings</mat-icon>
    </button>
    <ng-content></ng-content>
  `
})
export class SettingsOptionComponent extends OptionComponent {

  tooltip(checked: boolean): string {
    return checked ? 'Hide settings' : 'Show settings';
  }
}
