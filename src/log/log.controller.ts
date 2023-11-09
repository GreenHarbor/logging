import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { LogService } from './log.service';

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) {}

  @MessagePattern('createLog') // The pattern or routing key
  handleLogMessage2(@Payload() createLogDto: any, @Ctx() context: RmqContext) {
    // Process the message received
    this.logService.create(createLogDto);
    console.log('Message ackd');
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
}
