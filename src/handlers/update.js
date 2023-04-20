// eslint-disable-next-line no-unused-vars
import * as typedefs from "./models/typedefs.js";
import { isValidID } from "./utils/validators.js";
import { updateItem } from "./services/dynamoDB.js";
import constants from "./utils/constants.js";
const { TABLE_NAME } = constants;

/**
 * Update a note
 * @param {typedefs.event} event
 * @returns {Promise<typedefs.response>}
 */
export const updateNote = async (event) => {
  try {
    const { id } = event.pathParameters;
    const { title, content } = JSON.parse(event.body);

    if (!isValidID(id)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid ID" }),
      };
    }

    const updateExpression = "SET title = :title, content = :content, updatedAt = :updatedAt";
    const ExpressionAttributeValues = {
      ":title": title,
      ":content": content,
      ":updatedAt": new Date().toISOString(),
    };
    const ReturnValues = "ALL_NEW";

    const result = await updateItem(TABLE_NAME, { id }, updateExpression, ExpressionAttributeValues, ReturnValues);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Unable to update note" }),
    };
  }
};
