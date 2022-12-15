import { Module } from '@nestjs/common';
import { SendNotification } from 'src/aplication/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationController } from './controlers/notification.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [SendNotification],
})
export class HttpModule {}
