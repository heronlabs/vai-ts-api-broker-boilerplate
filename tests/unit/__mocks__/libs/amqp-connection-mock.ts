import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {Mock} from 'moq.ts';

export const AmqpConnectionMock = {
  publish: jest.fn(),
};

export const AmqpConnectionMoq = new Mock<AmqpConnection>()
  .setup(x => x.publish)
  .returns(AmqpConnectionMock.publish)
  .object();
