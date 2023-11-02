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

  @MessagePattern('log_queue') // The pattern or routing key
  handleLogMessage(@Payload() createLogDto: any) {
    // Process the message received
    console.log('log_queue');
    console.log(createLogDto);
    this.logService.create(createLogDto);

    // Acknowledge the message if necessary
  }

  @MessagePattern('createLog') // The pattern or routing key
  handleLogMessage2(@Payload() createLogDto: any) {
    // Process the message received
    console.log('createLog');
    console.log(createLogDto);
    this.logService.create(createLogDto);
  }
}
