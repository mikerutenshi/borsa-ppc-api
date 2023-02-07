import request from 'supertest';
import app from '../../../../src/app';
import ProjectDependencies from '../../../../src/di/ProjectDependencies';

export const basicCrudTestSuite = <T>(
  repo: string,
  route: string,
  dataset: T[]
) => {
  beforeAll(async () => {
    const { databaseService } = new ProjectDependencies();
    await databaseService.dropRepository(repo);
  });

  describe(`Test CRUD routes for ${repo}`, () => {
    const agent = request.agent(app);

    it.each(dataset)(`POST ${route} => create new objects`, async (data) => {
      const response = await agent.post(route).send(data as object);
      expect(response.status).toBe(201);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body.message.toLowerCase()).toContain('created');
    });
  });
};
