var AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (request, context, callback) {

  console.log(process.env.TODOS_TABLE);
  const limit = 50;
  var params = {
    TableName: process.env.TODOS_TABLE,
    Limit: limit
  };

  dynamodb.scan(params, function(err, data) {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      console.log(typeof data);
      callback(null, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data),
        statusCode: 200
      });
    }
  });
}
