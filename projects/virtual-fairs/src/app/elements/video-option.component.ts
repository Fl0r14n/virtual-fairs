import {OptionComponent} from './option.component';
import {Component} from '@angular/core';

@Component({
  selector: 'video-option',
  template: `
    <button mat-mini-fab
            [color]="value? 'accent': 'primary'"
            [matTooltip]="tooltip(value)"
            (click)="toggle()"
            *ngIf="!disabled">
      <mat-icon>{{value ? 'videocam_off' : 'videocam'}}</mat-icon>
    </button>
    <ng-content></ng-content>
  `
})
export class VideoOptionComponent extends OptionComponent {

  tooltip(checked: boolean): string {
    return checked ? 'Disable video' : 'Enable video';
  }
}
