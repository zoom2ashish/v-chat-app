import { User } from './model/chat.model';
import * as _ from 'lodash';

export class Users {

  private _users: {[key: string]: User} = {};

  getAll() {
    return _.values(this._users);
  }

  add(u: User) {
    if (u && u.id) {
      this._users[u.id] = u;
    }
  }

  remove(u: User) {
    if (u && u.id) {
      delete this._users[u.id];
    }
  }
}