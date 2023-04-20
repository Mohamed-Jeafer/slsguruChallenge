import AWS from "aws-sdk";

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const readNote = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: process.env.NOTES_TABLE,
    Key: { id },
  };

  try {
    const result = await dynamoDB.get(params).promise();

    if (result.Item) {
      return {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Note not found" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Unable to read notes" }),
    };
  }
};
