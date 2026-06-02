const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log("updateCase event:", JSON.stringify(event, null, 2));
    try {
        const id = event.pathParameters ? event.pathParameters.id : null;
        if (!id) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ message: "Missing case ID in path" })
            };
        }

        const body = JSON.parse(event.body || "{}");

        // Fetch existing item
        const existing = await ddbDocClient.send(new GetCommand({
            TableName: process.env.TABLE_NAME,
            Key: { id }
        }));

        if (!existing.Item) {
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH,DELETE"
                },
                body: JSON.stringify({ message: `Case ${id} not found` })
            };
        }

        const updatedItem = {
            ...existing.Item,
            ...body,
            id, // Keep the same ID
            updatedAt: new Date().toISOString()
        };

        await ddbDocClient.send(new PutCommand({
            TableName: process.env.TABLE_NAME,
            Item: updatedItem
        }));

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type,Authorization",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH,DELETE"
            },
            body: JSON.stringify(updatedItem)
        };
    } catch (err) {
        console.error("Error in updateCase:", err);
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
