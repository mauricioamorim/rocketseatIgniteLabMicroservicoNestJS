import { NotificationRepository } from 'src/aplication/repositores/notification-repository';
import { Notification } from 'src/aplication/entities/notification/notification';

export class inMemoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    console.log(notification);
    // depois é só alterar aqui para o teste persistir na base de dados
    this.notifications.push(notification);
  }
}
