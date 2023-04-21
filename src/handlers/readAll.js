// eslint-disable-next-line no-unused-vars
import * as typedefs from "../models/typedefs.js";
import constants from "../utils/constants.js";
import { getAllItems } from "../services/dynamoDB.js";
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
    if (!items) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Notes not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch (error) {
    console.error(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Unable to read notes" }),
    };
  }
};
