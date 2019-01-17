import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Message } from '../models/chat.model';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {
  private static readonly SERVER_URL = 'http://localhost:8080';

  private _socket: SocketIOClient.Socket;

  public initSocket() {
    this._socket = socketIo(SocketService.SERVER_URL);
  }

  public send(message: Message) {
    this._socket.emit('message', message);
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this._socket.on('message', (data: Message) => observer.next(data));
    });
  }

  public onEvent(event: string) {
    return new Observable<string>(observer => {
      this._socket.on(event, () => observer.next());
    });
  }
}
