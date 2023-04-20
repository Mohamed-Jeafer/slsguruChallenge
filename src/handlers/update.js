import AWS from "aws-sdk";

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const updateNote = async (event) => {
  const { id } = event.pathParameters;
  const { title, content } = JSON.parse(event.body);

  const params = {
    TableName: process.env.NOTES_TABLE,
    Key: { id },
    UpdateExpression: "SET title = :title, content = :content, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":title": title,
      ":content": content,
      ":updatedAt": new Date().toISOString(),
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const result = await dynamoDB.update(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Unable to update note" }),
    };
  }
};
