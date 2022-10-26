const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");
const jwt = require("../utils/jwt");

async function getMovie(req, res, db) {
  const user_email = req.body.email
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "Select * from list where user_email = ?";
    const search_query = mysql.format(sqlSearch, [user_email]);
    await connection.query(search_query, async (err, result) => {
      connection.release();

      if (err) throw err;
      if (result.length == 0) {
        console.log("--------> User does not exist");
        res.sendStatus(404);
      } else {
        res.json({likes:result[0].likes, bookmarks:result[0].bookmarks})
      } 
    }); 
  }); 
}
async function addMovie(req, res, db) {
    const user_email = req.body.email
    const likeList = req.body.likes;
    const bookmarkList = req.body.bookmarks;

    const stringLike = JSON.stringify(likeList)
    const stringBookmarks = JSON.stringify(bookmarkList)

    db.getConnection(async (err, connection) => {
      if (err) throw err;
      const sqlSearch = "Select * from list where user_email = ?";
      const insertListQuery = "UPDATE list SET likes = ?, bookmarks = ? WHERE user_email = ?";
      const search_query = mysql.format(sqlSearch, [user_email]);
      const ILQ = mysql.format(insertListQuery, [stringLike, stringBookmarks, user_email]);
      await connection.query(search_query, async (err, result) => {
  
        if (err) throw err;
        if (result.length == 0) {
          console.log("--------> User does not exist");
          res.sendStatus(404);
        } else {
          await connection.query(ILQ, (err, result) => {
            if (err) throw err;
            res.sendStatus(201);
            connection.release();
            console.log("--------> Created new list");
            console.log(result.insertId);
          });
        } 
      });
    }); 
  }
  

exports.getMovie = getMovie;
exports.addMovie = addMovie;
