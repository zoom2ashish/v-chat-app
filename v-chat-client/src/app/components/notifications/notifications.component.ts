import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { BehaviorSubject } from 'rxjs';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  public notifications = [];

  constructor(private notificationsService: NotificationsService) {
  }

  ngOnInit() {
    this.notificationsService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
    });
  }
}
