// eslint-disable-next-line no-unused-vars
import * as typedefs from "../models/typedefs.js";
import { isValidID } from "../utils/validators.js";
import { deleteItem } from "../services/dynamoDB.js";
import constants from "../utils/constants.js";
import { customError, errorResponse } from "../utils/customError.js";
const { TABLE_NAME } = constants;

/**
 * Delete note
 * @description Deletes a single note from the database by ID.
 * @async
 * @function deleteNote
 * @param {typedefs.event} event
 * @returns {Promise<typedefs.response>}
 */
export const deleteNote = async (event) => {
  try {
    const { id } = event.pathParameters;
    if (!isValidID(id)) {
      throw customError(400, "Invalid ID", "deleteNote");
    }

    await deleteItem(TABLE_NAME, { id });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Note deleted successfully" }),
    };
  } catch (error) {
    error["source"] = "deleteNote";
    return errorResponse(error);
  }
};
