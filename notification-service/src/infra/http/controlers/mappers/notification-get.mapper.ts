import { Notification } from '@application/entities/notification/notification';

export class GetNotificationMapper {
  static toReturn(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt,
    };
  }
}
