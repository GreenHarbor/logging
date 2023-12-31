import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClientProxy,
  ClientProxyFactory,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://guest:guest@localhost:5672`], // Update with your credentials and host
      queue: 'logs',
      queueOptions: {
        durable: true,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      noAck: false,
      prefetchCount: 1,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);

  const client: ClientProxy = ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'], // Replace with your actual connection string
      queue: 'logs', // Replace with your actual queue name
      queueOptions: {
        durable: true,
      },
    },
  });

  const message = {
    log_level: 'ERROR',
    date: new Date(),
    detail: 'Failed to insert event - Workshop',
  }; // Replace with your actual message payload
  const pattern = 'createLog'; // Replace with your actual pattern or routing key
  for (let x = 0; x < 5; x++) {
    // Send a message using the emit() method for events or send() for request-response patterns
    client.emit(pattern, message).subscribe({
      next: (response) => console.log('Message sent successfully', response),
      error: (error) => console.error('Error sending message', error),
    });
  }
}
bootstrap();
