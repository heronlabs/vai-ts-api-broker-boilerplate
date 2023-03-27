import {IsNotEmpty} from 'class-validator';

export class WebhookReq {
  @IsNotEmpty()
  event: string;

  @IsNotEmpty()
  createdAt: string;

  model?: string;
  uid?: string;
  entry?: unknown;
}
