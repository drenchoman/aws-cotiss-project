const {
  DynamoDBClient,
  BatchExecuteStatementCommand,
} = require('@aws-sdk/client-dynamodb');

let awsConfig = {
  region: 'us-east-1',
  endpoint: 'dynamodb.us-east-1.amazonaws.com',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

const client = new DynamoDBClient(awsConfig);
