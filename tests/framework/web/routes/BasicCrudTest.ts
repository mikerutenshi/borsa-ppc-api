import request from 'supertest';
import app from '../../../../src/app';
import ProjectDependencies from '../../../../src/di/ProjectDependencies';
import { ArbitraryModel } from '../../../../src/model/BaseModel';
import { loggerJest } from '../../../../src/util/Logger';

export const basicCrudTestSuite = <T>(
  repo: string,
  route: string,
  dataset: T[],
  checkColumn: string
) => {
  beforeAll(async () => {
    const { databaseService } = new ProjectDependencies();
    await databaseService.dropRepository(repo);
  });

  describe(`Test CRUD routes for ${repo}`, () => {
    const agent = request.agent(app);

    it.each(dataset)(`POST ${route} => create new object $#`, async (data) => {
      const response = await agent.post(route).send(data as object);
      expect(response.status).toBe(201);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body.message.toLowerCase()).toContain('created');
      expect(response.body.data.length).toBe(1);
    });

    test(`GET ${route} => get all objects`, async () => {
      const response = await agent.get(route);
      loggerJest.debug(response.body, 'All objects');
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(dataset.length);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body.message.toLowerCase()).toContain('loaded');
    });

    test(`GET then PUT ${route} => get then update filtered product categories`, async () => {
      const column = (dataset[1] as ArbitraryModel)[checkColumn];

      if (column) {
        const secondObjectResponse = await agent
          .get(route)
          .query({ search_key: 'name', search_value: column });
        expect(secondObjectResponse.status).toBe(200);
        if (secondObjectResponse.body.data[checkColumn]) {
          expect(secondObjectResponse.body.data[checkColumn]).toMatch(column);
        }
        expect(secondObjectResponse.body.data.length).toBe(1);
        const input = secondObjectResponse.body.data[0];
        input[checkColumn] = 'Changed';
        const secondRoute = `${route}/2`;
        const updateSecondResp = await agent.put(secondRoute).send(input);
        expect(updateSecondResp.status).toBe(200);
        expect(updateSecondResp.body.data[0][checkColumn]).toMatch(
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
      const lastRoute = `${route}/${lastIndex}`;
      const deleteLastResp = await agent.delete(lastRoute);
      expect(deleteLastResp.status).toBe(200);
      expect(deleteLastResp.body.data).toBe(undefined);
      expect(deleteLastResp.body.message.toLowerCase()).toContain('deleted');
    });
  });
};
