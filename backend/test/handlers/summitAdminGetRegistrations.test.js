process.env.ADMIN_SECRET = 'test-secret';
const { handler } = require('../../src/handlers/summitAdminGetRegistrations');
const { mockClient } = require('aws-sdk-client-mock');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');

const ddbMock = mockClient(DynamoDBDocumentClient);

describe('summitAdminGetRegistrations', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    ddbMock.reset();
    process.env = { ...OLD_ENV, ADMIN_SECRET: 'test-secret' };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should return 401 if no auth header', async () => {
    const res = await handler({ headers: {} });
    expect(res.statusCode).toBe(401);
  });

  it('should return 401 if wrong secret', async () => {
    const res = await handler({ headers: { Authorization: 'Bearer wrong' } });
    expect(res.statusCode).toBe(401);
  });

  it('should return 200 with registrations on success', async () => {
    ddbMock.on(ScanCommand).resolves({ Items: [{ id: 'test-1' }] });
    const res = await handler({ headers: { Authorization: 'Bearer test-secret' } });
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body).registrations).toEqual([{ id: 'test-1' }]);
  });

  it('should return 500 on error', async () => {
    ddbMock.on(ScanCommand).rejects(new Error('DB fail'));
    const res = await handler({ headers: { Authorization: 'Bearer test-secret' } });
    expect(res.statusCode).toBe(500);
  });
});
