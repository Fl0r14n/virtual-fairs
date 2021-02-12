import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {ElementsModule} from './elements/elements.module';
import {CallSettingsComponent} from './components/call-settings/call-settings.component';
import {LayoutPageComponent} from './pages/layout/layout.page';
import {ErrorPageComponent} from './pages/error/error.page';
import {LoginPageComponent} from './pages/login/login.page';
import {RoomPageComponent} from './pages/room/room.page';
import {ChatPageComponent} from './pages/chat/chat.page';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {ChatComponent} from './components/chat/chat.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FlexModule} from "@angular/flex-layout";
import {CallPageComponent} from './pages/call/call.page';

const components = [
  CallSettingsComponent,
  AppComponent,
  LayoutPageComponent,
  ErrorPageComponent,
  LoginPageComponent,
  RoomPageComponent,
  ChatPageComponent,
  LoginComponent,
  ChatComponent,
  CallPageComponent
]

@NgModule({
  declarations: [
    components,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    ElementsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule,
    FlexModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
