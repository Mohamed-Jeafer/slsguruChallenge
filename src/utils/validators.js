import { customError } from "./customError.js";

/**
 * This function validates the ID.
 * @param {string} uuid
 * @returns {boolean}
 */
function isValidID(uuid) {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[8-9a-b][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regex.test(uuid);
}

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

function validateCreateNoteInput(event, source) {
  if (!event.body) {
    throw customError(400, "Missing body", source);
  }
  const body = JSON.parse(event.body);
  if (!body?.title || !body?.content) {
    throw customError(400, "Missing title or content", source);
  }
}

function validateUpdateNoteInput(event, source) {
  if (!event.body) {
    throw customError(400, "Missing body", source);
  }
  if (!event.pathParameters) {
    throw customError(400, "Missing pathParameters", source);
  }
  const body = JSON.parse(event.body);
  if (!body?.title || !body?.content) {
    throw customError(400, "Missing title or content", source);
  }

  if (!isValidID(event.pathParameters.id)) {
    throw customError(400, "Invalid ID", source);
  }
}

function validateDeleteNoteInput(event, source) {
  if (!event.pathParameters) {
    throw customError(400, "Missing pathParameters", source);
  }
  if (!isValidID(event.pathParameters.id)) {
    throw customError(400, "Invalid ID", source);
  }
}

function validateReadNoteInput(event, source) {
  if (!event.pathParameters) {
    throw customError(400, "Missing pathParameters", source);
  }
  if (!isValidID(event.pathParameters.id)) {
    throw customError(400, "Invalid ID", source);
  }
}
export { isValidID, validateInput };
