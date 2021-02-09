import {OptionComponent} from './option.component';
import {Component} from '@angular/core';

@Component({
  selector: 'microphone-option',
  template: `
    <button mat-mini-fab
            [color]="value? 'accent': 'primary'"
            [matTooltip]="tooltip(value)"
            (click)="toggle()"
            *ngIf="!disabled">
      <mat-icon>{{value ? 'mic_off' : 'mic'}}</mat-icon>
    </button>
    <ng-content></ng-content>
  `
})
export class MicrophoneOptionComponent extends OptionComponent {

  tooltip(checked: boolean): string {
    return checked ? 'Mute microphone' : 'Unmute microphone';
  }
}
