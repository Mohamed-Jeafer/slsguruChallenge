import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import constants from "../utils/constants.js";
const { AWS_REGION } = constants;

const ddbClient = new DynamoDBClient({ region: AWS_REGION });
export { ddbClient };
