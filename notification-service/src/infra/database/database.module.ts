import { Module } from '@nestjs/common';
import { NotificationRepository } from 'src/application/repositores/notification-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notificarions-repositories';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationRepository],
})
export class DatabaseModule {}
