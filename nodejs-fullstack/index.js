require('dotenv').config({debug: true});
require('./backend/database/database').connect();
const express = require('express');
const router = require('./routes/index');
const app = express();


const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", router);

app.get('/', (req, res) => {
    res.send({message: 'Hello world!!'})
})

app.listen(port, () => {
    console.log("App is running on port", port);
})