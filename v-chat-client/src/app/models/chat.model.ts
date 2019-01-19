/**
 * Define User Model
 *
 * @export
 */
export class User {
  id?: string;
  name?: string;
  status?: string;
}

/**
 * Define Message Model
 *
 * @export
 */
export interface Message {
  from: User;
  content: string;
}
