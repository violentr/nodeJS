const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
let numbers = [10, 20, 30, 40];

app.use(cors());
app.use(express.json());

app.get('/api/numbers', (req,res)=>{
    res.json(numbers);
})

app.post('/api/numbers', (req, res)=>{
    try {
        console.log(req.body);
        const {number} = req.body;
        if (typeof number === 'number'){
            numbers.push(number)
            res.status(200).json({message: "Number added !", numbers});
        }else{
            res.status(400).json({message: "Invalid number !"})
        }
    }catch(err){
        console.error(err);
        process.exit(1)
    }
  
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})