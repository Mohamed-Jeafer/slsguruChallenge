// eslint-disable-next-line no-unused-vars
import * as typedefs from "./models/typedefs.js";
import { isValidID } from "./utils/validators.js";
import { deleteItem } from "./services/dynamoDB.js";
import constants from "./utils/constants.js";
const { TABLE_NAME } = constants;

/**
 * Deletes a note
 * @param {typedefs.event} event
 * @returns {Promise<typedefs.response>}
 */
export const deleteNote = async (event) => {
  try {
    const { id } = event.pathParameters;
    if (!isValidID(id)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid ID" }),
      };
    }

    await deleteItem(TABLE_NAME, { id });
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
