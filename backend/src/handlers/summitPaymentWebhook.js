const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, UpdateCommand, GetCommand } = require('@aws-sdk/lib-dynamodb');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const crypto = require('crypto');

const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const sesClient = new SESClient({});

const TABLE_NAME = process.env.TABLE_NAME;
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'registrations@irflo.net'; // Must be verified in AWS SES

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    // 1. Verify Razorpay Webhook Signature
    const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!RAZORPAY_WEBHOOK_SECRET) throw new Error('Missing RAZORPAY_WEBHOOK_SECRET');

    const signature = event.headers['x-razorpay-signature'] || event.headers['X-Razorpay-Signature'];
    if (!signature) {
      return { statusCode: 400, body: 'Missing signature' };
    }

    const expectedSignature = crypto.createHmac('sha256', RAZORPAY_WEBHOOK_SECRET).update(event.body).digest('hex');
    
    if (signature.length !== expectedSignature.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return { statusCode: 401, body: 'Invalid signature' };
    }

    // E.g., body.payload.payment.entity.notes.registrationId
    const registrationId = body?.payload?.payment?.entity?.notes?.registrationId || body.registrationId;

    if (!registrationId) {
      return { statusCode: 400, body: 'Missing registrationId' };
    }

    // 2. Mark as PAID in DynamoDB
    const updateResponse = await docClient.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id: registrationId },
      UpdateExpression: 'set #status = :status, paymentDetails = :payment',
      ExpressionAttributeNames: {
        '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':status': 'PAID',
        ':payment': body.payload?.payment?.entity || { dummy: 'data' }
      },
      ReturnValues: 'ALL_NEW'
    }));

    const registration = updateResponse.Attributes;
    
    // Basic HTML escaper
    const escapeHTML = str => String(str).replace(/[&<>'"]/g, tag => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));

    // 3. Send Confirmation Email via AWS SES
    if (registration && registration.email) {
      const emailParams = {
        Source: SENDER_EMAIL,
        Destination: {
          ToAddresses: [registration.email],
        },
        Message: {
          Subject: { Data: `Registration Confirmed: Thyroid Intervention Summit 2026` },
          Body: {
            Html: {
              Data: `
                <h3>Dear ${escapeHTML(registration.title)} ${escapeHTML(registration.name)},</h3>
                <p>Thank you for registering for the <strong>Thyroid Intervention Summit 2026</strong>.</p>
                <p>Your payment has been successfully received, and your registration is confirmed.</p>
                <p><strong>Registration ID:</strong> ${escapeHTML(registrationId)}</p>
                <p><strong>Category:</strong> ${escapeHTML(registration.category)}</p>
                <p><strong>Hands-on Workshop:</strong> ${registration.workshop ? 'Included (Day 1)' : 'Not Included'}</p>
                <br/>
                <p>We look forward to seeing you in New Delhi / Gurugram!</p>
                <p>Best regards,<br/>The Organizing Committee</p>
              `
            }
          }
        }
      };

      try {
        await sesClient.send(new SendEmailCommand(emailParams));
        console.log(`Confirmation email sent to ${registration.email}`);
      } catch (sesError) {
        console.error('Failed to send SES email. Make sure the sender email is verified in SES:', sesError);
        // We don't fail the webhook if the email fails, we still want the DB to be marked as PAID
      }
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };

  } catch (error) {
    console.error('Webhook Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Webhook processing failed' }) };
  }
};
