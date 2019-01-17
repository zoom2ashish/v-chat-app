import { createServer, Server } from 'http';
import express from 'express';
import socketIo from 'socket.io';

import { Message, User } from './model/chat.model';
import { ListenOptions } from 'net';

export class ChatServer {
  public static readonly PORT = 8080;

  private _app: express.Application;
  private _server: Server;
  private _io: SocketIO.Server;
  private _port: string | number;

  constructor() {
    this.initialize();
    this.setRoutes();
    this.listen();
  }

  private initialize() {
    this._port = process.env.PORT || ChatServer.PORT;
    this._app = express();
    this._server = createServer(this._app);
    this._io = socketIo(this._server);

  }

  private setRoutes() {
    this._app.get('/', (req: express.Request, res: express.Response) => {
      res.status(200).send('<h1>Hello World!!</h1>');
    })
  }

  private listen() {
    const args: ListenOptions =  {
      port: +this._port,
      host: '0.0.0.0'
    };
    this._server.listen(args, () => {
      console.log('Running Server on port %s', this._port);

      console.log('Listening for Connections');
      this._io.on('connection', (socket: socketIo.Socket) => {
        console.log('Connected client on %s', this._port);

        socket.on('message', (m: Message) => {
          console.log('[server][message]: %s', JSON.stringify(m));
          this._io.emit('message', m);
        });

        socket.on('disconnect', () => {
          console.log('Client disconnected');
        });
      });
    });
  }

  public getApp() {
    return this._app;
  }

}