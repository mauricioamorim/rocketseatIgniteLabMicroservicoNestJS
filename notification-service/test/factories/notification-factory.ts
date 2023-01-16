import { Content } from '@application/entities/notification/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification/notification';

//transforma todas as propriedades possam ou não ter seus valores definidos
type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('Nova solicitação de amizade!'),
    recipientId: 'recipient-2',
    ...override,
  });
}
