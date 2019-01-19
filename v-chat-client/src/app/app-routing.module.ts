import { NgModule } from '@angular/core';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ThreadListComponent } from './components/thread-list/thread-list.component';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationGuard } from './guards/registation.guard';
import { NotificationsComponent } from './components/notifications/notifications.component';

const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: 'register', component: RegistrationComponent },
  { path: 'contacts', component: ContactsComponent, canActivate: [ RegistrationGuard ] },
  { path: 'threads', component: ThreadListComponent, canActivate: [ RegistrationGuard ] },
  { path: 'notifications', component: NotificationsComponent, canActivate: [ RegistrationGuard ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
  ]
})
export class AppRoutingModule { }
