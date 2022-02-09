const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  email: 'test-email@test.com',
  password: 'test-password',
};

describe('backend-10-top-secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('attempts to create a new user and recieves a user object in the correct shape', async () => {
    const res = await request(app).post('/api/v1/users/').send(mockUser);
    const actual = res.body;
    const expected = { email: mockUser.email, id: expect.any(String) };
    expect(actual).toEqual(expected);
  });

  it('attempts to login an existing user and recieves a user object in the correct shape', async () => {
    await request(app).post('/api/v1/users/').send(mockUser);
    const loginUserRes = await request(app)
      .post('/api/v1/users/session')
      .send(mockUser);
    const actual = loginUserRes.body;
    const expected = { email: mockUser.email, id: expect.any(String) };
    expect(actual).toEqual(expected);
  });

  it('sends a delete request to logout an existing user', async () => {
    await request(app).post('/api/v1/users/').send(mockUser);
    await request(app).post('/api/v1/users/session').send(mockUser);
    const logoutRes = await request(app).delete('/api/v1/users/session');
    const actual = logoutRes.body;
    const expected = "You've been logged out!";
    expect(actual).toEqual(expected);
  });
});
