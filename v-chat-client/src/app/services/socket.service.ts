import { Injectable, Inject } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Message } from '../models/chat.model';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {
  private static readonly SOCKET_PORT = 8080;
  private static readonly SERVER_URL = 'http://localhost:8080';

  private _socket: SocketIOClient.Socket;

  constructor() {
  }

  public initSocket() {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const url = `${protocol}//${hostname}:${SocketService.SOCKET_PORT}`;
    this._socket = socketIo(url);
  }

  public send<T>(eventName: string, data: T) {
    this._socket.emit(eventName, data);
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this._socket.on('message', (data: Message) => observer.next(data));
    });
  }

  public onEvent<T>(event: string) {
    return new Observable<T>(observer => {
      this._socket.on(event, (data: T) => observer.next(data));
    });
  }
}
