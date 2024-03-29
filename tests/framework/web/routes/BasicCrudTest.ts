import request from 'supertest';
import app from '../../../../src/app';
import KeyValuePair from '../../../../src/model/KeyValuePair';
import { loggerJest } from '../../../../src/util/Logger';

export const basicCrudTestSuite = <T>(
  repo: string,
  route: string,
  dataset: T[],
  checkColumn: string
) => {
  //beforeAll(async () => {
  //  const { databaseService } = new ProjectDependencies();
  //  await databaseService.dropRepository(repo);
  //});

  describe(`Test CRUD routes for ${repo}`, () => {
    const agent = request.agent(app);

    it.each(dataset)(`POST ${route} => create new object $#`, async (data) => {
      const response = await agent.post(route).send(data as object);
      if (response.status !== 201) {
        loggerJest.debug('create fail -> %o', response.body);
      }
      expect(response.status).toBe(201);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body.message.toLowerCase()).toContain('created');
      expect(response.body.data.length).toBe(1);
    });

    test(`GET ${route} => get all objects`, async () => {
      const response = await agent.get(route);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(dataset.length);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body.message.toLowerCase()).toContain('loaded');
    });

    test(`GET then PUT ${route} => get then update filtered object`, async () => {
      const column = (dataset[1] as KeyValuePair)[checkColumn];

      if (column) {
        const secondObjectResponse = await agent
          .get(route)
          .query({ search_key: column });
        if (secondObjectResponse.status !== 200) {
          loggerJest.debug(
            'secondObject fail -> %o',
            secondObjectResponse.body
          );
        }
        expect(secondObjectResponse.status).toBe(200);
        if (secondObjectResponse.body.data[checkColumn]) {
          expect(secondObjectResponse.body.data[checkColumn]).toBe(column);
        }
        const input = secondObjectResponse.body.data[0];
        if (typeof input[checkColumn] === 'number') {
          input[checkColumn]++;
        } else if (typeof input[checkColumn] === 'string') {
          input[checkColumn] = 'Changed';
        }
        const secondRoute = `${route}/2`;
        const updateSecondResp = await agent.put(secondRoute).send(input);
        if (updateSecondResp.status !== 200) {
          loggerJest.debug('updateSecond fail -> %o', updateSecondResp.body);
        }
        expect(updateSecondResp.status).toBe(200);
        expect(updateSecondResp.body.data[0][checkColumn]).toBe(
          input[checkColumn]
        );
        expect(updateSecondResp.body.message.toLowerCase()).toContain(
          'updated'
        );
      }
    });

    test(`GET ${route} => get one object`, async () => {
      const thirdRoute = `${route}/3`;
      const getThirdResponse = await agent.get(thirdRoute);
      expect(getThirdResponse.status).toBe(200);
      expect(getThirdResponse.body.data.length).toBe(1);
      expect(getThirdResponse.body.data[0].id).toBe(3);
      expect(getThirdResponse.body.message.toLowerCase()).toContain('loaded');
    });
    test(`DELETE ${route} => delete object`, async () => {
      const lastIndex = dataset.length;
      const deleteLastResp = await agent.delete(route).query({ id: lastIndex });
      expect(deleteLastResp.status).toBe(200);
      expect(deleteLastResp.body.data).toBe(undefined);
      expect(deleteLastResp.body.message.toLowerCase()).toContain('deleted');
    });
  });
};
