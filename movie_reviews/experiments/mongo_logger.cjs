// mongo-logger.js
/*
 * MONGO_LOG_LEVEL=debug node -r ./experiments/mongo_logger.cjs backend/index.js
 * will output data for the event
 */
if (process.env.MONGO_LOG_LEVEL === 'debug') {
  const { MongoClient } = require('mongodb');

  const eventsToListen = [
//    'connectionPoolCreated',
//    'connectionPoolClosed',
//    'connectionCreated',
      'connectionReady',
//    'connectionClosed',
//    'serverOpening',
//    'serverClosed',
//    'serverDescriptionChanged',
//    'topologyOpening',
//    'topologyClosed',
//    'topologyDescriptionChanged',
//    'commandStarted',
//    'commandSucceeded',
//    'commandFailed'
  ];

  const originalConnect = MongoClient.prototype.connect;

  MongoClient.prototype.connect = function () {
    const client = this;

    eventsToListen.forEach(event => {
      client.on(event, payload => {
        console.log(`[MONGO-${event.toUpperCase()}]\n`, JSON.stringify(payload));
      });
    });

    return originalConnect.call(client);
  };
}
