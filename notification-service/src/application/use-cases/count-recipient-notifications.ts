import { NotificationNotFound } from '@application/errors/notification-not-found';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositores/notification-repository';

interface CountRecipientNotificationsRequest {
  recipientId: string;
}

interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    resquest: CountRecipientNotificationsRequest,
  ): Promise<CountRecipientNotificationsResponse> {
    const { recipientId } = resquest;

    const count = await this.notificationRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      count,
    };
  }
}
