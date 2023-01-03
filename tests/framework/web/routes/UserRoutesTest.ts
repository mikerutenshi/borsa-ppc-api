import { Response } from 'express';
import request from 'supertest';
import app from '../../../../src/app';
import {
  christ,
  christine,
  invalidUser,
} from '../../../../src/model/mock/Users';
import { User } from '../../../../src/model/Users';
import { loggerJest } from '../../../../src/util/Logger';

export const rootTestSuite = () =>
  describe('Test root path', () => {
    const agent = request.agent(app);

    test('It should response with greeting', async () => {
      const response = await agent.get('/');
      expect(response.body.message).toBe('Welcome to BorsaPPC API.');
    });
  });

export const userTestSuite = () =>
  describe('Test user path', () => {
    const agent = request.agent(app);

    test('POST /v2/user => create new user', async () => {
      const response = await agent
        .post('/v2/users')
        .send(christ)
        .set('Accept', 'application/json');
      const response1 = await agent
        .post('/v2/users')
        .send(christine)
        .set('Accept', 'application/json');
      expect(response.status).toEqual(201);
      expect(response1.status).toEqual(201);
      expect(response.headers['content-type']).toMatch(/json/);
    });

    test('POST /v2/user => user already exist', async () => {
      const response = await agent
        .post('/v2/users')
        .send(christ)
        .set('Accept', 'application/json');
      expect(response.status).toEqual(409);
      expect(response.body.message).toMatch('User already exists');
    });

    test('GET /v2/user => get all users', async () => {
      const response = await agent
        .get('/v2/users')
        .set('Accept', 'application/json');
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.status).toEqual(200);
      if (response.body.data.length != 0) {
        expect(response.body.data[0]).toHaveProperty('username');
        expect(response.body.data[0]).not.toHaveProperty('password');
      }
    });

    test('GET /v2/user => get filtered users', async () => {
      const response = await agent.get('/v2/users').query({
        search_key: 'first_name',
        search_value: 'christi',
      });
      loggerJest.debug(response.body);
      expect(response.status).toEqual(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].username).toBe(christine.username);
    });

    test('GET /v2/users => get single user', async () => {
      const kurnia = await agent.get('/v2/users/2');
      expect(kurnia.body.data[0].username).toMatch(christine.username);
    });

    test('UPDATE /v2/users => update user', async () => {
      christine.first_name = 'Christian';
      christine.is_active = true;
      const response = await agent.put('/v2/users/2').send(christine);
      loggerJest.debug(response.body, 'update user res');
      const updated = await agent.get('/v2/users').query({
        search_key: 'first_name',
        search_value: 'christian',
      });
      expect(response.status).toEqual(200);
      expect(response.body.data[0].username).toMatch(christine.username);
      expect(updated.body.data[0].username).toMatch(christine.username);
      expect(updated.body.data[0].username).toBeTruthy();

      const outOfBound = await agent.put('/v2/users/100').send(christine);
      expect(outOfBound.status).toBe(404);
      expect(outOfBound.body.message.toLowerCase()).toContain('not found');

      christine.first_name = 'ch';
      const invalidName = await agent.put('/v2/roles/2').send(christine);
      expect(invalidName.status).toBe(400);
      expect(invalidName.body.message.toLowerCase()).toContain(
        'validation error'
      );
      christine.first_name = 'Christine';
    });

    test('DELETE /v2/users => delete user', async () => {
      const response = await agent.delete('/v2/users/1');
      const notFound = await agent.delete('/v2/users/1');
      const searchFail = await agent.get('/v2/users/1');
      expect(response.status).toEqual(200);
      expect(response.body.data).toBeUndefined();

      expect(notFound.status).toEqual(404);
      expect(searchFail.body.data).toHaveLength(0);
    });

    test('AUTH /v2/users/authenticate => authenticate user', async () => {
      const response = await agent.post('/v2/users/authenticate').send({
        username: christine.username,
        password: christine.password,
      });
      christine.refresh_token = response.body.data[0].refresh_token;
      loggerJest.debug(response.body.data[0].refresh_token);
      expect(response.status).toBe(200);
      expect(response.body.data[0].access_token).toBeDefined();
    });

    test('AUTH /v2/users/authenticate => authenticate invalid user', async () => {
      const response = await agent.post('/v2/users/authenticate').send({
        username: 'Unknown User',
        password: 'UnknownPassword123',
      });
      const invalidResponse = await agent
        .post('/v2/users/authenticate')
        .send({
          username: invalidUser.username,
          password: invalidUser.password,
        })
        .catch((err) => {
          expect(err.body[0]).toHaveProperty('username');
          expect(err.body[1]).toHaveProperty('password');
        });
      expect(response.status).toBe(400);
      expect(response.body.data[0].username).toMatch('User not found');
      expect((invalidResponse as unknown as Response).status).toBe(400);
    });

    test('REFRESH TOKEN / v2/users/refresh-access-token => refresh access token', async () => {
      loggerJest.debug(christine);
      const response = await agent.post('/v2/users/refresh-access-token').send({
        username: christine.username,
        refresh_token: christine.refresh_token,
      });
      loggerJest.debug(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data[0].access_token).toBeDefined();
    });

    test('REFRESH TOKEN / v2/users/refresh-access-token => refresh access token invalid token', async () => {
      const badRequest = await agent
        .post('/v2/users/refresh-access-token')
        .send({
          username: christine.username,
          refresh_token: christine.refresh_token?.substring(0, 10),
        })
        .catch((err) => {
          expect(err.body).toHaveProperty('access_token');
        });
      const invalidToken = await agent
        .post('/v2/users/refresh-access-token')
        .send({
          username: christine.username,
          refresh_token: christine.refresh_token?.toLowerCase(),
        });

      expect((badRequest as unknown as Response).status).toBe(400);
      expect(invalidToken.status).toBe(403);
    });
  });
