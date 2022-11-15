import ProjectDependencies from '../../../di/projectDependencies.mjs';
import request from 'supertest';
import app from '../../../app.mjs';
import { finance, production, superuser } from '../../../model/mock/Roles.mjs';

export const roleTestSuite = () => {
  beforeAll(async () => {
    const databaseService = ProjectDependencies.DatabaseService;
    await databaseService.dropDatabase();
  });
  describe('Test role route methods', () => {
    const agent = request.agent(app);

    test('POST /v2/roles => add new role', async () => {
      const response = await agent.post('/v2/roles').send(superuser);
      await agent.post('/v2/roles').send(finance);
      await agent.post('/v2/roles').send(production);

      console.log('mresponse', response.body);
      expect(response.status).toBe(201);
      expect(response.body.data[0].name).toMatch(superuser.name);
      expect(response.body.message).toContain('Role is successfully added');
      expect(response.headers['content-type']).toMatch(/json/);
    });

    test('POST /v2/roles => add duplicate role', async () => {
      const response = await agent.post('/v2/roles').send(superuser);

      expect(response.status).toBe(409);
      expect(response.body.message).toContain('Role already exists');
      expect(response.headers['content-type']).toMatch(/json/);
    });

    test('GET /v2/roles => get all roles', async () => {
      const response = await agent.get('/v2/roles');
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(3);
      console.log('mresponse - all roles', response.body);
    });

    test('GET /v2/roles => get role by id', async () => {
      const response = await agent.get('/v2/roles/2');
      expect(response.status).toBe(200);
      expect(response.body.data[0].name).toMatch(finance.name);
    });
  });
};
