import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  'recipientId': string;
}

//DTO - Data Transfer Object
