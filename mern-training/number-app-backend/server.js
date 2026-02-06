const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
let numbers = [10, 20, 30, 40];

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Could not connect to MongoDB", err));

// 2. Define a Schema and Model
const numberSchema = new mongoose.Schema({
  value: Number,
  
  createdAt: { type: Date, default: Date.now }
});

const NumberModel = mongoose.model('Number', numberSchema);

app.use(cors());
app.use(express.json());

app.get('/api/numbers', async (req,res)=>{
    const docs = await NumberModel.find();
    const numbers = docs.map(doc => doc.value);
    res.json(numbers);
})

app.post('/api/numbers', async (req, res)=>{
    try {
        console.log(req.body);
        const {number} = req.body;
        if (typeof number === 'number'){
            const newNumber = new NumberModel({ value: number });
            await newNumber.save();
            res.status(201).json({message: "Saved to DB!"});
        }else{
            res.status(400).json({message: "Invalid number !"})
        }
    }catch(err){
        res.status(400).json({ error: err.message });
    }
  
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})