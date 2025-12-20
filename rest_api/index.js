const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const PORT = 3000;

const server = http.createServer((req, res) => {

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

})

// Running server
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});

let handlers = {};

// calback return statusCode and payload
handlers.sample = (data, callback) =>{
  callback(406, {'name': 'sample handler'})
}
// Not found handler
handlers.notFound = (data, callback) =>{
  callback(404, {'error': 'Not Found'})
}

// Router with path and handler
let router = {
  'sample': handlers.sample
}
