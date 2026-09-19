const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');

const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);

const TABLE_NAME = process.env.TABLE_NAME;
const ADMIN_SECRET = process.env.ADMIN_SECRET;
const crypto = require('crypto');

exports.handler = async (event) => {
  try {
    if (!ADMIN_SECRET) throw new Error('ADMIN_SECRET environment variable is missing');

    // 1. Auth Check (Timing Safe)
    const authHeader = event.headers.Authorization || event.headers.authorization;
    const expectedAuth = `Bearer ${ADMIN_SECRET}`;
    
    if (!authHeader || authHeader.length !== expectedAuth.length) {
      return { statusCode: 401, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: 'Unauthorized' }) };
    }
    
    if (!crypto.timingSafeEqual(Buffer.from(authHeader), Buffer.from(expectedAuth))) {
      return {
        statusCode: 401,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Unauthorized' }),
      };
    }

    // 2. Fetch all registrations (In production with thousands, use pagination/query)
    const scanResponse = await docClient.send(new ScanCommand({
      TableName: TABLE_NAME,
    }));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        registrations: scanResponse.Items || []
      }),
    };

  } catch (error) {
    console.error('Error fetching registrations:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to fetch registrations' }),
    };
  }
};
