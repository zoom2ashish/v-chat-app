import { NgModule } from '@angular/core';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ThreadListComponent } from './components/thread-list/thread-list.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ContactsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'threads', component: ThreadListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
  ]
})
export class AppRoutingModule { }
