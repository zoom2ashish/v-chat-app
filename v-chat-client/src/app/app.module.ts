import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { SocketService } from './services/socket.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatListModule,
  MatIconModule,
  MatDividerModule
} from '@angular/material';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ThreadListComponent } from './components/thread-list/thread-list.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { RegistrationGuard } from './guards/registation.guard';
import { NotificationsComponent } from './components/notifications/notifications.component';

export function initializeApp(socketService: SocketService) {
  return () => socketService.initSocket();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ThreadListComponent,
    RegistrationComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatListModule,
    MatIconModule,
    MatDividerModule
  ],
  providers: [
    SocketService,
    UserService,
    RegistrationGuard,
    { provide: APP_INITIALIZER,  useFactory: initializeApp, deps: [ SocketService ], multi: true }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
