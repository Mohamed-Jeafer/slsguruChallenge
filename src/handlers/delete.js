import AWS from "aws-sdk";

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const deleteNote = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: process.env.NOTES_TABLE,
    Key: { id },
  };

  try {
    await dynamoDB.delete(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Note deleted successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Unable to delete note" }),
    };
  }
};
