import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) {}

  @MessagePattern('createLog') // The pattern or routing key
  handleLogMessage2(@Payload() createLogDto: any, @Ctx() context: RmqContext) {
    // Process the message received
    this.logService.create(createLogDto);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
}
