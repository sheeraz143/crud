const express = require("express");
const cors = require("cors");
const { connectMongoDB } = require("./connection");
const userRouter = require("./routes/user");

const app = express();
const PORT = 3000;
const uri =
  "mongodb+srv://dbconnect:2QiXQ2qUTCUWCe5a@users.uhufba9.mongodb.net/mydatabase?retryWrites=true&w=majority";
// const uri =
//   "mongodb+srv://<dbconnect>:<2QiXQ2qUTCUWCe5a>@users.uhufba9.mongodb.net/mydatabase?retryWrites=true&w=majority";
// Connect to MongoDB
connectMongoDB(uri)
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
