import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://admin:admingreenharbor@b-d9b47cdf-9f98-427e-b1ef-c0f3c02bcce0.mq.ap-southeast-1.amazonaws.com:5671`,
      ], // Update with your credentials and host
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

  // Create a ClientProxy instance
  // const client: ClientProxy = ClientProxyFactory.create({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://guest:guest@localhost:5672'], // Replace with your actual connection string
  //     queue: 'logs', // Replace with your actual queue name
  //     queueOptions: {
  //       durable: true,
  //     },
  //   },
  // });

  // Use the client to send a message
  // const message = {
  //   log_level: 'INFO',
  //   date: new Date(),
  //   detail: 'DAMMMM Gabriel looks so fine!',
  // }; // Replace with your actual message payload
  // const pattern = 'createLog'; // Replace with your actual pattern or routing key
  // for (let x = 0; x < 100; x++) {
  //   // Send a message using the emit() method for events or send() for request-response patterns
  //   client.emit(pattern, message).subscribe({
  //     next: (response) => console.log('Message sent successfully', response),
  //     error: (error) => console.error('Error sending message', error),
  //   });
  // }
}
bootstrap();
