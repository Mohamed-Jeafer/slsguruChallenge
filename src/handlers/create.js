import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const createNote = async (event) => {
  const { title, content } = JSON.parse(event.body);

  const params = {
    TableName: process.env.NOTES_TABLE,
    Item: {
      id: uuidv4(),
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };

  try {
    await dynamoDB.put(params).promise();

    return {
      statusCode: 201,
      body: JSON.stringify(params.Item),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Unable to create note" }),
    };
  }
};
