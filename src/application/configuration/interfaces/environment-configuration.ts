export interface EnvironmentConfiguration {
  cors: {
    origin: string;
  };
  rabbitMq: {
    url: string;
  };
}
