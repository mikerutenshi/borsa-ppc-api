import request from 'supertest';
import app from '../../../../src/app';
import ProjectDependencies from '../../../../src/di/ProjectDependencies';
import { Roles } from '../../../../src/model/Enums';
import {
  superuser,
  finance,
  production,
} from '../../../../src/model/mock/Roles';

export const roleTestSuite = () => {
  beforeAll(async () => {
    const { databaseService } = new ProjectDependencies();
    await databaseService.dropDatabase();
  });

  describe('Test role route methods', () => {
    const agent = request.agent(app);

    test('POST /v2/roles => add new role', async () => {
      const response = await agent.post('/v2/roles').send(superuser);
      await agent.post('/v2/roles').send(finance);
      await agent.post('/v2/roles').send(production);

      expect(response.status).toBe(201);
      expect(response.body.data[0].name).toMatch(superuser.name);
      expect(response.headers['content-type']).toMatch(/json/);
    });

    test('POST /v2/roles => add duplicate role', async () => {
      const response = await agent.post('/v2/roles').send(superuser);

      expect(response.status).toBe(409);
      expect(response.headers['content-type']).toMatch(/json/);
    });

    test('GET /v2/roles => get all roles', async () => {
      const response = await agent.get('/v2/roles');
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(3);
    });

    test('GET /v2/roles => get role by id', async () => {
      const response = await agent.get('/v2/roles/2');
      expect(response.status).toBe(200);
      expect(response.body.data[0].name).toMatch(finance.name);

      const outOfBound = await agent.get('/v2/roles/100');
      expect(outOfBound.status).toBe(200);
      expect(outOfBound.body.data).toHaveLength(0);
    });

    test('GET /v2/roles => get role by name approx', async () => {
      const response = await agent.get('/v2/roles').query({
        search_key: 'name',
        search_value: 'fin',
      });
      expect(response.status).toBe(200);
      expect(response.body.data[0].name).toMatch(finance.name);

      const notFound = await agent.get('/v2/roles').query({
        search_key: 'name',
        search_value: 'huahahaha',
      });
      expect(notFound.status).toBe(200);
      expect(notFound.body.data).toHaveLength(0);

      const invalidKey = await agent.get('/v2/roles').query({
        search_key: 'invalidKey',
        search_value: 'huahahaha',
      });
      expect(invalidKey.status).toBe(500);

      const undefinedValue = await agent.get('/v2/roles').query({
        search_key: undefined,
        search_value: undefined,
      });
      expect(undefinedValue.status).toBe(200);
      expect(undefinedValue.body.message.toLowerCase()).toContain('all roles');
    });

    test('PUT /v2/roles => update role by id', async () => {
      const response = await agent
        .put('/v2/roles/2')
        .send({ name: Roles.qualityControl });
      expect(response.status).toBe(200);
      expect(response.body.data[0].name).toMatch(Roles.qualityControl);

      const outOfBound = await agent
        .put('/v2/roles/100')
        .send({ name: Roles.finance });
      expect(outOfBound.status).toBe(404);
      expect(outOfBound.body.message.toLowerCase()).toContain('not found');

      const invalidName = await agent
        .put('/v2/roles/2')
        .send({ name: 'financial' });
      expect(invalidName.status).toBe(400);
      expect(invalidName.body.message.toLowerCase()).toContain(
        'validation error'
      );

      const duplicateName = await agent
        .put('/v2/roles/2')
        .send({ name: Roles.superuser });
      expect(duplicateName.status).toBe(409);
      expect(duplicateName.body.message.toLowerCase()).toContain(
        'already exists'
      );
    });

    test('DELETE /v2/roles => delete role get should return null', async () => {
      const response = await agent.delete('/v2/roles/2');
      expect(response.status).toBe(200);
      expect(response.body.data).toBeUndefined();
      expect(response.body.message).toContain('successfully deleted');

      const deleteAgain = await agent.delete('/v2/roles/2');
      expect(deleteAgain.status).toEqual(404);
      44;

      const getResponse = await agent.get('/v2/roles/2');
      expect(getResponse.status).toBe(200);
      expect(getResponse.body.data).toHaveLength(0);
    });
  });
};
