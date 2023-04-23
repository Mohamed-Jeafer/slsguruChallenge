// eslint-disable-next-line no-unused-vars
import * as typedefs from "../models/typedefs.js";
import { isValidID } from "../utils/validators.js";
import { updateItem } from "../services/dynamoDB.js";
import constants from "../utils/constants.js";
import { customError, errorResponse } from "../utils/customError.js";
import { setUpdateItemParam } from "../utils/helpers.js";
const { TABLE_NAME } = constants;

/**
 * Update a note
 * @description  This function updates a note in DynamoDB using the ID of the note.
 * @async
 * @function updateNote
 * @param {typedefs.event} event
 * @returns {Promise<typedefs.response>}
 */
export const updateNote = async (event) => {
  try {
    const { id } = event.pathParameters;
    const { title, content } = JSON.parse(event.body);

    if (!isValidID(id)) {
      throw customError(400, "Invalid ID", "updateNote");
    }

    const { UpdateExpression, ExpressionAttributeValues, ReturnValues } = setUpdateItemParam(title, content);
    const result = await updateItem(TABLE_NAME, { id }, UpdateExpression, ExpressionAttributeValues, ReturnValues);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    error["source"] = "updateNote";
    return errorResponse(error);
  }
};
