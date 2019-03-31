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
    res.end('Hello world');
    console.log("Request made with payload", buffer)
  })

})

server.listen(3000);
