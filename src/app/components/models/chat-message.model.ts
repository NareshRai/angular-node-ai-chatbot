export interface Message {
  isUser: boolean;
  text: string;
  timestamp: Date;
}

export interface AiThought {
  text: string;
  timestamp: Date;
}
