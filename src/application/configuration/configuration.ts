import {Environment, TextEnvPresenter} from '@heronlabs/presenter-env';
import {Inject} from '@nestjs/common';

import {
  Config,
  EnvironmentConfiguration,
} from './interfaces/environment-configuration';

export class Configuration implements EnvironmentConfiguration {
  async getConfig(): Promise<Config> {
    return {
      cors: {
        origin: await this.textEnvPresenter.getValueByKey('CORS_ORIGIN'),
      },
      rabbitMq: {
        url: await this.textEnvPresenter.getValueByKey('RABBITMQ_URL'),
      },
    };
  }

  constructor(
    @Inject(TextEnvPresenter)
    private textEnvPresenter: Environment<string>
  ) {}
}
