const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const path = require('path');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const data = require('./lib/data');


// Test the data.create function
/*
data.create('users', '1234567890', { name: 'John Doe', age: 30 }, (statusCode, payload) => {
  console.log(statusCode, payload);
});*/



HTTP_PORT = config.httpPort;
HTTPS_PORT = config.httpsPort;

ENVIRONMENT = config.envName;

const httpServerOptions = {
  'key': fs.readFileSync(path.join(__dirname, 'https/key.pem')),
  'cert': fs.readFileSync(path.join(__dirname, 'https/cert.pem'))
}

const httpServer = http.createServer((req, res) => {
  unifiedServer(req, res);

})

const httpsServer = https.createServer(httpServerOptions, (req, res) => {
  unifiedServer(req, res);

})

// Running HTTP server
httpServer.listen(HTTP_PORT, () => {
  console.log(`Server is listening on port ${HTTP_PORT} in ${ENVIRONMENT} environment`)
});

// Running HTTPS server
httpsServer.listen(HTTPS_PORT, () => {
  console.log(`Server is listening on port ${HTTPS_PORT} in ${ENVIRONMENT} environment`)
});

const unifiedServer = (req, res) => {
  let parsedUrl = url.parse(req.url, true)
  let pathname = parsedUrl.pathname
  let trimedPath = pathname.replace(/^\/+|\/+$/g, '')
  let queryString = parsedUrl.query

  let headers = req.headers
  let method = req.method.toLowerCase()

  console.log("Request  headers: \n" + JSON.stringify(headers))
  console.log(`Request  method ${method}`)

  let decoder = new StringDecoder('utf-8')
  let buffer = ''

  console.log(`Request  path ${trimedPath}`)
  console.log(`Request  query is: ${JSON.stringify(queryString)}`)

  // This is only needed for pure Node.js, req.body is available in express Js
  // This will happen first and then the end event will be triggered
  req.on('data', (data) => {
    buffer += decoder.write(data);
  })
  // This part of the code will be executed after the data event is triggered !
  req.on('end', () => {
    buffer += decoder.end()
    const path = router[trimedPath]
    let chosenHandler = typeof(path) !== 'undefined' ? path : handlers.notFound
    
    let data = {
      trimedPath,
      queryString,
      method,
      headers,
      buffer
    }
    // This part of the code will be executed after the end event is triggered !
    chosenHandler(data, (statusCode, payload) =>{
      statusCode = typeof(statusCode) === 'number' ? statusCode : 200
      
      payload = typeof(payload) === 'object' ? payload : {}
      
      payloadString = JSON.stringify(payload)
      // This part of the code will be executed after the chosenHandler is triggered !
      res.setHeader('Content-Type', 'application/json');
      
      res.writeHead(statusCode)
      
      res.end(payloadString);
      console.log("Body data is: ", data.buffer);
      console.log("Response is: ", statusCode, payloadString)
    })

  })
}
let handlers = {};

// calback return statusCode and payload
handlers.ping = (data, callback) =>{
  callback(200);
}
// Not found handler
handlers.notFound = (data, callback) =>{
  callback(404, {'error': 'Not Found'})
}

// Router with path and handler
let router = {
  'ping': handlers.ping
}
