import {faker} from '@faker-js/faker';

import {QueueController} from '../../../../../src/application/api/controllers/queue/queue-controller';
import {
  ClientProxyMock,
  ClientProxyMoq,
} from '../../../__mocks__/libs/client-proxy';
import {JsonPresenterMock} from '../../../__mocks__/presenters/json-presenter-mock';

describe('Given controller for queue', () => {
  let controller: QueueController;

  beforeEach(async () => {
    controller = new QueueController(ClientProxyMoq, JsonPresenterMock);
  });

  describe('Given add request event', () => {
    it('Should emit new request', () => {
      ClientProxyMock.emit.mockReturnValueOnce(undefined);

      JsonPresenterMock.envelope.mockImplementation(payload => ({payload}));

      const webhookBody = {
        event: faker.datatype.uuid(),
        createdAt: faker.datatype.uuid(),
        model: faker.datatype.uuid(),
        uid: faker.datatype.uuid(),
        entry: faker.datatype.uuid(),
      };

      const response = controller.addRequest(webhookBody);

      expect(response.payload).toEqual(webhookBody);
    });

    it('Should log receive request', () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

      const webhookBody = {
        event: faker.datatype.uuid(),
        createdAt: faker.datatype.uuid(),
        model: faker.datatype.uuid(),
        uid: faker.datatype.uuid(),
        entry: faker.datatype.uuid(),
      };

      controller.listenRequest(webhookBody);

      expect(consoleLogSpy).toHaveBeenNthCalledWith(1, webhookBody);
    });
  });
});
