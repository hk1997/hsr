const { handler } = require('../../src/handlers/summitGetSeats');
const { mockClient } = require('aws-sdk-client-mock');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');

const ddbMock = mockClient(DynamoDBDocumentClient);

describe('summitGetSeats', () => {
  beforeEach(() => {
    ddbMock.reset();
  });

  it('should return correct seats count when booked is less than capacity', async () => {
    ddbMock.on(ScanCommand).resolves({ Count: 20 });
    const res = await handler({});
    expect(res.statusCode).toBe(200);
    
    const body = JSON.parse(res.body);
    expect(body.booked).toBe(20);
    expect(body.remaining).toBe(30);
    expect(body.capacity).toBe(50);
  });

  it('should return 0 remaining when booked exceeds capacity', async () => {
    ddbMock.on(ScanCommand).resolves({ Count: 55 });
    const res = await handler({});
    expect(res.statusCode).toBe(200);
    
    const body = JSON.parse(res.body);
    expect(body.booked).toBe(55);
    expect(body.remaining).toBe(0);
  });

  it('should return 500 on db error', async () => {
    ddbMock.on(ScanCommand).rejects(new Error('DB Error'));
    const res = await handler({});
    expect(res.statusCode).toBe(500);
  });
});
