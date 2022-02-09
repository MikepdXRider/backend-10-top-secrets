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
  await agent.post('/api/v1/users/session').send({ email, password });
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
    const [agent] = await registerAndLogin();
    const secretResp = await agent.post('/api/v1/secrets').send(mockSecret);
    const actual = secretResp.body;
    const expected = {
      ...mockSecret,
      createdAt: expect.any(String),
      id: expect.any(String),
      userId: expect.any(String),
    };
    expect(actual).toEqual(expected);
  });

  it('it posts a new secret and recieves a secret object in the correct shape', async () => {
    const [agent] = await registerAndLogin();
    await agent.post('/api/v1/secrets').send(mockSecret);
    const getSecretsResp = await agent.get('/api/v1/secrets');
    const actual = getSecretsResp.body;
    const expected = [
      {
        ...mockSecret,
        createdAt: expect.any(String),
        id: expect.any(String),
        userId: expect.any(String),
      },
    ];
    expect(actual).toEqual(expected);
  });
});
