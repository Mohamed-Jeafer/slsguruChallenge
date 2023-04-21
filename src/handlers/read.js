// eslint-disable-next-line no-unused-vars
import * as typedefs from "../models/typedefs.js";
import { isValidID } from "../utils/validators.js";
import constants from "../utils/constants.js";
import { getItem } from "../services/dynamoDB.js";
import { customError, errorResponse } from "../utils/customError.js";
const { TABLE_NAME } = constants;

/**
 * Reads a note
 * @description  This function is used to read a note from DynamoDB by ID
 * @async
 * @function readNote
 * @param {typedefs.event} event
 * @returns {Promise<typedefs.response>}
 */

export const readNote = async (event) => {
  try {
    const { id } = event.pathParameters;
    if (!isValidID(id)) {
      throw customError(400, "Invalid ID", "readNote");
    }

    const item = await getItem(TABLE_NAME, { id });
    if (!item) {
      throw customError(404, "Note not found", "readNote");
    }

    const { title, content } = item;
    return {
      statusCode: 200,
      body: JSON.stringify({ title, content }),
    };
  } catch (error) {
    error["source"] = "deleteNote";
    return errorResponse(error);
  }
};
