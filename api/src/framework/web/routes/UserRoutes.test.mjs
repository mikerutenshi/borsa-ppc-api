import request from 'supertest';
import app from '../../../app.mjs';
import { christ, christine, michael } from '../../../model/mock/Users.mjs';
import { Status } from '../../../model/Response.mjs';

describe('Test root path', () => {
  const agent = request.agent(app);

  test('It should response with greeting', async () => {
    const response = await agent.get('/');
    expect(response.body.message).toBe('Welcome to BorsaPPC API.');
  });
});

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
    const getUsers = await agent
      .get('/v2/users')
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
    console.log('all users ', response.body.data);
  });

  test('GET /v2/user => get filtered users', async () => {
    const response = await agent.get('/v2/users').query({
      search_key: 'first_name',
      search_value: 'christi',
    });
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].username).toBe(christine.username);
  });

  test('GET /v2/users => get single user', async () => {
    const kurnia = await agent.get('/v2/users/2');
    expect(kurnia.body.data[0].username).toMatch(christ.username);
  });

  test('UPDATE /v2/users => update user', async () => {
    christine.first_name = 'Christian';
    const response = await agent.put('/v2/users/3').send(christine);
    const updated = await agent.get('/v2/users').query({
      search_key: 'first_name',
      search_value: 'christian',
    });
    expect(response.status).toEqual(200);
    expect(response.body.data[0].username).toMatch(christine.username);
    expect(updated.body.data[0].username).toMatch(christine.username);
  });

  test('DELETE /v2/users => delete user', async () => {
    const response = await agent.delete('/v2/users/1');
    const notFound = await agent.delete('/v2/users/1');
    const searchFail = await agent.get('/v2/users/1');
    expect(response.status).toEqual(200);
    expect(notFound.status).toEqual(404);
    expect(searchFail.body.data).toHaveLength(0);
  });
});
