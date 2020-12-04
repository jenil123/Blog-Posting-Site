// const amqp = require('amqplib/callback_api');
//  amqp.connect('amqp://localhost', function(error, connection) {
//         if (error) {
//             throw error;
//         }
//         connection.createChannel(function(error1, channel) {
//             if (error1) {
//             throw error1;
//             }

//             let queue = 'post_queue';
//             let msg = 'Adding new blog';

//             channel.assertQueue(queue, {
//             durable: true
//             });
//             channel.sendToQueue(queue, Buffer.from(msg), {
//             persistent: true
//             });
//             console.log("Sent '%s'", msg);
//         });
//         f=1;
//         });



const amqp = require('amqplib/callback_api');
  
amqp.connect('amqp://localhost', function(error, connection) {
  if (error) {
    throw error;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    let queue = 'post_queue';
    let msg = 'This is a simple message queue example';

    channel.assertQueue(queue, {
      durable: true
    });
    channel.sendToQueue(queue, Buffer.from(msg), {
      persistent: true
    });
    console.log("Sent '%s'", msg);
  });
  setTimeout(function() {
    connection.close();
    process.exit(0)
  }, 5000);
});