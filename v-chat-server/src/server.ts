import { createServer, Server } from 'http';
import express from 'express';
import socketIo from 'socket.io';
import { ListenOptions } from 'net';
import userStore from './stores/users.store';
import { User } from './model/user.model';
import uuidv1 from 'uuid/v1';

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

        socket.on('register', (userData: any) => this.handleRegistation(socket, userData));
        socket.on('disconnect', () => this.handleDisconnect(socket));
      });
    });
  }

  public getApp() {
    return this._app;
  }

  private handleRegistation(client: socketIo.Socket, data: User) {
    console.log('Registration Complete')
    const registeredUser = userStore.register(client.id, data);
    client.emit('register_complete', registeredUser);
    this.notifyUserLogIn(data);
    this.notifyAvailableUsers();

  }

  private handleDisconnect(client: socketIo.Socket) {
    userStore.unregister(client.id);
    this.notifyAvailableUsers();
  }

  private notifyUserLogIn(userData: User) {
    const timestamp = (new Date()).getTime();
    this._io.emit('notification', {
      id: uuidv1(),
      type: 'UserLogIn',
      timestamp: timestamp,
      content: `${userData.name} logged in`
    });
  }

  private notifyAvailableUsers() {
    this._io.sockets.emit('available_users', userStore.getAvailableUsers());
  }
}