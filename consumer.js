const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'post_queue';
    channel.assertQueue(queue, {
      durable: true
    });
    channel.prefetch(1);
    channel.consume(queue, function(msg) {
      console.log("Received '%s'", msg.content.toString());
      setTimeout(function() {
        channel.ack(msg);
      }, 5000);
    });
  });
});