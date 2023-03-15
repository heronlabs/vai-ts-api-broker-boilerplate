import {ClientProxy} from '@nestjs/microservices';
import {Mock} from 'moq.ts';

export const ClientProxyMock = {
  emit: jest.fn(),
};

export const ClientProxyMoq = new Mock<ClientProxy>()
  .setup(x => x.emit)
  .returns(ClientProxyMock.emit)
  .object();
