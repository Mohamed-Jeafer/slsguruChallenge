// @ts-nocheck
/* global describe, jest, expect, test */

import { deleteNote } from "../../handlers/delete.js";
import { deleteItem } from "../../services/dynamoDB.js";
import { v4 as uuidv4 } from "uuid";
jest.mock("../../services/dynamoDB.js");
describe("deleteNote", () => {
  test("should return 200", async () => {
    deleteItem.mockResolvedValueOnce(true);
    const event = {
      pathParameters: {
        id: uuidv4(),
      },
    };
    const result = await deleteNote(event);
    expect(result.statusCode).toBe(200);
  });

  test("should return 400, wrong ID", async () => {
    const event = {
      pathParameters: {
        id: "Invalid ID",
      },
    };
    const result = await deleteNote(event);
    const message = JSON.parse(result.body).message;
    expect(message).toBe("Invalid ID");
    expect(result.statusCode).toBe(400);
  });

  test("should return 500, unable to delete note", async () => {
    deleteItem.mockRejectedValueOnce(Error("some error"));
    const event = {
      pathParameters: {
        id: uuidv4(),
      },
    };
    const result = await deleteNote(event);
    const message = JSON.parse(result.body).message;
    expect(message).toBe("Unable to delete note");
    expect(result.statusCode).toBe(500);
  });
});
