// @ts-nocheck
/* global jest, describe, test, expect, beforeEach */

import { ddbDocClient } from "../../src/services/ddbDocClient.js";
import { deleteItem, getItem, createItem, getAllItems, updateItem } from "../../src/services/dynamoDB.js";
import {
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { setUpdateItemParam } from "../../src/utils/helpers.js";
import { customError } from "../../src/utils/customError.js";
// write test cases for each function here using describe for all functions, and mock the returned values
// for each function call

jest.mock("../../src/services/ddbDocClient.js");
ddbDocClient.send = jest.fn().mockResolvedValue({});

const mockResponseGetItem = {
  id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
  title: "test",
  content: "30",
  updatedAt: "XXXX",
  createdAt: "XXXX",
};

const mockMarshallGetItem = {
  Item: {
    id: { S: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" },
    title: { S: "test" },
    content: { S: "30" },
    updatedAt: { S: "XXXX" },
    createdAt: { S: "XXXX" },
  },
};

const mockResponseGetAllItems = [
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    title: "test",
    content: "30",
    updatedAt: "XXXX",
    createdAt: "XXXX",
  },

  {
    id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    title: "test2",
    content: "40",
    updatedAt: "XXXX",
    createdAt: "XXXX",
  },
];
const mockMarshallGetAllItems = {
  Items: [
    {
      id: { S: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" },
      title: { S: "test" },
      content: { S: "30" },
      updatedAt: { S: "XXXX" },
      createdAt: { S: "XXXX" },
    },
    {
      id: { S: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb" },
      title: { S: "test2" },
      content: { S: "40" },
      updatedAt: { S: "XXXX" },
      createdAt: { S: "XXXX" },
    },
  ],
  LastEvaluatedKey: undefined,
};

const mockResponseUpdateItem = {
  id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
  title: "test",
  content: "new content",
  updatedAt: "XXXX",
  createdAt: "XXXX",
};

const mockMarshallUpdateItem = {
  Attributes: {
    id: { S: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" },
    title: { S: "test" },
    content: { S: "new content" },
    updatedAt: { S: "XXXX" },
    createdAt: { S: "XXXX" },
  },
};

// write a sample uuid const
const id = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
const tableName = "test";

describe("deleteItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return a promise", () => {
    ddbDocClient.send = jest.fn().mockResolvedValueOnce({});
    const result = deleteItem(tableName, { id });
    expect(result).toBeInstanceOf(Promise);
  });
  test("should call DeleteItemCommand", async () => {
    ddbDocClient.send = jest.fn().mockResolvedValueOnce({});
    await deleteItem(tableName, { id });
    expect(ddbDocClient.send).toHaveBeenCalledTimes(1);
    expect(ddbDocClient.send).toHaveBeenCalledWith(expect.any(DeleteItemCommand));
  });
  test("should resolve to a boolean", async () => {
    ddbDocClient.send = jest.fn().mockResolvedValueOnce({});
    const result = await deleteItem(tableName, { id });
    expect(result).toBe(true);
  });
  test("should throw an error if the id is not found", async () => {
    ddbDocClient.send = jest.fn().mockRejectedValueOnce(Error("id is not found"));
    expect(deleteItem(tableName, { id })).rejects.toThrow("id is not found");
  });
  test("should throw an error if item is not found", async () => {
    ddbDocClient.send = jest.fn().mockRejectedValueOnce(Error("The conditional request failed"));
    expect(deleteItem(tableName, { id })).rejects.toThrow(customError(404, "Item not found", "updateNote"));
  });
});
describe("getItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should return a promise", () => {
    ddbDocClient.send = jest.fn().mockResolvedValueOnce({});
    const result = getItem(tableName, { id });
    expect(result).toBeInstanceOf(Promise);
  });
  test("should call GetItemCommand", async () => {
    ddbDocClient.send = jest.fn().mockResolvedValueOnce({});
    await getItem(tableName, { id });
    expect(ddbDocClient.send).toHaveBeenCalledTimes(1);
    expect(ddbDocClient.send).toHaveBeenCalledWith(expect.any(GetItemCommand));
  });
  test("should return Item object", async () => {
    ddbDocClient.send = jest.fn().mockResolvedValueOnce(mockMarshallGetItem);
    const result = await getItem(tableName, { id });
    expect(result).toEqual(mockResponseGetItem);
  });
  test("should throw an error if table name is not found", async () => {
    ddbDocClient.send = jest.fn().mockRejectedValueOnce(Error("table name is not found"));
    expect(getItem(tableName, { id })).rejects.toThrow("table name is not found");
  });
});

