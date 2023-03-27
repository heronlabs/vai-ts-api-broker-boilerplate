export type WebhookRaw = {
  event: string;
  createdAt: string;
  model?: string;
  uid?: string;
  entry?: unknown;
};
