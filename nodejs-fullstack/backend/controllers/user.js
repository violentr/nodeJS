const {User, validate } = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {encrypt, decrypt} = require("../utils/confirmation");
const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const user = {};

const createTransporter = async() =>{
    const oauth2Client = new OAuth2(
        process.env.OAUTH_CLIENT_ID,
        process.env.OAUTH_CLIENT_SECRET,
        process.env.OAUTH_AUTHORIZED_URI

    );
    oauth2Client.setCredentials({
        refresh_token: process.env.OAUTH_REFRESH_TOKEN
    });

    const accessToken = await new Promise((resolve, reject) =>{
        oauth2Client.getAccessToken((err, token) =>{
            if (err){
                reject(`OAuthClient Error: ${err.message}`);
            }
            resolve(token);
        })
    })
    const Transport = nodemailer.createTransport({
        service: "gmail",
        auth:{
            type: "OAuth2",
            user: process.env.GMAIL_EMAIL,
            accessToken,
            clientId: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        }
    });
    return Transport;
}

const sendEmail = async ({ email, username, res }) => {
  // Create a unique confirmation token
  const confirmationToken = encrypt(username);
  const apiUrl = process.env.API_URL || "http://0.0.0.0:3000";

  // Initialize the Nodemailer with your Gmail credentials
  const Transport = await createTransporter();

  // Nodemailer debug
  // console.log(Transport.options);

  // Configure the email options
  const mailOptions = {
    from: "NodeJS Fullstack Course",
    to: email,
    subject: "Email Confirmation",
    html: `Press the following link to verify your email: <a href=${apiUrl}/verify/${confirmationToken}>Verification Link</a>`,
  };
console.log("Confirmation url:", mailOptions.html);
  // Send the email
  Transport.sendMail(mailOptions, function (error, response) {
    console.log("Response T:", response);
    if (error) {
      res.status(400).send(error.message);
    } else {
      res.status(201).json({
        message: "Account created successfully, please verify your email.",
      });
    }
  });
};

user.verifyEmail = async (req, res) => {
  try {
    const { confirmationToken } = req.params;

    const username = decrypt(confirmationToken);

    // Check if there is anyone with that username
    const user = await User.findOne({ username });

    if (user) {
      // mark them as confirmed account
      user.isConfirmed = true;
      await user.save();

      res
        .status(201)
        .json({ message: "User verified successfully"});
    } else {
      return res.status(409).send("User Not Found");
    }
  } catch (err) {
    console.error(err);
    return res.status(400).send(err.message);
  }
};

user.signup = async (req, res) => {
  try {
    // Validate the user data
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { firstName, lastName, username, email, password } = req.body;

    // Check if the user exists in the database
    const emailExists = await User.findOne({ email, username });
    const usernameExists = await User.findOne({ username });
    
    if (emailExists) {
      return res.status(409).send("Email Already Exist. Please Login");
    }
    if (usernameExists) {
      return res.status(409).send("Username Already Exist. Please Login");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create an user object
    let user = await User.create({
      firstName,
      lastName,
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Create the user token
    const token = jwt.sign(
      { userId: user._id, email },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;

    // Send the email verification link
    return sendEmail({ email, username, res });
  } catch (err) {
    console.error(err);
    return res.status(400).send(err.message);
  }
};

module.exports = user;
