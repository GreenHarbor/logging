import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { SearchModule } from 'src/search/search.module';

@Module({
  imports: [SearchModule],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
