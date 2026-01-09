// Import and configure the Google Gemini model

const mongoose = require('mongoose');
const { Document } = require('langchain/document');
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const { MemoryVectorStore } = require('langchain/vectorstores/memory');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const dotenv = require('dotenv');

dotenv.config();

// Project Description
const projectDescription = `
An Application Programming Interface (API) allows different software systems to communicate with one another without needing to understand each other's internal structure. APIs are essential for building scalable, modular applications where various components—such as the frontend and backend—interact seamlessly.

In this project, we will design and build a robust, secure, and scalable REST API for an image-sharing application. The backend will be built using Node.js and Express.js, with data stored in MongoDB. This API will act as the core layer between the client (such as a React or mobile frontend) and the database, handling all interactions such as user registration, login, profile updates, and image post creation.

The platform supports the following user functionalities:
- Signup – Create a new account using a username, email, and password.
- Login – Authenticate using email and password to receive a secure session token.
- Email Support – Used for registration and identification during login.
- Profile Management – Authenticated users can update their username, email, and profile picture.

Security is enforced using:
- JWT (JSON Web Tokens) – Used to securely manage authenticated sessions.
- bcrypt – Passwords are hashed using bcrypt before being stored in the database.

Once authenticated, users can:
- Upload Images – Including optional captions or descriptions.
- Perform CRUD Operations – Create, Read, Update, and Delete their own posts.
- Store Images – Either locally or via cloud services like Cloudinary or AWS S3.

The API will follow RESTful design principles with clearly defined endpoints:
- /api/auth/register – Register a new user
- /api/auth/login – Authenticate an existing user
- /api/users/:id – Get or update user profile data
- /api/posts – Create or retrieve posts

Technologies used include:
- Node.js – JavaScript runtime for server-side programming
- Express.js – Minimal web framework for handling HTTP requests
- MongoDB – NoSQL document database
- Mongoose – ODM for MongoDB, providing schema-based modeling
- JWT – Token-based authentication mechanism
- bcrypt – Password hashing library
- Docker – Containerization tool for consistent deployment environments

The project follows a modular architecture for scalability and maintainability, with separate folders for controllers, models, routes, and middleware. The backend can be easily extended with additional features like search, tagging, likes, pagination, and more.
`;

// Check for mongoDB connection

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URL)
.then((db) => console.log('Connected to MongoDB', db.connections[0].host))
.catch(err => {
    console.error(' MongoDB connection error:', err.message);
    process.exit(1);
});


// Create and configure Gemini chat model
const embeddingsModel = new GoogleGenerativeAIEmbeddings({
      model: 'text-embedding-005',  // Or another supported model
      apiKey: process.env.GEMINI_API_KEY,
     });