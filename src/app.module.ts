import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogModule } from './log/log.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [LogModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
