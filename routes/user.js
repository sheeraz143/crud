const express = require("express");
const router = express.Router();
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateByUser,
  handleDeleteByUser,
  handleCreateUser,
  handleRegister,
  handleLogin,
  getUsersData,
} = require("../controllers/user");
const { authenticateJWT } = require("../middlewares/auth");

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.get("/usersdata", getUsersData);

router.use(authenticateJWT); // Apply JWT authentication to these routes

router.route("/").get(handleGetAllUsers).post(handleCreateUser);
router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateByUser)
  .delete(handleDeleteByUser);

module.exports = router;

// router.get("/users", async (req, res) => {
//   const allDbUsers = await User.find({});
//   const html = `
//      <ul>
//      ${allDbUsers
//        .map((user) => `<li>${user.firstName} - ${user.lastName}</li>`)
//        .join("")}
//      </ul>`;
//   res.send(html);
// });
