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

let tableName = 'userFeedback';

var params = {
  TableName: tableName,
  Key: { 'userid': '12345-abcd-6789',
 },
};

async function readOne(res, id) {
  params.Key.userid = id
 dynamodb.get(params).promise().then(function(data) {
res.json(data.Item)
    
 
})

}

async function readAll(res){
  let promise = dynamodb.scan(params).promise()
  let result = await promise
  let data = result.Items
  if(result.LastEvaluatedKey) {
    params.ExclusiveStartKey = result.LastEvaluatedKey
    data = data.concat(await dbRead(params))
  }
  res.json(data)
}


module.exports = { readOne, readAll };


