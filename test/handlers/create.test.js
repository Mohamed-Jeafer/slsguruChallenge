// @ts-nocheck
/* global jest, describe, expect, test */

import { createNote } from "../../src/handlers/create.js";
import { createItem } from "../../src/services/dynamoDB.js";

jest.mock("../../src/services/dynamoDB.js");

describe("createNote", () => {
  test("should return 200 and the created note", async () => {
    createItem.mockResolvedValueOnce(true);
    const event = {
      body: JSON.stringify({
        title: "test_title",
        content: "test_content",
      }),
    };
    const result = await createNote(event);
    const body = JSON.parse(result.body);
    expect(result).toHaveProperty("statusCode", 201);
    expect(body).toHaveProperty("id", body.id);
    expect(body).toHaveProperty("title", "test_title");
    expect(body).toHaveProperty("content", "test_content");
  });

  test("should return 400 if the title is missing", async () => {
    const event = {
      body: JSON.stringify({
        content: "test",
      }),
    };

    const expected = {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing title or content",
      }),
    };

    const result = await createNote(event);
    expect(result).toEqual(expected);
  });

  test("should return 500 if there is an error", async () => {
    createItem.mockRejectedValueOnce(Error("some error"));
    const event = {
      body: JSON.stringify({
        title: "test_title",
        content: "test_content",
      }),
    };

    const result = await createNote(event);
    const message = JSON.parse(result.body).message;
    expect(message).toBe("Unable to create note");
    expect(result.statusCode).toBe(500);
  });
});
