import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutPageComponent} from './pages/layout/layout.page';
import {SocketGuard} from './services/guards/socket.guard';
import {LoginPageComponent} from './pages/login/login.page';
import {LoginGuard} from './services/guards/login.guard';
import {RoomPageComponent} from './pages/room/room.page';
import {ChatPageComponent} from './pages/chat/chat.page';

const routes: Routes = [
  {
    path: '',
    canActivate: [SocketGuard],
    component: LayoutPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'room'
      },
      {
        path: 'room',
        canActivate: [LoginGuard],
        component: RoomPageComponent,
        children: [
          {
            path: ':roomId',
            component: ChatPageComponent
          }
        ]
      },
      {
        path: 'login',
        component: LoginPageComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    // enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
