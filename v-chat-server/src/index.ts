import { ChatServer } from './server';

let app = new ChatServer().getApp();

console.log('App Started');

export { app };