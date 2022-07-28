import { io } from 'socket.io-client';

export class SocketService {
  constructor() {
    this.io = io({
      path: '/api/socket',
      auth: {
        token: localStorage.getItem('accessToken'),
      },
    });
  }

  addToRoom(conversationId, userId) {
    this.io.emit('join', { conversationId, userId });
  }

  sendMessage(message, conversationId, isImage) {
    this.io.emit('message', {
      message,
      conversationId,
      isImage,
    });
  }

  setOnJoinConversationListener(listener) {
    this.io.on('join', listener);
  }

  setOnMessageListener(listener) {
    this.io.on('message', listener);
  }

  disconnect() {
    this.io.disconnect();
  }
}
