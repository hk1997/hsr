const { handler } = require('../../src/handlers/summitPaymentWebhook');
const { mockClient } = require('aws-sdk-client-mock');
const { DynamoDBDocumentClient, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const crypto = require('crypto');

const ddbMock = mockClient(DynamoDBDocumentClient);
const sesMock = mockClient(SESClient);

describe('summitPaymentWebhook', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    ddbMock.reset();
    sesMock.reset();
    process.env = { ...OLD_ENV, RAZORPAY_WEBHOOK_SECRET: 'test_secret' };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  const getSignature = (bodyStr) => {
    return crypto.createHmac('sha256', 'test_secret').update(bodyStr).digest('hex');
  };

  it('should return 400 if signature is missing', async () => {
    const event = { headers: {}, body: JSON.stringify({}) };
    const res = await handler(event);
    expect(res.statusCode).toBe(400);
    expect(res.body).toBe('Missing signature');
  });

  it('should return 401 if signature is invalid', async () => {
    const event = { 
      headers: { 'x-razorpay-signature': 'invalid' }, 
      body: JSON.stringify({}) 
    };
    const res = await handler(event);
    expect(res.statusCode).toBe(401);
    expect(res.body).toBe('Invalid signature');
  });

  it('should return 400 if registrationId is missing', async () => {
    const bodyStr = JSON.stringify({});
    const event = { 
      headers: { 'x-razorpay-signature': getSignature(bodyStr) }, 
      body: bodyStr 
    };
    const res = await handler(event);
    expect(res.statusCode).toBe(400);
    expect(res.body).toBe('Missing registrationId');
  });

  it('should update DB and send email on successful payment', async () => {
    const bodyStr = JSON.stringify({
      payload: { payment: { entity: { notes: { registrationId: 'TIS-123' } } } }
    });
    const event = {
      headers: { 'x-razorpay-signature': getSignature(bodyStr) }, 
      body: bodyStr
    };
    
    ddbMock.on(UpdateCommand).resolves({
      Attributes: { email: 'test@example.com', name: 'Test', title: 'Dr', category: 'General' }
    });
    sesMock.on(SendEmailCommand).resolves({});

    const res = await handler(event);
    
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body).success).toBe(true);
    expect(ddbMock.calls().length).toBe(1);
    expect(sesMock.calls().length).toBe(1);
  });

  it('should succeed even if SES email fails', async () => {
    const bodyStr = JSON.stringify({ registrationId: 'TIS-123' });
    const event = { 
      headers: { 'x-razorpay-signature': getSignature(bodyStr) }, 
      body: bodyStr 
    };
    
    ddbMock.on(UpdateCommand).resolves({
      Attributes: { email: 'test@example.com' }
    });
    sesMock.on(SendEmailCommand).rejects(new Error('SES Error'));

    const res = await handler(event);
    
    expect(res.statusCode).toBe(200);
  });

  it('should return 500 on db error', async () => {
    const bodyStr = JSON.stringify({ registrationId: 'TIS-123' });
    const event = { 
      headers: { 'x-razorpay-signature': getSignature(bodyStr) }, 
      body: bodyStr 
    };
    ddbMock.on(UpdateCommand).rejects(new Error('DB Error'));

    const res = await handler(event);
    expect(res.statusCode).toBe(500);
  });
});
