import {AmqpConnection, RabbitSubscribe} from '@golevelup/nestjs-rabbitmq';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';

import {JsonPresenterDto} from '../../presenters/json/dtos/json-presenter-dto';
import {JsonPresenter} from '../../presenters/json/json-presenter';
import {WebhookBody} from './req/webhook-body';

@Controller('/queue')
export class QueueController {
  @Post()
  @HttpCode(HttpStatus.OK)
  public addRequest(
    @Body() webhook: WebhookBody
  ): JsonPresenterDto<WebhookBody> {
    this.amqpConnection.publish<WebhookBody>('web-hook', 'api-broker', webhook);

    return this.jsonPresenter.envelope(webhook);
  }

  @RabbitSubscribe({
    exchange: 'web-hook',
    routingKey: 'api-broker',
    queue: 'api-broker',
  })
  listenRequest(data: WebhookBody): void {
    console.log(data);
  }

  constructor(
    private readonly amqpConnection: AmqpConnection,
    @Inject(JsonPresenter) private readonly jsonPresenter: JsonPresenter
  ) {}
}
