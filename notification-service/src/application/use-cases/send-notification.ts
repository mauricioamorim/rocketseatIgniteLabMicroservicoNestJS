import { Injectable } from '@nestjs/common';
import { Content } from '../entities/notification/content';
import { Notification } from '../entities/notification/notification';
import { NotificationRepository } from '../repositores/notification-repository';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    resquest: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = resquest;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationRepository.create(notification);

    return {
      notification,
    };
  }
}
