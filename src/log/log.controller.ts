import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) {}

  @MessagePattern('createLog')
  create(@Payload() createLogDto: CreateLogDto) {
    return this.logService.create(createLogDto);
  }
}
