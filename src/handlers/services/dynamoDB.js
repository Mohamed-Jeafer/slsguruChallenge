/**
 *	@author : Mohamed Jeafer
 *	@description : This file is used to scan the DynamoDB table.
 */

// eslint-disable-next-line no-unused-vars
import * as typedefs from "../models/typedefs.js";
import { ddbDocClient } from "./ddbDocClient.js";
import { GetItemCommand, PutItemCommand, UpdateItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall, marshall } from "@aws-sdk/util-dynamodb";

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
    const command = new GetItemCommand({
      TableName: tableName,
      Key: marshalledKey,
    });

    const { Item } = await ddbDocClient.send(command);

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
 * @param { string } updateExpression - Update expression.
 * @param { object } expressionAttributeValues - Expression attribute values.
 * @returns { Promise<object> } - Returns the updated item.
 * @throws { Error } - Throws an error if the update fails.
 */
async function updateItem(tableName, key, updateExpression, expressionAttributeValues, returnValues) {
  try {
    const marshalledKey = marshall(key);
    const marshalledExpressionAttributeValues = marshall(expressionAttributeValues);

    const command = {
      TableName: tableName,
      Key: marshalledKey,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: marshalledExpressionAttributeValues,
      ReturnValues: returnValues,
    };

    const response = await ddbDocClient.send(new UpdateItemCommand(command));

    const unmarshalledAttributes = unmarshall(response.Attributes);
    console.log(unmarshalledAttributes);
    return unmarshalledAttributes;
  } catch (error) {
    console.error(error.message);
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
    };

    const response = await ddbDocClient.send(new DeleteItemCommand(command));
    return Boolean(response);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export { getItem, createItem, updateItem, deleteItem };
