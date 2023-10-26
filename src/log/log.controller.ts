import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) {}

  @MessagePattern('createLog')
  create(@Payload() createLogDto: CreateLogDto) {
    return this.logService.create(createLogDto);
  }

  @MessagePattern('findAllLog')
  findAll() {
    return this.logService.findAll();
  }

  @MessagePattern('findOneLog')
  findOne(@Payload() id: number) {
    return this.logService.findOne(id);
  }

  @MessagePattern('updateLog')
  update(@Payload() updateLogDto: UpdateLogDto) {
    return this.logService.update(updateLogDto.id, updateLogDto);
  }

  @MessagePattern('removeLog')
  remove(@Payload() id: number) {
    return this.logService.remove(id);
  }
}
