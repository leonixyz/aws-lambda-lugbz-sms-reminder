var reminder = require('./reminder')

var AWS = require('aws-sdk');
AWS.config.update({ 
  'region': 'us-east-1' 
});

var sns = new AWS.SNS();

module.exports.reminder = (event, context, callback) => {

  // if we are offline, just log the messages to the console and return
  if (event.isOffline) {
    console.log(reminder.getMessages());
    return;
  }

  // build an array of promises with all messages that have to be pushed to SNS
  const promises = [];
  for (let message of reminder.getMessages()) {
    promises.push(
      sns.publish({
        TopicArn: message.topic,
        Message: message.message
      })
      .promise()
    );
  }

  // callback when all promises have been resolved
  Promise.all(promises).then(values => {
    console.log(values);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }).catch(err => {
    console.log(err, err.stack);
    callback(null, {
      statusCode: 500,
      body: JSON.stringify(err),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });

};
