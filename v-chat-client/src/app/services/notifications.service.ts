import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { NotificationMessage } from '../models/notification.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan, withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private _notifications$ = new BehaviorSubject<NotificationMessage[]>([]);

  get notifications$() {
    return this._notifications$.asObservable();
  }

  constructor(private socketService: SocketService) {
    this.socketService.onEvent<NotificationMessage>('notification')
      .pipe(withLatestFrom(this._notifications$))
      .subscribe(([msg, messages]) => {
        this._notifications$.next([...messages, msg]);
      });
  }
}
