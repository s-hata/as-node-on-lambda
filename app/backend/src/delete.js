var AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (request, context, callback) {

  console.log(request.pathParameters.id);
  console.log(context);
  var params = {
    TableName: process.env.TODOS_TABLE,
    Key: {
      "id": request.pathParameters.id
    }
  };

  console.log("Attempting a conditional delete...");
  dynamodb.delete(params, function(err, data) {
      if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        callback(null, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: '{}',
          statusCode: 200
        });
      }
  });
}
