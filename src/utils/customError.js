/**
 * @description Custom error function
 * @param {number} statusCode
 * @param {string} message
 * @param {string} source
 * @returns {Error}
 */
const customError = (statusCode, message, source) => {
  const error = new Error(message);
  error["statusCode"] = statusCode;
  error["source"] = source;
  return error;
};

/**
 * @description Error response function
 * @param {{statusCode: number, message: string, source: string}} error
 * @returns {{statusCode: number, body: string}}
 */
const errorResponse = (error) => {
  console.error(error.message);
  // Check error source and set appropriate message
  switch (error?.source) {
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

  // Set default status code to 500 if not specified
  if (!error.statusCode || error.statusCode === 500) {
    error.statusCode = 500;
  }

  // Return standardized response object
  return {
    statusCode: error.statusCode,
    body: JSON.stringify({ message: error.message }),
  };
};

export { customError, errorResponse };
