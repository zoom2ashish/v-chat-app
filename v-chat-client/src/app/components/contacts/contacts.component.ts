import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { User } from 'src/app/models/chat.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  availableUsers: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.availableUsers$.pipe(withLatestFrom(this.userService.currentUser$)).subscribe(([users, currentUser]) => {
      this.availableUsers = users.filter((user => user.id !== currentUser.id));
    });
  }

  onStartChat() {
  }

}
