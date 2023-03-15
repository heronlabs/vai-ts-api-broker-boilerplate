import {Environment, TextEnvPresenter} from '@heronlabs/presenter-env';
import {Inject} from '@nestjs/common';

import {EnvironmentConfiguration} from './interfaces/environment-configuration';

export class Configuration implements EnvironmentConfiguration {
  public cors = {
    origin: this.textEnvPresenter.getValueByKey('CORS_ORIGIN'),
  };

  public rabbitMq = {
    url: this.textEnvPresenter.getValueByKey('RABBITMQ_URL'),
  };

  constructor(
    @Inject(TextEnvPresenter)
    private textEnvPresenter: Environment<string>
  ) {}
}
