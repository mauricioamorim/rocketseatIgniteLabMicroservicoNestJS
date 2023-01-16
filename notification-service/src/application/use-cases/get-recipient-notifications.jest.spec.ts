import { makeNotification } from '@test/factories/notification-factory';
import { inMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repositories';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get notification', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationRepository = new inMemoryNotificationRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-get-id-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-get-id-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-get-id-1' }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-get-id-1',
    });

    expect(notifications).toHaveLength(3);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-get-id-1' }),
        expect.objectContaining({ recipientId: 'recipient-get-id-1' }),
      ]),
    );
  });
});
