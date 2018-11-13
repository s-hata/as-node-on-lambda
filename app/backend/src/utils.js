exports.incrementalUpdate = function (client, tableName, key, incr) {

  const params = {
    TableName: tableName,
    Key: {
      "name": key
    },
    ReturnValues: "ALL_NEW",
    UpdateExpression: "SET #current_number = #current_number + :incr",
    ExpressionAttributeNames: {
      ["#current_number"]: "current_number"
    },
    ExpressionAttributeValues: {
      [":incr"]: incr
    }
  };
  console.log("INCREMENTAL_UPDATE", params);
  return new Promise((resolve, reject) => {
    client.update(params, (err, data) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(data.Attributes);
      }
    });
  });
}
