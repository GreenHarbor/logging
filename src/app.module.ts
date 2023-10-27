import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogModule } from './log/log.module';
import { SearchModule } from './search/search.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    LogModule,
    SearchModule,
    ClientsModule.register([
      {
        name: 'COMMUNICATION',
        transport: Transport.RMQ,
        options: { urls: ['amqp://localhost:5672'], queue: 'communication' },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
