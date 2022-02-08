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

  it('posts a user and recieves a user object in the correct shape', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const actual = res.body;
    const expected = { email: mockUser.email, id: expect.any(Number) };
    expect(actual).toEqual(expected);
  });
});
