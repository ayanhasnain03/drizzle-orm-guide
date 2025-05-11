// Import necessary modules
import express from 'express';  // Express framework for routing and middleware
import dotenv from 'dotenv';  // Module to load environment variables from a .env file
import userRouter from './routes/v1/user.route';  // Import the user routes for API version 1
import postRouter from './routes/v1/post.route';  // Import the post routes for API version 1

// Load environment variables from a .env file
dotenv.config();

// Create an instance of the Express app
const app = express();

// Get the port number from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data in incoming requests
app.use(express.json());

// Define the route for user-related API requests
app.use("/api/v1/users", userRouter);

// Define the route for post-related API requests
app.use("/api/v1/post", postRouter);

// Start the server and log the message indicating the server is running
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
