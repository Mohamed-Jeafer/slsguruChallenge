// @ts-nocheck
/* global jest, describe, expect, test */

import { readAllNotes } from "../../src/handlers/readAll.js";
import { getAllItems } from "../../src/services/dynamoDB.js";

jest.mock("../../src/services/dynamoDB.js");

describe("readAllNotes", () => {
  test("should return all notes", async () => {
    const notes = [
      { id: "1", title: "note 1" },
      { id: "2", title: "note 2" },
    ];
    getAllItems.mockResolvedValue(notes);
    const result = await readAllNotes();
    expect(result).toHaveProperty("statusCode", 200);
    expect(JSON.parse(result.body)).toEqual(notes);
  });

  test("should return empty array if no notes", async () => {
    getAllItems.mockResolvedValue([]);
    const result = await readAllNotes();
    const message = JSON.parse(result.body).message;
    expect(message).toBe("No items found.");
    expect(result.statusCode).toEqual(404);
  });

  test("returns a 500 if the database call fails", async () => {
    getAllItems.mockRejectedValue(new Error("Database error"));
    const result = await readAllNotes();
    const message = JSON.parse(result.body).message;
    expect(message).toBe("Unable to retrieve the notes.");
    expect(result.statusCode).toEqual(500);
  });
});
