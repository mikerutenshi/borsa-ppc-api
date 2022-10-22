import request from 'supertest';
import app from '../../../app.mjs';
import User from '../../../model/User.mjs';

describe('Test root path', () => {
  test('It should response with greeting', async () => {
    const response = await request(app).get('/');
    expect(response.body.message).toBe('Welcome to BorsaPPC API.');
  });
});

describe('Test user path', () => {
  test('POST /v2/user => create new user', async () => {
    const user = new User('chriskurnia', 'Chris', 'Kurnia', 'kataKunci2023', 1);
    const response = await request(app)
      .post('/v2/users')
      .send(user)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(201);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  test('POST /v2/user => user already exist', async () => {
    const user = new User('chriskurnia', 'Chris', 'Kurnia', 'kataKunci2023', 1);
    const response = await request(app)
      .post('/v2/users')
      .send(user)
      .set('Accept', 'application/json');
    expect(response.status).toEqual(409);
    expect(response.body.message).toMatch('User already exists');
  });

  test('GET /v2/user => get all users', async () => {
    const response = await request(app)
      .get('/v2/users')
      .set('Accept', 'application/json');
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    if (response.body.data.length != 0) {
      expect(response.body.data[0]).toHaveProperty('username');
      expect(response.body.data[0]).not.toHaveProperty('password');
    }
  });
});
