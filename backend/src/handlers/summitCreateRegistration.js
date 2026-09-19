const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const crypto = require('crypto');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    // 0. Prevent duplicate registrations by checking email
    if (!body.email) {
      return { statusCode: 400, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: 'Email is required' }) };
    }
    
    const existingCheck = await docClient.send(new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': body.email.trim().toLowerCase() }
    }));

    if (existingCheck.Items && existingCheck.Items.length > 0) {
      const existing = existingCheck.Items[0];
      if (existing.status === 'PAID') {
        return { statusCode: 400, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: 'A completed registration with this email already exists.' }) };
      } else {
        return { statusCode: 400, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ error: 'A pending registration with this email already exists. Please contact support if you need to restart payment.' }) };
      }
    }

    // 1. Generate a unique Registration ID
    const registrationId = `TIS-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    // 2. Prepare the registration record
    const registrationRecord = {
      id: registrationId,
      status: 'PENDING', // Will be updated to PAID by the webhook
      timestamp: new Date().toISOString(),
      
      // Personal Details
      title: body.title,
      name: body.name,
      email: body.email.trim().toLowerCase(),
      mobile: body.mobile,
      institution: body.institution,
      city: body.city,
      
      // Professional Details
      specialty: body.specialty,
      category: body.category,
      medicalRegNo: body.medicalRegNo,
      diet: body.diet,
      
      // Preferences & Add-ons
      workshop: body.workshop === 'Yes',
      
      // Payment Breakdown
      tier: body.tier,
      baseFee: body.baseFee,
      workshopFee: body.workshopFee,
      gst: body.gst,
      totalAmount: body.total,
      
      // Trainee Proof (S3 key or Base64 could go here)
      proofFileName: body.proofFileName,
    };

    // 3. Save to DynamoDB
    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: registrationRecord,
    }));

    // 4. [TODO: LATER] Call Razorpay API to create an Order
    // For now, we will return a dummy order ID so the frontend can be built
    const dummyRazorpayOrderId = `order_dummy_${crypto.randomBytes(6).toString('hex')}`;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        success: true,
        registrationId: registrationId,
        razorpayOrderId: dummyRazorpayOrderId,
        amount: body.total
      }),
    };

  } catch (error) {
    console.error('Error creating registration:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
