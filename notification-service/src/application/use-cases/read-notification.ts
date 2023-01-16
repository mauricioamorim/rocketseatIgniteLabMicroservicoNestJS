import { NotificationNotFound } from '@application/errors/notification-not-found';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositores/notification-repository';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    resquest: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = resquest;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
