const User = require("../models/user");
const UsersData = require("../models/usersData");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  res.json(allDbUsers);
}

async function getUsersData(req, res) {
  try {
    const usersData = await UsersData.find({});
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User Not found" });
  return res.json(user);
}

async function handleUpdateByUser(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "changed" });
  return res.json({ status: "success" });
}

async function handleDeleteByUser(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "success" });
}
// async function handleCreateUser(req, res) {
//   const body = req.body;
//   if (
//     !body ||
//     !body.first_name ||
//     !body.last_name ||
//     !body.email ||
//     !body.gender
//   ) {
//     return res.status(400).json({ msg: "All fields are required" });
//   }
//   const result = await User.create({
//     firstName: body.first_name,
//     lastName: body.last_name,
//     email: body.email,
//     gender: body.gender,
//   });
// }
async function handleCreateUser(req, res) {
  try {
    const body = req.body;
    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const result = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
    });

    return res.status(201).json({ msg: "success", id: result._id });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

// return res.status(201).json({ msg: "success", id: result._id });

const JWT_SECRET = "your_jwt_secret"; // Replace with a strong secret

async function handleRegister(req, res) {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  res.status(201).json({ msg: "User registered successfully" });
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ msg: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateByUser,
  handleDeleteByUser,
  handleCreateUser,
  handleLogin,
  handleRegister,
  getUsersData,
};
