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
      queue: 'log_queue',
      queueOptions: {
        durable: false,
      },
      noAck: false,
      prefetchCount: 1,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);

  // Create a ClientProxy instance
  const client: ClientProxy = ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'], // Replace with your actual connection string
      queue: 'log_queue', // Replace with your actual queue name
      queueOptions: {
        durable: false,
      },
    },
  });

  // Use the client to send a message
  const message = {
    log_level: 'ERROR',
    date: '2023-11-01T15:10:00Z',
    detail: 'Database connection failed.',
  }; // Replace with your actual message payload
  const pattern = 'createLog'; // Replace with your actual pattern or routing key

  // Send a message using the emit() method for events or send() for request-response patterns
  client.emit(pattern, message).subscribe({
    next: (response) => console.log('Message sent successfully', response),
    error: (error) => console.error('Error sending message', error),
  });
}
bootstrap();
