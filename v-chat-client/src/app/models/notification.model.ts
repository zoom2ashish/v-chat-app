export enum  NotificationMessageType {
  UserLogIn = 'UserLogIn',
  UserLogOut = 'UserLogOut',
  UserJoinRoom = 'UserJoinRoom',
  PublicChatRoomCreated = 'PublicChatRoomCreated',
  PublicChatRoomRemoved = 'PublicChatRoomRemoved'
}

export interface NotificationMessage {
  id: number;
  type: NotificationMessageType;
  timestamp: number;
  content: string;
}
