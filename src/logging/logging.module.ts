import { Module, NestModule } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { LoggingService } from './logging.service';

@Module({
  imports: [
    /*RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'system-integration',
          type: 'fanout',
        },
      ],
      uri: 'amqp://localhost:5672',
    }),
    LogginModule,*/
  ],
  //providers: [LoggingService],
  //exports: [LoggingService],
})
export class LogginModule {}
