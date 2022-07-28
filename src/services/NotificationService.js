export class NotificationService {
  constructor() {
    this.permission = false;
  }

  requestPermission() {
    return Notification.requestPermission()
      .then(() => (this.permission = true))
      .catch(() => {
        this.permission = false;
        return new Error('Messages cần có quyển để gửi thông báo tin nhắn mới');
      });
  }

  addNotification(title, body, image = '') {
    if (this.permission) {
      new Notification(title, { body, image });
    }
  }
}
