/**
 * Define User Model
 *
 * @export
 * @class User
 */
export class User {
  constructor(public id: string, public name: string) {
  }
}

/**
 * Define Message Model
 *
 * @export
 * @class Message
 */
export class Message {
  constructor(public from: User, public content: string) {
  }
}

/**
 * Define Chat Message Model
 *
 * @export
 * @class ChatMessage
 * @extends {Message}
 */
export class ChatMessage extends Message {
  constructor(from: User, content: string) {
    super(from, content);
  }
}
