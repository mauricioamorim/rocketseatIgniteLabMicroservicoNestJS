import { NotificationRepository } from 'src/application/repositores/notification-repository';
import { Notification } from 'src/application/entities/notification/notification';
/**
 * A ideia aqui é de acelerar o teste fazendo com que as informações q seriam
 * salvas no banco de dados fiquem apenas na memoria ram. Não persistindo os dados
 * ao desligar o computador
 */
export class inMemoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }

  async create(notification: Notification) {
    console.log(notification);
    // depois é só alterar aqui para o teste persistir na base de dados
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificarionIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificarionIndex > 0) {
      this.notifications[notificarionIndex] = notification;
    }
  }
}
