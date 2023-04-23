// eslint-disable-next-line no-unused-vars
import * as typedefs from "../models/typedefs.js";
import constants from "../utils/constants.js";
import { getAllItems } from "../services/dynamoDB.js";
import { customError, errorResponse } from "../utils/customError.js";
const { TABLE_NAME } = constants;

/**
 * Read all notes
 * @description This function reads all the notes from the database
 * @async
 * @function readAllNotes
 * @returns {Promise<typedefs.response>}
 */
export const readAllNotes = async () => {
  try {
    const items = await getAllItems(TABLE_NAME);
    if (items.length === 0) {
      throw customError(404, "No items found.", "readAllNotes");
    }

    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch (error) {
    error["name"] = "readAllNotes";
    return errorResponse(error);
  }
};
