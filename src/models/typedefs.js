/**
 * @namespace typedefs
 */

/**
 * @description event object
 * @typedef {Object} event
 * @property {pathParameters} pathParameters
 * @property {string} body
 */

/**
 * @typedef {Object} pathParameters
 * @property {string} id
 */

/**
 * @description response object
 * @typedef {Object} response
 * @property {string} body
 * @property {number} statusCode
 */

/**
 * @description Note Object from DynamoDB
 * @typedef {Object} note
 * @property {string} id
 * @property {string} title
 * @property {string} content
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef { object } updateParams
 * @property { string } UpdateExpression - Update expression.
 * @property { object } ExpressionAttributeValues - Expression attribute values.
 * @property { string } ReturnValues - Return values.
 * @property { string } ConditionExpression - Condition expression.
 */

export const unused = {};
