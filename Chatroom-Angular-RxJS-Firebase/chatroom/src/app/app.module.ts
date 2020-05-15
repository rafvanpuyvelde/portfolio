import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { ChatComponent } from './components/chat/chat.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/register/register.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {TruncatePipe} from './pipes/truncatepipe';
import { ChatdetailComponent } from './components/chatdetail/chatdetail.component';
import { ToDatePipe } from './pipes/to-date.pipe';

const config = {
  apiKey: 'AIzaSyCnb_Umpwtbu-byX16-b6Bd1Dq3Hg3cLGE',
  authDomain: 'chatroom-444fc.firebaseapp.com',
  databaseURL: 'https://chatroom-444fc.firebaseio.com',
  projectId: 'chatroom-444fc',
  storageBucket: 'chatroom-444fc.appspot.com',
  messagingSenderId: '651276382368',
  appId: '1:651276382368:web:cef1f43d3adda528bd19c5'
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ChatroomComponent,
    ChatComponent,
    ErrorComponent,
    RegisterComponent,
    TruncatePipe,
    ChatdetailComponent,
    ToDatePipe
  ],
  providers: [AngularFireAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
