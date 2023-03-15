import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import {ClientProxy, MessagePattern} from '@nestjs/microservices';

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
    this.apiBrokerService
      .send('add-request', JSON.stringify({data: webhook}))
      .subscribe();

    return this.jsonPresenter.envelope(webhook);
  }

  @MessagePattern('add-request')
  listenRequest(data: WebhookBody): void {
    console.log(data);
  }

  constructor(
    @Inject('apiBrokerService') private apiBrokerService: ClientProxy,
    @Inject(JsonPresenter) private readonly jsonPresenter: JsonPresenter
  ) {}
}
