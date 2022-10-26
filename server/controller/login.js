const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const jwt = require("../utils/jwt");

async function login(req, res, db) {
  const email = req.body.email;
  const password = req.body.password;
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "Select * from users where email = ?";
    const search_query = mysql.format(sqlSearch, [email]);
    await connection.query(search_query, async (err, result) => {
      connection.release();

      if (err) throw err;
      if (result.length == 0) {
        console.log("--------> User does not exist");
        res.sendStatus(404);
      } else {
        const hashedPassword = result[0].password;
        //get the hashedPassword from result
        if (await bcrypt.compare(password, hashedPassword)) {
          console.log("---------> Login Successful");
          console.log("---------> Generating accessToken");
          const token = jwt.jwt({ email: email });
          console.log(token);
          res.json({ user_id:result[0].userId, accessToken: token });
        } else {
          res.send("Password incorrect!");
        } 
      } 
    }); 
  }); 
}

exports.login = login;
