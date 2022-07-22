import { io } from 'socket.io-client';

export class SocketService {
  constructor() {
    this.io = io({
      path: '/socket',
      auth: {
        token: localStorage.getItem('accessToken'),
      },
    });
  }

  sendMessage(message, conversationId) {
    this.io.emit('message', {
      message,
      conversationId,
    });
  }

  setOnMessageListener(listener) {
    this.io.on('message', listener);
  }

  disconnect() {
    this.io.disconnect();
  }
}
