export type Config = {
  cors: {
    origin: string;
  };
  rabbitMq: {
    url: string;
  };
};

export interface EnvironmentConfiguration {
  getConfig(): Promise<Config>;
}
