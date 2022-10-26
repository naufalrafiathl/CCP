const jwtoken = require("jsonwebtoken");
function jwt(user) {
  return jwtoken.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}
exports.jwt = jwt;
