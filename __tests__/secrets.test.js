const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = {
  email: 'new-test-email@test.com',
  password: 'test-password',
};

const mockSecret = {
  title: 'test',
  description: 'test description',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;
  // Create an "agent" that gives us the ability
  // to store cookies between requests in a test
  const agent = request.agent(app);
  // Create a user to sign in with
  const user = await UserService.create({ ...mockUser, ...userProps });
  // ...then sign in
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('backend-10-top-secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('it posts a new secret and recieves a secret object in the correct shape', async () => {
    const { agent, user } = await registerAndLogin();
    const secretResp = await agent
      .post('/api/v1/secrets')
      .send({ ...mockUser, userId: user.id });
    const actual = secretResp.body;
    const expected = { ...mockSecret, createdAt: expect.any(string) };
    expect(actual).toEqual(expected);
  });
});
