import { customError } from "./customError.js";
import { isValidID } from "./validators.js";

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

export { validateCreateNoteInput, validateUpdateNoteInput, validateDeleteNoteInput, validateReadNoteInput };
