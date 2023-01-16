import { NotificationNotFound } from '@application/errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { inMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repositories';
import { CancelNotification } from './cancel-notification';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new inMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = makeNotification({ recipientId: 'teste-cancel' });

    await notificationRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notificarion', async () => {
    const notificationRepository = new inMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
