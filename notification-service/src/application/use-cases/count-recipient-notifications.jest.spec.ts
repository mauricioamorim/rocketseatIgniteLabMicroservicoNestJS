import { makeNotification } from '@test/factories/notification-factory';
import { inMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repositories';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new inMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationRepository,
    );

    const notification = makeNotification({ recipientId: 'recipient-1' });

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: notification.recipientId,
    });

    expect(count).toEqual(2);
  });
});
