/**
 * This function validates the ID.
 * @param {string} uuid
 * @returns {boolean}
 */
function isValidID(uuid) {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[8-9a-b][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regex.test(uuid);
}

export { isValidID };
