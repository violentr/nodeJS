const express = require('express');
const app = express();
const router = require('./routes/index');

require('./backend/database/database').connect();
require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", router);

app.get('/', (req, res) => {
    res.send({message: 'Hello world!!'})
})

app.listen(port, () => {
    console.log("App is running on port", port);
})