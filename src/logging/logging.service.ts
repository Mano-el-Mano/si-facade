import { Injectable } from '@nestjs/common';
import { RabbitRPC, AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { LogTypes } from 'src/logTypes';

@Injectable()
export class LoggingService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  private generateCarRentalBody(
    type: LogTypes,
    carId: number,
    timestamp: string,
  ) {
    return {
      type: type,
      content: {
        car_id: carId,
        timestamp: timestamp,
      },
    };
  }

  private generateCarReviewBody(
    type: LogTypes,
    reviewId: string,
    timestamp: string,
  ) {
    return {
      type: type,
      content: {
        reviewId,
        timestamp,
      },
    };
  }

  public async sendCarReviewLog(
    type: LogTypes,
    reviewId: string,
    timestamp: string,
  ) {
    const config = {
      exchange: 'system-integration',
      routingKey: 'Logs',
      message: this.generateCarReviewBody(type, reviewId, timestamp),
    };
    await this.amqpConnection.publish(
      config.exchange,
      config.routingKey,
      config.message,
    );
  }

  public async sendCarRentalLog(
    type: LogTypes,
    carId: number,
    timestamp: string,
  ) {
    const config = {
      exchange: 'system-integration',
      routingKey: 'Logs',
      message: this.generateCarRentalBody(type, carId, timestamp),
    };
    await this.amqpConnection.publish(
      config.exchange,
      config.routingKey,
      config.message,
    );
  }
}
