import { NotificationNotFound } from '@application/errors/notification-not-found';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositores/notification-repository';
import { Notification } from '@application/entities/notification/notification';

interface GetRecipientNotificationsRequest {
  recipientId: string;
}

interface GetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    resquest: GetRecipientNotificationsRequest,
  ): Promise<GetRecipientNotificationsResponse> {
    const { recipientId } = resquest;

    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}
