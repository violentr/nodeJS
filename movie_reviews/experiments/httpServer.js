// import http from 'http';
// const PORT = 5000;
// const server = http.createServer((req,res) => {
//     res.responseCode = 200;
//     console.log(new Error().stack)
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
// })
//
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

import http from 'http';

const server = http.createServer();
console.log(server.listen.toString());