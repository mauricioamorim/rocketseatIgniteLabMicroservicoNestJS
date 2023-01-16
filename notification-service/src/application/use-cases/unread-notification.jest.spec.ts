import { NotificationNotFound } from '@application/errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { inMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repositories';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new inMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotification({
      recipientId: 'teste-unread',
      readAt: new Date(),
    });

    await notificationRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notificarion', async () => {
    const notificationRepository = new inMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
