// @ts-nocheck
/* global jest, describe, expect, test */

import { isValidID, validateInput } from "../../utils/validators.js";
import { v4 as uuidv4 } from "uuid";
import {
  validateCreateNoteInput,
  validateDeleteNoteInput,
  validateUpdateNoteInput,
  validateReadNoteInput,
} from "../../utils/inputValidators.js";
import { customError } from "../../utils/customError.js";

jest.mock("../../utils/inputValidators.js");

const uuid = uuidv4();
describe("isValidID UUID", () => {
  test("isValidID", () => {
    expect(isValidID("a")).toBe(false);
    expect(isValidID(uuid)).toBe(true);
  });
});

// this will validate the inputs of createNote, deleteNote, updateNote, readNote and readAllNotes
describe("validateInput", () => {
  test("createNote positive case, it should not throw an error", () => {
    const event = {
      body: '{"title":"Eid Shopping List","content":"new clothes"}',
    };
    validateInput(event, "createNote");
    expect(validateCreateNoteInput).toHaveBeenCalled();
    expect(validateCreateNoteInput).toHaveBeenCalledTimes(1);
    expect(() => validateInput(event, "createNote")).not.toThrow();
  });

  test("deleteNote positive case, it should not throw an error", () => {
    const event = {
      pathParameters: {
        id: uuid,
      },
    };
    validateInput(event, "deleteNote");
    expect(validateDeleteNoteInput).toHaveBeenCalled();
    expect(validateDeleteNoteInput).toHaveBeenCalledTimes(1);
    expect(() => validateInput(event, "deleteNote")).not.toThrow();
  });

  test("updateNote positive case, it should not throw an error", () => {
    const event = {
      pathParameters: {
        id: uuid,
      },
      body: '{"title":"Eid Shopping List","content":"new clothes"}',
    };
    validateInput(event, "updateNote");
    expect(validateUpdateNoteInput).toHaveBeenCalled();
    expect(validateUpdateNoteInput).toHaveBeenCalledTimes(1);
    expect(() => validateInput(event, "updateNote")).not.toThrow();
  });

  test("readNote positive case, it should not throw an error", () => {
    const event = {
      pathParameters: {
        id: uuid,
      },
    };
    validateInput(event, "readNote");
    expect(validateReadNoteInput).toHaveBeenCalled();
    expect(validateReadNoteInput).toHaveBeenCalledTimes(1);
    expect(() => validateInput(event, "readNote")).not.toThrow();
  });

  test("throws error for invalid source", () => {
    const event = {};
    const source = "invalidSource";
    expect(() => validateInput(event, source)).toThrowError(customError(400, "Invalid source", source));
  });
});
