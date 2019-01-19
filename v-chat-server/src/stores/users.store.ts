import { User } from '../model/user.model';
import uuidv1 from 'uuid/v1';

const demoUsers: User[] = [
  { id: uuidv1(), name: 'John Smith', status: 'Roaming in San Francisco' },
  { id: uuidv1(), name: 'Babita Kumari', status: 'Punching on the douchebag' },
  { id: uuidv1(), name: 'Baba Ramdev', status: 'Looking for herbs in Himalaya' }
]

export class UserStore {

  private _users: Map<string, User> = new Map();

  constructor() {
  }

  register(socketId: string, userData: User) {
    userData.id = uuidv1();
    this._users.set(socketId, userData);
    return userData;
  }

  unregister(socketId: string) {
    this._users.delete(socketId);
  }

  getAvailableUsers() {
    console.log('Users: ', [...this._users.values()]);
    return [...this._users.values()];
  }
}

const userStore = new UserStore();
export default userStore;