describe("getAllItems", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should return a promise", () => {
    ddbDocClient.send = jest.fn().mockResolvedValueOnce(mockMarshallGetAllItems);
    const result = getAllItems(tableName);
    expect(result).toBeInstanceOf(Promise);
  });
  test("should call ScanCommand", async () => {
    ddbDocClient.send = jest.fn().mockResolvedValueOnce(mockMarshallGetAllItems);
    await getAllItems(tableName);
    expect(ddbDocClient.send).toHaveBeenCalledTimes(1);
    expect(ddbDocClient.send).toHaveBeenCalledWith(expect.any(ScanCommand));
  });
  test("should return all Items object", async () => {
    ddbDocClient.send = jest.fn().mockResolvedValueOnce(mockMarshallGetAllItems);
    const result = await getAllItems(tableName);
    expect(result).toEqual(mockResponseGetAllItems);
  });
  test("should return items from all pages of the db", async () => {
    const mockMarshallGetAllItems2 = JSON.parse(JSON.stringify(mockMarshallGetAllItems));
    mockMarshallGetAllItems2.LastEvaluatedKey = { id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb" };
    ddbDocClient.send = jest
      .fn()
      .mockResolvedValueOnce(mockMarshallGetAllItems2)
      .mockResolvedValueOnce(mockMarshallGetAllItems);
    const result = await getAllItems(tableName);
    expect(ddbDocClient.send).toHaveBeenCalledTimes(2);
    const mockResponseGetAllItems2 = [
      {
        id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        title: "test",
        content: "30",
        updatedAt: "XXXX",
        createdAt: "XXXX",
      },
      {
        id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
        title: "test2",
        content: "40",
        updatedAt: "XXXX",
        createdAt: "XXXX",
      },
      {
        id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        title: "test",
        content: "30",
        updatedAt: "XXXX",
        createdAt: "XXXX",
      },
      {
        id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
        title: "test2",
        content: "40",
        updatedAt: "XXXX",
        createdAt: "XXXX",
      },
    ];
    expect(result).toEqual(mockResponseGetAllItems2);
  });
  test("should throw an error if table name is not found", async () => {
    ddbDocClient.send = jest.fn().mockRejectedValueOnce(Error("table name is not found"));
    expect(getAllItems(tableName)).rejects.toThrow("table name is not found");
  });
});
describe("updateItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should return a promise", () => {
    ddbDocClient.send = jest.fn().mockResolvedValueOnce(mockMarshallUpdateItem);
    const updateParams = setUpdateItemParam("test", "new content");
    const result = updateItem(tableName, { id }, updateParams);
    expect(result).toBeInstanceOf(Promise);
  });
  test("should call UpdateItemCommand", async () => {
    ddbDocClient.send = jest.fn().mockResolvedValueOnce(mockMarshallUpdateItem);
    const updateParams = setUpdateItemParam("test", "new content");
    await updateItem(tableName, { id }, updateParams);
    expect(ddbDocClient.send).toHaveBeenCalledTimes(1);
    expect(ddbDocClient.send).toHaveBeenCalledWith(expect.any(UpdateItemCommand));
  });
  test("should return updated item", async () => {
    ddbDocClient.send = jest.fn().mockResolvedValueOnce(mockMarshallUpdateItem);
    const updateParams = setUpdateItemParam("test", "new content");
    const result = await updateItem(tableName, { id }, updateParams);
    expect(result).toEqual(mockResponseUpdateItem);
  });
  test("should throw an error if table name is not found", async () => {
    ddbDocClient.send = jest.fn().mockRejectedValueOnce(Error("table name is not found"));
    const updateParams = setUpdateItemParam("test", "new content");
    expect(updateItem(tableName, { id }, updateParams)).rejects.toThrow("table name is not found");
  });
  test("should throw an error if item is not found", async () => {
    ddbDocClient.send = jest.fn().mockRejectedValueOnce(Error("The conditional request failed"));
    const updateParams = setUpdateItemParam("test", "new content");
    expect(updateItem(tableName, { id }, updateParams)).rejects.toThrow(
      customError(404, "Item not found", "updateNote")
    );
  });
});
describe("createItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should return a promise", () => {
    ddbDocClient.send = jest.fn().mockResolvedValueOnce({});
    const result = createItem(tableName, { id, title: "test", content: "30" });
    expect(result).toBeInstanceOf(Promise);
  });
  test("should call PutItemCommand", async () => {
    ddbDocClient.send = jest.fn().mockResolvedValueOnce({});
    await createItem(tableName, { id, title: "test", content: "30" });
    expect(ddbDocClient.send).toHaveBeenCalledTimes(1);
    expect(ddbDocClient.send).toHaveBeenCalledWith(expect.any(PutItemCommand));
  });
  test("should resolve to a boolean", async () => {
    ddbDocClient.send = jest.fn().mockResolvedValueOnce({});
    const result = await createItem(tableName, { id, title: "test", content: "30" });
    expect(result).toBe(true);
  });

  test("should throw an error if table name is not found", async () => {
    ddbDocClient.send = jest.fn().mockRejectedValueOnce(Error("table name is not found"));
    expect(createItem(tableName, { id, title: "test", content: "30" })).rejects.toThrow("table name is not found");
  });
});
