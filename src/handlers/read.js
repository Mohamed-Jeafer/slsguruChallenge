// eslint-disable-next-line no-unused-vars
import * as typedefs from "./models/typedefs.js";
import { isValidID } from "./utils/validators.js";
import constants from "./utils/constants.js";
import { getItem } from "./services/dynamoDB.js";
const { TABLE_NAME } = constants;

/**
 * Read a note
 * @param {typedefs.event} event
 * @returns {Promise<typedefs.response>}
 */
export const readNote = async (event) => {
  try {
    const { id } = event.pathParameters;
    if (!isValidID(id)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid ID" }),
      };
    }

    const item = await getItem(TABLE_NAME, { id });
    if (!item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Note not found" }),
      };
    }

    {
      const { title, content } = item;
      return {
        statusCode: 200,
        body: JSON.stringify({ title, content }),
      };
    }
  } catch (error) {
    console.error(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Unable to read notes" }),
    };
  }
};
