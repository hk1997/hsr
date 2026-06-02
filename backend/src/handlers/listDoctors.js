const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
    console.log("listDoctors event:", JSON.stringify(event, null, 2));
    try {
        const data = await ddbDocClient.send(new ScanCommand({
            TableName: process.env.TABLE_NAME
        }));

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type,Authorization",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH,DELETE"
            },
            body: JSON.stringify(data.Items || [])
        };
    } catch (err) {
        console.error("Error in listDoctors:", err);
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
