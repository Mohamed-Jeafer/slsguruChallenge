// eslint-disable-next-line no-unused-vars
import * as typedefs from "../models/typedefs.js";
import { customError } from "./customError.js";
import { isValidID } from "./validators.js";

/**
 * Validates the create note input.
 * @param {typedefs.event} event
 * @param {string} source
 */
function validateCreateNoteInput(event, source) {
  if (!event.body) {
    throw customError(400, "Missing body.", source);
  }
  const body = JSON.parse(event.body);
  if (!body?.title || !body?.content) {
    throw customError(400, "Missing title or content.", source);
  }
}

/**
 * Validates the update note input.
 * @param {typedefs.event} event
 * @param {string} source
 */
function validateUpdateNoteInput(event, source) {
  if (!event.body) {
    throw customError(400, "Missing body.", source);
  }
  if (!event.pathParameters) {
    throw customError(400, "Missing path Parameters.", source);
  }
  const body = JSON.parse(event.body);
  if (!body?.title || !body?.content) {
    throw customError(400, "Missing title or content.", source);
  }

  if (!isValidID(event.pathParameters.id)) {
    throw customError(400, "Invalid ID.", source);
  }
}

/**
 * Validates the delete note input.
 * @param {typedefs.event} event
 * @param {string} source
 */
function validateDeleteNoteInput(event, source) {
  if (!event.pathParameters) {
    throw customError(400, "Missing path Parameters.", source);
  }
  if (!isValidID(event.pathParameters.id)) {
    throw customError(400, "Invalid ID.", source);
  }
}

/**
 * Validates the read note input.
 * @param {typedefs.event} event
 * @param {string} source
 */
function validateReadNoteInput(event, source) {
  if (!event.pathParameters) {
    throw customError(400, "Missing path Parameters.", source);
  }
  if (!isValidID(event.pathParameters.id)) {
    throw customError(400, "Invalid ID.", source);
  }
}

export { validateCreateNoteInput, validateUpdateNoteInput, validateDeleteNoteInput, validateReadNoteInput };
