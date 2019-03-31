const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer((req, res) => {

  let parsedUrl = url.parse(req.url, true)
  let pathname = parsedUrl.pathname
  let trimedPath = pathname.replace(/^\/+|\/+$/g, '')
  let queryString = parsedUrl.query

  let headers = req.headers
  let method = req.method

  console.log("Request made headers: \n" + JSON.stringify(headers))
  console.log(`Request made method ${method}`)

  let decoder = new StringDecoder('utf-8')
  let buffer = ''

  console.log(`Request made path ${trimedPath}`)
  console.log(`Request made query is: ${JSON.stringify(queryString)}`)

  req.on('data', (data) => {
    buffer += decoder.write(data);
  })

  req.on('end', () => {
    buffer += decoder.end()
    let routerPath = router[trimedPath]
    let chosenHandler = typeof(router) !== 'undefined' ? routerPath : handlers.notFound
    let data = {
      trimedPath,
      queryString,
      method,
      headers,
      buffer
    }
    chosenHandler(data, (statusCode, payload) =>{
      statusCode = typeof(statusCode) === 'number' ? statusCode : 200
      payload = typeof(payload) === 'object' ? payload : {}
      payloadString = JSON.stringify(payload)
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode)
      res.end(payloadString);
      console.log("Response is: ", statusCode, payloadString)
    })

  })

})

server.listen(3000);

//Request router

let handlers = {};

// calback return statusCode and payload
handlers.sample = (data, callback) =>{
  callback(406, {'name': 'sample handler'})
}
handlers.notFound = (data, callback) =>{
  callback(404)
}

let router = {
  'sample': handlers.sample
}
