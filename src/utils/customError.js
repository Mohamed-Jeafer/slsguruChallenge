/**
 * @description Custom error function
 * @param {number} statusCode
 * @param {string} message
 * @param {string} name
 * @returns {Error}
 */
const customError = (statusCode, message, name = "Error") => {
  const error = new Error(message);
  error["statusCode"] = statusCode;
  error["name"] = name;
  return error;
};

/**
 * @description Set error status code
 * @param { object} error - Error object
 * @param {number} error.statusCode - Status code
 * @param {string} error.name - Status code
 * @param {string} error.message - Status code
 * @returns {void}
 */
const setErrorStatusCode = (error) => {
  if (!error.statusCode || error.statusCode === 500) {
    error.statusCode = 500;
    setErrorMessage(error);
  }
};

/**
 * @description Set error message based on name
 * @param {object} error - Error object
 * @param {string} error.name - Error name
 * @param {string} error.message - Error message
 * @returns {void}
 */
const setErrorMessage = (error) => {
  switch (error?.name) {
    case "deleteNote":
      error.message = "Unable to delete note";
      break;
    case "readNote":
      error.message = "Unable to read note";
      break;
    case "updateNote":
      error.message = "Unable to update note";
      break;
    case "createNote":
      error.message = "Unable to create note";
      break;
    case "readAllNotes":
      error.message = "Unable to retrieve the notes";
      break;
    default:
      error.message = "Something went wrong";
      break;
  }
};

/**
 * @description Create error response object
 * @param {object} error - Error object
 * @param {number} error.statusCode - Status code
 * @param {string} error.message - Error message
 * @returns {{statusCode: number, body: string}}
 */
const createErrorResponse = (error) => {
  return {
    statusCode: error.statusCode,
    body: JSON.stringify({ message: error.message }),
  };
};

/**
 * @description Error response function
 * @param {{statusCode: number, message: string, name: string}} error
 * @returns {{statusCode: number, body: string}}
 */
const errorResponse = (error) => {
  console.error(error.message);
  setErrorStatusCode(error);
  return createErrorResponse(error);
};

export { customError, errorResponse };
