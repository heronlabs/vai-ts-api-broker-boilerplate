import {faker} from '@faker-js/faker';
import {Test} from '@nestjs/testing';

import {apiModule} from '../../../../../src/application/api/api-bootstrap';
import {QueueController} from '../../../../../src/application/api/controllers/queue/queue-controller';

describe('Given controller for health check', () => {
  let controller: QueueController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(apiModule).compile();
    controller = moduleRef.get(QueueController);
  });

  describe('Given queue route', () => {
    it('Should emit new request', () => {
      const webhookBody = {
        event: faker.datatype.uuid(),
        createdAt: faker.datatype.uuid(),
        model: faker.datatype.uuid(),
        uid: faker.datatype.uuid(),
        entry: faker.datatype.uuid(),
      };

      const response = controller.addRequest(webhookBody);

      expect(response.payload).toBeTruthy();
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
