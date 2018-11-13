var AWS = require("aws-sdk");
var inc = require("./utils");

const dynamodb = new AWS.DynamoDB.DocumentClient();

//function incrementalUpdate(tableName, key, incr) {
//
//  const params = {
//    TableName: tableName,
//    Key: {
//      "name": key
//    },
//    ReturnValues: "ALL_NEW",
//    UpdateExpression: "SET #current_number = #current_number + :incr",
//    ExpressionAttributeNames: {
//      ["#current_number"]: "current_number"
//    },
//    ExpressionAttributeValues: {
//      [":incr"]: incr
//    }
//  };
//  console.log("INCREMENTAL_UPDATE", params);
//  return new Promise((resolve, reject) => {
//    dynamodb.update(params, (err, data) => {
//      if (err) {
//        return reject(err);
//      } else {
//        return resolve(data.Attributes);
//      }
//    });
//  });
//}

exports.handler = function (request, context, callback) {

  var item = JSON.parse(request.body);

  inc.incrementalUpdate(dynamodb, process.env.SEQUENCES_TABLE, process.env.TODOS_TABLE, 1).then((attributes) => {
    console.log(attributes);

    var params = {
      TableName: process.env.TODOS_TABLE,
      Item: {
        "id": String(attributes.current_number),
        "title": item.title,
        "compelete": false
      }
    };

    dynamodb.put(params, (err, data) => {
      if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
        callback(null, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(params.Item),
          statusCode: 201
        });
      }
    });
  });
}
