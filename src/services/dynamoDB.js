/**
 *	@author : Mohamed Jeafer
 *	@description : This file is used to scan the DynamoDB table.
 */

// eslint-disable-next-line no-unused-vars
import * as typedefs from "../models/typedefs.js";
import { ddbDocClient } from "./ddbDocClient.js";
import {
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { unmarshall, marshall } from "@aws-sdk/util-dynamodb";
import { customError } from "../utils/customError.js";

/**
 * Function to get an item from the DynamoDB table.
 * @param {string} tableName - Name of the table.
 * @param {{ id: string }} key - Key to be used to get the item.
 * @returns { Promise<object> } - Returns the item.
 * @throws { Error } - Throws an error if the item does not exist.
 */
async function getItem(tableName, key) {
  try {
    const marshalledKey = marshall(key);
    const command = {
      TableName: tableName,
      Key: marshalledKey,
    };

    const { Item } = await ddbDocClient.send(new GetItemCommand(command));

    return Item ? unmarshall(Item) : null;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

/**
 * function to save an item in the DynamoDB table.
 * @param { string} tableName - Name of the table.
 * @param {typedefs.note} item
 * @returns { Promise<boolean> }
 */
async function createItem(tableName, item) {
  try {
    const marshalledItem = marshall(item);

    const command = {
      TableName: tableName,
      Item: marshalledItem,
    };

    const response = await ddbDocClient.send(new PutItemCommand(command));

    return Boolean(response);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

/**
 * Function to update an item in the DynamoDB table.
 * @param { string } tableName - Name of the table.
 * @param {{ id: string }} key - Key to be used to get the item.
 * @param { typedefs.updateParams } updateParams - Update parameters.
 * @returns { Promise<object> } - Returns the updated item.
 * @throws { Error } - Throws an error if the update fails.
 */
async function updateItem(tableName, key, updateParams) {
  try {
    const { UpdateExpression, ExpressionAttributeValues, ReturnValues, ConditionExpression } = updateParams;
    const marshalledKey = marshall(key);
    const marshalledExpressionAttributeValues = marshall(ExpressionAttributeValues);

    const command = {
      TableName: tableName,
      Key: marshalledKey,
      UpdateExpression,
      ConditionExpression,
      ExpressionAttributeValues: marshalledExpressionAttributeValues,
      ReturnValues,
    };

    const response = await ddbDocClient.send(new UpdateItemCommand(command));

    const unmarshalledAttributes = unmarshall(response.Attributes);
    return unmarshalledAttributes;
  } catch (error) {
    console.error(error.message);
    if (error.message === "The conditional request failed") {
      throw customError(404, "Item not found", "updateNote");
    }
    throw error;
  }
}

/**
 * Function to delete an item from the DynamoDB table.
 * @param { string } tableName - Name of the table.
 * @param {{ id: string }} key - Key to be used to get the item.
 * @returns { Promise<boolean> } - Returns true if the item is deleted.
 * @throws { Error } - Throws an error if the delete fails.
 */
async function deleteItem(tableName, key) {
  try {
    const marshalledKey = marshall(key);
    const command = {
      TableName: tableName,
      Key: marshalledKey,
      ConditionExpression: "attribute_exists(id)",
    };

    const response = await ddbDocClient.send(new DeleteItemCommand(command));
    return Boolean(response);
  } catch (error) {
    console.error(error.message);
    if (error.message === "The conditional request failed") {
      throw customError(404, "Item not found", "deleteNote");
    }
    throw error;
  }
}

/**
 * Function to scan the DynamoDB table.
 * @param {String} tableName - Name of the table to be scanned.
 * @returns {Promise<Array>} - Returns an array of items from the table.
 * @throws { Error } - Throws an error if the delete fails.
 */
const getAllItems = async (tableName) => {
  try {
    let data;
    const params = {
      TableName: tableName,
    };
    data = await ddbDocClient.send(new ScanCommand(params));
    while (data.LastEvaluatedKey) {
      params.ExclusiveStartKey = data.LastEvaluatedKey;
      const response = await ddbDocClient.send(new ScanCommand(params));
      data.LastEvaluatedKey = response.LastEvaluatedKey;
      data.Items.push(...response.Items);
    }
    const items = data.Items.map((item) => unmarshall(item));
    return items;
  } catch (error) {
    console.error("Error in Scanning DB Data ", error.message);
    throw error;
  }
};

export { getItem, getAllItems, createItem, updateItem, deleteItem };
