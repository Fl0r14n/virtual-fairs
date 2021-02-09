import {Component, Input} from '@angular/core';
import {OptionElement, OptionType} from '../../models';

@Component({
  selector: 'call-settings',
  template: `
    <mat-toolbar class="call-settings">
      <microphone-option [(value)]="option.value"
                         (valueChange)="option.valueChanged ? option.valueChanged($event) : undefined"
                         [name]="option.name"
                         [disabled]="option.disabled"
                         *ngIf="get(optionType.AUDIO) as option"></microphone-option>
      <video-option [(value)]="option.value"
                    (valueChange)="option.valueChanged ? option.valueChanged($event) : undefined"
                    [name]="option.name"
                    [disabled]="option.disabled"
                    *ngIf="get(optionType.VIDEO) as option"></video-option>
      <present-option [(value)]="option.value"
                      (valueChange)="option.valueChanged ? option.valueChanged($event) : undefined"
                      [name]="option.name"
                      [disabled]="option.disabled"
                      *ngIf="get(optionType.DISPLAY) as option"></present-option>
      <record-option [(value)]="option.value"
                     (valueChange)="option.valueChanged ? option.valueChanged($event) : undefined"
                     [name]="option.name"
                     [disabled]="option.disabled"
                     *ngIf="get(optionType.RECORD) as option"></record-option>
      <call-option [(value)]="option.value"
                   (valueChange)="option.valueChanged ? option.valueChanged($event) : undefined"
                   [name]="option.name"
                   [disabled]="option.disabled"
                   *ngIf="get(optionType.CALL) as option"></call-option>
      <chat-option [(value)]="option.value"
                   (valueChange)="option.valueChanged ? option.valueChanged($event) : undefined"
                   [name]="option.name"
                   [disabled]="option.disabled"
                   *ngIf="get(optionType.CHAT) as option"></chat-option>
      <settings-option [(value)]="option.value"
                       (valueChange)="option.valueChanged ? option.valueChanged($event) : undefined"
                       [name]="option.name"
                       [disabled]="option.disabled"
                       *ngIf="get(optionType.SETTINGS) as option"></settings-option>
    </mat-toolbar>
  `,
  styleUrls: ['call-settings.component.scss'],
})
export class CallSettingsComponent {

  optionType = OptionType;

  @Input()
  options: Record<OptionType, OptionElement<boolean>>;

  get(type: OptionType) {
    const option = this.options[type];
    if (option && !option.disabled) {
      return option;
    }
  }
}
