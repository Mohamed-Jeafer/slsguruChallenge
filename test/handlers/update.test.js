// @ts-nocheck
/* global jest, describe, expect, test */

import { updateNote } from "../../src/handlers/update.js";
import { updateItem } from "../../src/services/dynamoDB.js";
import { v4 as uuidv4 } from "uuid";
const uuid = uuidv4();
jest.mock("../../src/services/dynamoDB.js");

describe("updateNote", () => {
  test("should return updated notes successfully", async () => {
    updateItem.mockResolvedValue({
      id: uuid,
      title: "test",
      content: "test",
      createdAt: "xxxx",
      updatedAt: "xxxx",
    });

    const event = {
      pathParameters: {
        id: uuid,
      },
      body: JSON.stringify({
        title: "test",
        content: "test",
      }),
    };
    const result = await updateNote(event);
    expect(result).toHaveProperty("statusCode", 200);
    expect(JSON.parse(result.body)).toHaveProperty("id", uuid);
    expect(updateItem).toHaveBeenCalled();
  });

  test("should return error if updateItem fails", async () => {
    updateItem.mockRejectedValue(new Error("error"));
    const event = {
      pathParameters: {
        id: uuid,
      },
      body: JSON.stringify({
        title: "test",
        content: "test",
      }),
    };
    const result = await updateNote(event);
    expect(result).toHaveProperty("statusCode", 500);
    expect(JSON.parse(result.body)).toHaveProperty("message", "Unable to update note");
    expect(updateItem).toHaveBeenCalled();
  });

  test("should return error if id is not provided", async () => {
    const event = {
      pathParameters: {
        id: "",
      },
      body: JSON.stringify({
        title: "test",
        content: "test",
      }),
    };
    const result = await updateNote(event);
    expect(result).toHaveProperty("statusCode", 400);
    expect(JSON.parse(result.body)).toHaveProperty("message", "Invalid ID");
  });
});
