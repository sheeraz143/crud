const express = require("express");
const cors = require("cors");
const { connectMongoDB } = require("./connection");
const userRouter = require("./routes/user");

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectMongoDB("mongodb://127.0.0.1:27017/dbconnect")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", userRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
