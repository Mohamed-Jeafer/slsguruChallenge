// eslint-disable-next-line no-unused-vars
import * as typedefs from "../models/typedefs.js";
import { customError } from "./customError.js";
import {
  validateCreateNoteInput,
  validateDeleteNoteInput,
  validateReadNoteInput,
  validateUpdateNoteInput,
} from "./inputValidators.js";

/**
 * This function validates the ID.
 * @param {string} uuid
 * @returns {boolean}
 */
function isValidID(uuid) {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[8-9a-b][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regex.test(uuid);
}

/**
 * This function validates the input.
 * @param {typedefs.event} event
 * @param {string} source
 */
function validateInput(event, source) {
  switch (source) {
    case "createNote":
      validateCreateNoteInput(event, source);
      break;

    case "updateNote":
      validateUpdateNoteInput(event, source);
      break;

    case "deleteNote":
      validateDeleteNoteInput(event, source);
      break;

    case "readNote":
      validateReadNoteInput(event, source);
      break;
    default:
      throw customError(400, "Invalid source", source);
  }
}

export { isValidID, validateInput };
