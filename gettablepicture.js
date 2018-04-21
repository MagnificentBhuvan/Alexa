'use strict';

console.log('Loading function');

var AWS = require ("aws-sdk");
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();
var params = {
    TableName: "TablePictures",
    Key: {
        "pictureId": 0
    }
};
var tablePictureToDisplay = "picture not set";
exports.handler = (event, context, callback) => {
    docClient.get(params, function(err, data) {
        if (err) {
            return console.error("that didn't work");
        }
        var payload = JSON.stringify(data, null, 2);
        var obj = JSON.parse(payload);
        tablePictureToDisplay = obj.Item.pictureToShow;
    
        callback(null, {"tablePicture":tablePictureToDisplay});
    });
    //console.log('Received event:', JSON.stringify(event, null, 2));
    //console.log('value1 =', event.key1);
   // console.log('value2 =', event.key2);
   // console.log('value3 =', event.key3);
    //callback(null,'Hello World');  // Echo back the first key value
    //callback('Something went wrong');
};
