import { Component } from '@angular/core';
import { SocketService } from './services/socket.service';
import { User } from './models/chat.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'v-chat-client';
  private socket: SocketIOClient.Socket;
  public messages: string[] = [];

  constructor(private socketService: SocketService) {
    this.socketService.initSocket();

    this.socketService.onMessage().subscribe((msg) => {
      this.messages.push(msg.content);
    });
  }

  onSend(msg: string) {
    if (msg) {
      this.socketService.send({
        from: { name: 'Ashish' },
        content: msg
      });
    }
  }
}
