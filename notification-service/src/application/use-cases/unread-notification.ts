import { NotificationNotFound } from '@application/errors/notification-not-found';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositores/notification-repository';

interface UnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    resquest: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = resquest;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
