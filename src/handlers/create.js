// eslint-disable-next-line no-unused-vars
import * as typedefs from "../models/typedefs.js";
import { v4 as uuidv4 } from "uuid";
import constants from "../utils/constants.js";
import { createItem } from "../services/dynamoDB.js";
import { errorResponse } from "../utils/customError.js";
import { validateInput } from "../utils/validators.js";
const { TABLE_NAME } = constants;

/**
 * Creates a new note.
 * @description Inserts a new note into the database and returns the note.
 * @async
 * @function createNote
 * @param {typedefs.event} event
 * @returns {Promise<typedefs.response>}
 */
export const createNote = async (event) => {
  try {
    validateInput(event, "createNote");
    const { title, content } = JSON.parse(event.body);

    const item = {
      id: uuidv4(),
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await createItem(TABLE_NAME, item);

    return {
      statusCode: 201,
      body: JSON.stringify({ title: item.title, content: item.content, id: item.id }),
    };
  } catch (error) {
    error["name"] = "createNote";
    return errorResponse(error);
  }
};
