// @ts-nocheck
/* global describe, expect, test */

import { customError, errorResponse } from "../../src/utils/customError.js";

describe("customError", () => {
  test("should return a custom error", () => {
    const errorObject = customError(404, "note not found.", "updateNote");
    expect(errorObject).toHaveProperty("statusCode", 404);
    expect(errorObject).toHaveProperty("message", "note not found.");
    expect(errorObject).toHaveProperty("name", "updateNote");
    expect(errorObject).toBeInstanceOf(Error);
  });
  test("should return a custom error if no name is passed", () => {
    const errorObject = customError(404, "note not found.");
    expect(errorObject).toHaveProperty("statusCode", 404);
    expect(errorObject).toHaveProperty("message", "note not found.");
    expect(errorObject).toBeInstanceOf(Error);
  });
});
describe("errorResponse", () => {
  test("should return a custom error response object", () => {
    const customError = new Error("note not found.");
    customError.statusCode = 404;
    customError.name = "updateNote";
    const errorResponseObject = errorResponse(customError);
    expect(errorResponseObject).toHaveProperty("statusCode", 404);
    expect(errorResponseObject).toHaveProperty("body", '{"message":"note not found."}');
  });
  test("should return a 500 Something went wrong error response object", () => {
    const customError = new Error("note not found");
    const errorResponseObject = errorResponse(customError);
    expect(errorResponseObject).toHaveProperty("statusCode", 500);
    expect(errorResponseObject).toHaveProperty("body", '{"message":"Something went wrong, please try again later."}');
  });
});
