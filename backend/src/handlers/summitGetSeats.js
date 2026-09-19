const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');

const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);

const TABLE_NAME = process.env.TABLE_NAME;
const WORKSHOP_CAPACITY = 50; // As per the HTML

exports.handler = async (event) => {
  try {
    // In a production app with high volume, scanning is expensive.
    // A better approach is maintaining an atomic counter, but a scan is fine for a 50-person cap.
    const scanResponse = await docClient.send(new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: '#workshop = :workshop AND #status = :status',
      ExpressionAttributeNames: {
        '#workshop': 'workshop',
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':workshop': true,
        ':status': 'PAID', // Only count fully paid seats
      },
      Select: 'COUNT'
    }));

    const bookedSeats = scanResponse.Count || 0;
    const remainingSeats = Math.max(0, WORKSHOP_CAPACITY - bookedSeats);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        booked: bookedSeats,
        remaining: remainingSeats,
        capacity: WORKSHOP_CAPACITY
      }),
    };

  } catch (error) {
    console.error('Error fetching seats:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to fetch seats' }),
    };
  }
};
