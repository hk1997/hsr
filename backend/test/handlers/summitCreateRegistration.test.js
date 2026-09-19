const { handler } = require('../../src/handlers/summitCreateRegistration');
const { mockClient } = require('aws-sdk-client-mock');
const { DynamoDBDocumentClient, QueryCommand, PutCommand } = require('@aws-sdk/lib-dynamodb');

const ddbMock = mockClient(DynamoDBDocumentClient);

jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomBytes: jest.fn(() => Buffer.from('12345678', 'hex'))
}));

describe('summitCreateRegistration', () => {
  beforeEach(() => {
    ddbMock.reset();
  });

  it('should return 400 if email is missing', async () => {
    const event = { body: JSON.stringify({ name: 'Test' }) };
    const res = await handler(event);
    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.body).error).toMatch(/Email is required/);
  });

  it('should return 400 if completed registration already exists', async () => {
    ddbMock.on(QueryCommand).resolves({ Items: [{ status: 'PAID' }] });
    const event = { body: JSON.stringify({ email: 'test@example.com' }) };
    const res = await handler(event);
    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.body).error).toMatch(/completed registration/);
  });

  it('should return 400 if pending registration already exists', async () => {
    ddbMock.on(QueryCommand).resolves({ Items: [{ status: 'PENDING' }] });
    const event = { body: JSON.stringify({ email: 'test@example.com' }) };
    const res = await handler(event);
    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.body).error).toMatch(/pending registration/);
  });

  it('should return 200 and save registration on success', async () => {
    ddbMock.on(QueryCommand).resolves({ Items: [] });
    ddbMock.on(PutCommand).resolves({});

    const event = { body: JSON.stringify({ email: 'test@example.com', name: 'Test', total: 100 }) };
    const res = await handler(event);
    
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(true);
    expect(body.registrationId).toMatch(/^TIS-[0-9A-F]{8}$/);
  });

  it('should return 500 on db error', async () => {
    ddbMock.on(QueryCommand).rejects(new Error('DB Error'));
    const event = { body: JSON.stringify({ email: 'test@example.com' }) };
    const res = await handler(event);
    expect(res.statusCode).toBe(500);
  });
});
