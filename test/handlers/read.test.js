// @ts-nocheck
/* global jest, describe, expect, test */

import { readNote } from "../../src/handlers/read.js";
import { getItem } from "../../src/services/dynamoDB.js";
import { v4 as uuidv4 } from "uuid";
const uuid = uuidv4();

jest.mock("../../src/services/dynamoDB.js");
describe("readNote", () => {
  test("returns a note", async () => {
    getItem.mockResolvedValue({
      id: uuid,
      title: "My Note",
      content: "This is my note",
    });

    const result = await readNote({
      pathParameters: {
        id: uuid,
      },
    });

    expect(result.statusCode).toEqual(200);
    expect(JSON.parse(result.body)).toEqual({
      title: "My Note",
      content: "This is my note",
    });
  });

  test("returns a 404 if the note does not exist", async () => {
    getItem.mockResolvedValue(null);
    const result = await readNote({
      pathParameters: {
        id: uuid,
      },
    });
    expect(result.statusCode).toEqual(404);
  });

  test("returns a 500 if the database call fails", async () => {
    getItem.mockRejectedValue(new Error("Database error"));
    const result = await readNote({
      pathParameters: {
        id: uuid,
      },
    });
    const message = JSON.parse(result.body).message;
    expect(message).toBe("Unable to read note.");
    expect(result.statusCode).toEqual(500);
  });
});
