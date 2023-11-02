import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { SearchService } from 'src/search/search.service';

@Injectable()
export class LogService {
  constructor(private searchService: SearchService) {}

  async create(createLogDto: CreateLogDto) {
    try {
      await this.searchService.insertLog(createLogDto);
    } catch (err) {
      console.log(err);
    }
    return 'This action adds a new log';
  }
}
