const { expressjwt: jwtMiddleware } = require("express-jwt");

const JWT_SECRET = "sheeraz123@gmail.com"; // Replace with a strong secret

const authenticateJWT = jwtMiddleware({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  credentialsRequired: false, // Optional: if you want to allow access to routes without a token

});

module.exports = {
  authenticateJWT,
};
