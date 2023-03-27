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
import {WebhookRaw} from './raws/webhook-raw';
import {WebhookReq} from './reqs/webhook-req';

@Controller('/queue')
export class QueueController {
  @Post()
  @HttpCode(HttpStatus.OK)
  public addRequest(
    @Body() webhookReq: WebhookReq
  ): JsonPresenterDto<WebhookReq> {
    this.amqpConnection.publish<WebhookReq>(
      'web-hook',
      'api-broker',
      webhookReq
    );

    return this.jsonPresenter.envelope(webhookReq);
  }

  @RabbitSubscribe({
    exchange: 'web-hook',
    routingKey: 'api-broker',
    queue: 'api-broker',
  })
  listenRequest(webhookRaw: WebhookRaw): void {
    console.log(webhookRaw);
  }

  constructor(
    private readonly amqpConnection: AmqpConnection,
    @Inject(JsonPresenter) private readonly jsonPresenter: JsonPresenter
  ) {}
}
