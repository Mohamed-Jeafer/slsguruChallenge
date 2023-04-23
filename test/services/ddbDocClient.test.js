// @ts-nocheck
/* global describe, test, expect */

import { ddbDocClient } from "../../src/services/ddbDocClient.js";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

describe("ddbDocClient", () => {
  test("is defined", () => {
    expect(ddbDocClient).toBeDefined();
  });

  test("returns a DynamoDBDocumentClient object", () => {
    expect(typeof ddbDocClient).toBe("object");
    expect(ddbDocClient).toBeInstanceOf(DynamoDBDocumentClient);
  });

  test("returns a DynamoDBDocumentClient object with the correct properties", () => {
    expect(ddbDocClient).toHaveProperty("send");
    expect(typeof ddbDocClient.send).toBe("function");
    expect(ddbDocClient).toHaveProperty("config");
    expect(typeof ddbDocClient.config).toBe("object");
    expect(ddbDocClient.config).toHaveProperty("apiVersion");
    expect(typeof ddbDocClient.config.apiVersion).toBe("string");
  });
});
