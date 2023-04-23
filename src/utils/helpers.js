/**
 * Set update item param
 * @param {string} title
 * @param {string} content
 * @returns {{UpdateExpression: string, ExpressionAttributeValues: { ":title": string; ":content": string; ":updatedAt": string; }, ReturnValues: string}}
 */
function setUpdateItemParam(title, content) {
  const param = {
    UpdateExpression: "SET title = :title, content = :content, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":title": title,
      ":content": content,
      ":updatedAt": new Date().toISOString(),
    },
    ReturnValues: "ALL_NEW",
  };
  return param;
}

export { setUpdateItemParam };
