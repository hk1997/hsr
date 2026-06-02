const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log("deleteDoctor event:", JSON.stringify(event, null, 2));
    try {
        const id = event.pathParameters ? event.pathParameters.id : null;
        if (!id) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ message: "Missing doctor ID in path" })
            };
        }

        await ddbDocClient.send(new DeleteCommand({
            TableName: process.env.TABLE_NAME,
            Key: { id }
        }));

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type,Authorization",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH,DELETE"
            },
            body: JSON.stringify({ id, deleted: true })
        };
    } catch (err) {
        console.error("Error in deleteDoctor:", err);
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
