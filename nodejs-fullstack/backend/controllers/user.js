const {User, validate } = require('./models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const user = {};
user.signup = async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error){
            return res.status(400).send(error.details[0].message);
        }
    const {firstName, lastName, username, email, password} = req.body;
    const oldUser = await User.findOne({email});
    if (oldUser){
        return res.status(409).send("User Already Exists. Please login");
    }
    // Hash the password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);
    
    let user = await User.create({
        firstName,
        lastName,
        username,
        password,
        email: email.toLowerCase(),
        password: hashPassword
    })
    
    const token = jwt.sign({
       userId: user._id, email
    }, process.env.TOKEN_SECRET_KEY,{
        expiresIn: "2h"
    })
    user.token = token;
    res.status(201).json(user)
    }catch(error){
        console.error(error);
    }
}

module.exports = user;
