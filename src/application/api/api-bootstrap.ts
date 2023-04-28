import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';
import {Module, ModuleMetadata, ValidationPipe} from '@nestjs/common';
import {APP_PIPE} from '@nestjs/core';

import {CoreBootstrap} from '../../core/core-bootstrap';
import {ConfigBootstrap} from '../configuration/config-bootstrap';
import {Configuration} from '../configuration/configuration';
import {EnvironmentConfiguration} from '../configuration/interfaces/environment-configuration';
import {HealthCheckController} from './controllers/health-check/health-check-controller';
import {QueueController} from './controllers/queue/queue-controller';
import {JsonPresenter} from './presenters/json/json-presenter';

export const apiModule: ModuleMetadata = {
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({transform: true}),
    },
    JsonPresenter,
  ],
  imports: [
    ConfigBootstrap,
    CoreBootstrap,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigBootstrap],
      inject: [Configuration],
      useFactory: async (
        environmentConfiguration: EnvironmentConfiguration
      ) => {
        const {rabbitMq} = await environmentConfiguration.getConfig();

        return {
          exchanges: [
            {
              name: 'web-hook',
              type: 'topic',
            },
          ],
          uri: rabbitMq.url,
          enableControllerDiscovery: true,
        };
      },
    }),
  ],
  controllers: [HealthCheckController, QueueController],
};

@Module(apiModule)
export class ApiBootstrap {}
