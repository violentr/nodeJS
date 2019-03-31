const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  let parsedUrl = url.parse(req.url, true)
  let pathname = parsedUrl.pathname
  let trimedPath = pathname.replace(/^\/+|\/+$/g, '')
  let queryString = parsedUrl.query
  console.log(`Request made path ${trimedPath}`)
  console.log(`Request made query is: ${JSON.stringify(queryString)}`)
  res.end('Hello world');
})

server.listen(3000);
