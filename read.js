let AWS = require('aws-sdk');
let awsConfig = {
  region: 'us-east-1',
  endpoint: 'dynamodb.us-east-1.amazonaws.com',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

AWS.config.update(awsConfig);

let dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
// let ddbDocumentClient = new AWS.DynamoDB.DocumentClient();

// module.exports = { ddbDocumentClient };

let tableName = 'UserFeedback';

var params = {
  TableName: tableName,
  Key: { 'userid': '12345-abcd-6789',
'dateSubmitted': 1671052466889 },
};

const getItem = async () => {
  dynamodb.get(params, function(err, data) {
    if (err) {
      console.log('error', err);
    } else {
      console.log('success : ', data.Item);
    }
 
})
};

module.exports = { getItem };
