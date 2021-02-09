import {NgModule} from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {AudioOptionComponent} from "./audio-option.component";
import {VideoOptionComponent} from "./video-option.component";
import {PresentOptionComponent} from "./present-option.component";
import {MicrophoneOptionComponent} from "./microphone-option.component";
import {RecordOptionComponent} from "./record-option.component";
import {CallOptionComponent} from "./call-option.component";
import {ChatOptionComponent} from "./chat-option.component";
import {SettingsOptionComponent} from "./settings-option.component";
import {MatTooltipModule} from '@angular/material/tooltip';
import {CommonModule} from '@angular/common';

const components = [
  AudioOptionComponent,
  VideoOptionComponent,
  PresentOptionComponent,
  MicrophoneOptionComponent,
  RecordOptionComponent,
  CallOptionComponent,
  ChatOptionComponent,
  SettingsOptionComponent
]

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    CommonModule
  ],
  declarations: components,
  exports: components
})
export class ElementsModule {
}
