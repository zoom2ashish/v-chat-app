import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { RegistrationDetails } from '../models/registration-details.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/chat.model';

enum RegistrationMessages {
  Register = 'register',
  RegisterComplete = 'register_complete',
  AvailableUsers = 'available_users'
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user$ = new BehaviorSubject<User>(null);
  private _isRegistered = false;
  private _isRegistered$ = new BehaviorSubject<boolean>(false);
  private _availableUsers$ = new BehaviorSubject<User[]>([]);

  get isRegistered$(): Observable<boolean> {
    return this._isRegistered$.asObservable();
  }

  get availableUsers$() {
    return this._availableUsers$.asObservable();
  }

  get currentUser$() {
    return this._user$.asObservable();
  }

  constructor(private socketService: SocketService, private router: Router) {
    this.socketService.onEvent(RegistrationMessages.RegisterComplete).subscribe((data: User) => {
      console.log('Register complete');
      if (data.id) {
        this._isRegistered = true;
        this._isRegistered$.next(this._isRegistered);
        this._user$.next(data);
        this.router.navigate(['/']);
      }
    });

    this.socketService.onEvent(RegistrationMessages.AvailableUsers).subscribe((data: User[]) => {
      this._availableUsers$.next(data);
    });
  }

  register(data: RegistrationDetails) {
    if (!this._isRegistered) {
      this.socketService.send(RegistrationMessages.Register, data);
    }
  }
}
