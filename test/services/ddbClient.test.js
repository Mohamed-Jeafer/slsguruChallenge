// @ts-nocheck
/* global describe, it, expect */

import { ddbClient } from "../../src/services/ddbClient.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
describe("ddbClient", () => {
  it("should be defined", () => {
    expect(ddbClient).toBeDefined();
  });

  it("should be a DynamoDBClient", () => {
    expect(ddbClient).toBeInstanceOf(DynamoDBClient);
  });
  it("returns a DynamoDBClient object with the correct properties", () => {
    expect(ddbClient).toHaveProperty("send");
    expect(typeof ddbClient.send).toBe("function");
    expect(ddbClient).toHaveProperty("config");
    expect(typeof ddbClient.config).toBe("object");
    expect(ddbClient.config).toHaveProperty("apiVersion");
    expect(typeof ddbClient.config.apiVersion).toBe("string");
  });
});
