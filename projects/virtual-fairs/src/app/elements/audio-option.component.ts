import {Component} from '@angular/core';
import {OptionComponent} from './option.component';

@Component({
  selector: 'audio-option',
  template: `
    <button mat-mini-fab
            [color]="value? 'accent': 'primary'"
            [matTooltip]="tooltip(value)"
            (click)="toggle()"
            *ngIf="!disabled">
      <mat-icon>{{value ? 'volume_mute' : 'volume_up'}}</mat-icon>
    </button>
    <ng-content></ng-content>
  `
})
export class AudioOptionComponent extends OptionComponent {

  tooltip(checked: boolean): string {
    return checked ? 'Disable audio' : 'Enable audio';
  }
}
