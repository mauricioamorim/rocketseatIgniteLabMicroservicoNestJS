import { inMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repositories';
import { SendNotification } from './send-notification';

describe('NotificationRepository', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new inMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      content: 'Nova solicitação de amizade',
      category: 'social',
      recipientId: 'id da chave estranjeira',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
