import "dotenv/config.js";

const constants = {
  AWS_REGION: "us-east-1",
};

const environmentVariables = {
  TABLE_NAME: process.env.NOTES_TABLE,
};

export default {
  ...constants,
  ...environmentVariables,
};
