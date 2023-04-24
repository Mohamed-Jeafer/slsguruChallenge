// eslint-disable-next-line no-unused-vars
import * as typedefs from "../models/typedefs.js";

/**
 * Set update item param
 * @param {string} title
 * @param {string} content
 * @returns {typedefs.updateParams}
 */
function setUpdateItemParam(title, content) {
  const updateParams = {
    UpdateExpression: "SET title = :title, content = :content, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":title": title,
      ":content": content,
      ":updatedAt": new Date().toISOString(),
    },
    ReturnValues: "ALL_NEW",
    ConditionExpression: "attribute_exists(id)",
  };
  return updateParams;
}

export { setUpdateItemParam };
