const mongoose = require('mongoose');
const {MONGO_URI} = process.env

let db = {}
db.connect = () => {
    mongoose.connect(MONGO_URI)
    .then((db) => {
        console.log("Connected to the DB", db.connections[0].host)
    }).catch((err) =>{
        console.error("[app] Failed to connect to db", err.message);
        console.log("Terminating the application ");
        process.exit(1);
    })
}
module.exports = db;