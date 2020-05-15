import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ChatroomComponent } from "./components/chatroom/chatroom.component";
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ChatdetailComponent } from "./components/chatdetail/chatdetail.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToChatroom = () => redirectLoggedInTo(['chatroom']);

const routes: Routes = [
  { path: ''        , component: LoginComponent },
  { path: 'login'   , component: LoginComponent   , canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToChatroom } },
  { path: 'register', component: RegisterComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToChatroom } },
  { path: 'chatroom', component: ChatroomComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } ,
    children: [
      {
        path: 'chat/:chatId',
        component: ChatdetailComponent
      }
    ],
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
