/* Request handlers */

let handlers = {};

// calback return statusCode and payload
handlers.ping = (data, callback) =>{
  callback(200);
}
// Not found handler
handlers.notFound = (data, callback) =>{
  callback(404, {'error': 'Not Found'})
}

module.exports = handlers;
