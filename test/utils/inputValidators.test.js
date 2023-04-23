// @ts-nocheck
/* global describe, expect, test */

import {
  validateCreateNoteInput,
  validateDeleteNoteInput,
  validateUpdateNoteInput,
  validateReadNoteInput,
} from "../../src/utils/inputValidators.js";
import { customError } from "../../src/utils/customError.js";
import { v4 as uuidv4 } from "uuid";
const uuid = uuidv4();
describe("validateCreateNoteInput", () => {
  test("validateCreateNoteInput throw error if body is missing", () => {
    const input = {
      title: "title",
      content: "content",
    };
    expect(() => validateCreateNoteInput(input, "createNote")).toThrow(customError(400, "Missing body.", "createNote"));
  });
  test("validateCreateNoteInput throw error if title is missing", () => {
    const input = {
      body: JSON.stringify({
        content: "content",
      }),
      pathParameters: {
        id: uuid,
      },
    };
    expect(() => validateCreateNoteInput(input, "createNote")).toThrow(
      customError(400, "Missing title or content.", "createNote")
    );
  });

  test("validateCreateNoteInput throw error if content is missing", () => {
    const input = {
      body: JSON.stringify({
        title: "title",
      }),
      pathParameters: {
        id: uuid,
      },
    };
    expect(() => validateCreateNoteInput(input, "createNote")).toThrow(
      customError(400, "Missing title or content.", "createNote")
    );
  });
});

describe("validateUpdateNoteInput", () => {
  test("validateUpdateNoteInput throw error if body is missing", () => {
    const input = {
      body: undefined,
      pathParameters: {
        id: uuid,
      },
    };
    expect(() => validateUpdateNoteInput(input, "updateNote")).toThrow(customError(400, "Missing body.", "updateNote"));
  });

  test("validateUpdateNoteInput throw error if title is missing", () => {
    const input = {
      body: JSON.stringify({
        content: "content",
      }),
      pathParameters: {
        id: uuid,
      },
    };
    expect(() => validateUpdateNoteInput(input, "updateNote")).toThrow(
      customError(400, "Missing title or content.", "updateNote")
    );
  });

  test("validateUpdateNoteInput throw error if content is missing", () => {
    const input = {
      body: JSON.stringify({
        title: "title",
      }),
      pathParameters: {
        id: uuid,
      },
    };
    expect(() => validateUpdateNoteInput(input, "updateNote")).toThrow(
      customError(400, "Missing title or content.", "updateNote")
    );
  });

  test("validateUpdateNoteInput throw error if pathParams is missing or invalid", () => {
    const input = {
      body: JSON.stringify({
        title: "title",
        content: "content",
      }),
    };
    expect(() => validateUpdateNoteInput(input, "updateNote")).toThrow(
      customError(400, "Missing path Parameters.", "updateNote")
    );
  });
});

describe("validateDeleteNoteInput", () => {
  test("validateDeleteNoteInput throw error if id is missing or invalid", () => {
    const input = {
      pathParameters: {
        id: "uuid",
      },
    };
    expect(() => validateDeleteNoteInput(input, "deleteNote")).toThrow(customError(400, "Invalid ID.", "deleteNote"));
  });
  test("validateDeleteNoteInput throw error if pathParams is missing or invalid", () => {
    const input = {
      body: JSON.stringify({
        title: "title",
        content: "content",
      }),
    };
    expect(() => validateDeleteNoteInput(input, "updateNote")).toThrow(
      customError(400, "Missing path Parameters.", "updateNote")
    );
  });
});

describe("validateReadNoteInput", () => {
  test("validateReadNoteInput throw error if id is missing or invalid", () => {
    const input = {
      pathParameters: {
        id: "uuid",
      },
    };
    expect(() => validateReadNoteInput(input, "readNote")).toThrow(customError(400, "Invalid ID.", "readNote"));
  });
  test("validateReadNoteInput throw error if pathParams is missing or invalid", () => {
    const input = {
      body: JSON.stringify({
        title: "title",
        content: "content",
      }),
    };
    expect(() => validateReadNoteInput(input, "updateNote")).toThrow(
      customError(400, "Missing path Parameters.", "updateNote")
    );
  });
});
