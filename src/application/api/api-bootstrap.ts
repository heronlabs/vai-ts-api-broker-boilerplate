import {Module, ModuleMetadata, ValidationPipe} from '@nestjs/common';
import {APP_PIPE} from '@nestjs/core';
import {ClientProxyFactory, Transport} from '@nestjs/microservices';

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
    {
      provide: 'apiBrokerService',
      inject: [Configuration],
      useFactory: (environmentConfiguration: EnvironmentConfiguration) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [environmentConfiguration.rabbitMq.url],
            queue: 'api-broker',
            queueOptions: {
              durable: false,
            },
          },
        });
      },
    },
  ],
  imports: [ConfigBootstrap, CoreBootstrap],
  controllers: [HealthCheckController, QueueController],
};

@Module(apiModule)
export class ApiBootstrap {}
