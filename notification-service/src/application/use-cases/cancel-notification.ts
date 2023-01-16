import { NotificationNotFound } from '@application/errors/notification-not-found';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositores/notification-repository';

interface CancelNotificationRequest {
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    resquest: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = resquest;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }
    console.log(notification);

    notification.cancel();
    console.log(notification);
    await this.notificationRepository.save(notification);
  }
}
