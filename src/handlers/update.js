// eslint-disable-next-line no-unused-vars
import * as typedefs from "../models/typedefs.js";
import { validateInput } from "../utils/validators.js";
import { updateItem } from "../services/dynamoDB.js";
import constants from "../utils/constants.js";
import { errorResponse } from "../utils/customError.js";
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
    validateInput(event, "updateNote");
    const { id } = event.pathParameters;
    const { title, content } = JSON.parse(event.body);
    const updateParams = setUpdateItemParam(title, content);
    const result = await updateItem(TABLE_NAME, { id }, updateParams);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    error["name"] = "updateNote";
    return errorResponse(error);
  }
};
