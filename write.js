let AWS = require('aws-sdk');
let awsConfig = {
  region: 'us-east-1',
  endpoint: 'dynamodb.us-east-1.amazonaws.com',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

AWS.config.update(awsConfig);

let dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

async function writeOne(res, feedback){
  dynamodb.put(feedback).promise().then(function(data) {
    console.log("success", data)
    res.json({success:"Success!"})
  })

}

module.exports = {writeOne}