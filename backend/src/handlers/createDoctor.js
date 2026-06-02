const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const crypto = require("crypto");

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log("createDoctor event:", JSON.stringify(event, null, 2));
    try {
        const body = JSON.parse(event.body || "{}");
        if (!body.name) {
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH,DELETE"
                },
                body: JSON.stringify({ message: "Missing doctor 'name'" })
            };
        }

        const id = crypto.randomUUID();
        const item = {
            id,
            name: body.name,
            createdAt: new Date().toISOString()
        };

        await ddbDocClient.send(new PutCommand({
            TableName: process.env.TABLE_NAME,
            Item: item
        }));

        return {
            statusCode: 201,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type,Authorization",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH,DELETE"
            },
            body: JSON.stringify(item)
        };
    } catch (err) {
        console.error("Error in createDoctor:", err);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type,Authorization",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH,DELETE"
            },
            body: JSON.stringify({ message: err.message })
        };
    }
};
