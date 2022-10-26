const bcrypt = require("bcryptjs");
const mysql = require("mysql2");

async function register(req, res, db) {
  const fullName = req.body.full_name;
  const email = req.body.email;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM users WHERE email = ?";
    const listSearch = "SELECT * FROM list WHERE user_email = ?";
    const search_query = mysql.format(sqlSearch, [email]);
    const list_query = mysql.format(listSearch, [email]);
    const sqlInsert = "INSERT INTO users VALUES (0,?,?,?)";
    const sqlInsertList = "INSERT INTO list VALUES (0,?,?,?)";
    const insert_query = mysql.format(sqlInsert, [
      fullName,
      email,
      hashedPassword,
    ]);
    const insertlistquery = mysql.format(sqlInsertList, [email, null, null]);
    await connection.query(search_query, async (err, result) => {
      if (err) throw err;
      console.log("------> Search Results");
      console.log(result.length);
      if (result.length != 0) {
        connection.release();
        console.log("------> User already exists");
        res.sendStatus(409);
      } else {
        await connection.query(list_query, async (err, result) => {
          if (err) throw err;
          console.log("------> Search Results");
          console.log(result.length);
          if (result.length != 0) {
            connection.release();
            console.log("------> User already exists");
            res.sendStatus(409);
          } else {
            release(insertlistquery, insert_query, connection, res, req);
          }
        }); 
      }
    }); 
  }); 
}

async function release(insertlistquery, insert_query, connection, res, req) {
  await runQueries(insertlistquery, insert_query, connection, res, req);
  res.sendStatus(201);
  connection.release();
}

async function runQueries(insertlistquery, insert_query, connection, res, req) {
  await connection.query(insertlistquery, (err, result) => {
    if (err) throw err;
    console.log("--------> Created new list");
    console.log(result.insertId);
  });
  await connection.query(insert_query, (err, result) => {
    if (err) throw err;
    console.log("--------> Created new User");
    console.log(result.insertId);
  });
}

exports.register = register;
