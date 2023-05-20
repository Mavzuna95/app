const express = require("express");
const app = express();
const cors = require("cors");
const port = 3003;

const { Pool } = require("pg");
// const mysql = require('mysql')
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  password: "1111",
  host: "localhost",
  port: 5432,
  database: "megabook",
});

app.use(cors());
app.use(express.json());


// pool.connect(function (err) {
//   if (err) throw err;


app.get("/categories", (req, res) => {
  pool.query(`SELECT * FROM "categories"`, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
});
// })
app.get("/books", (req, res) => {
    pool.query(`SELECT * FROM "books"`, (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  });
  

  app.get("/books/:id", (req, res) => {
    //   res.status(200).json(req.params["id"]);
    pool.query(
      `SELECT * FROM books WHERE category_id=${req.params["id"]}`, (err, result) =>{
        if (err) throw err;
        res.status(200).json(result.rows);
      }
    );
  });


  app.get("/book/:id", (req, res) => {
    pool.query(
      `SELECT * FROM books WHERE id=${req.params["id"]}`,
      function (err, result) {
        if (err) throw err;
        res.status(200).json(result.rows);
        console.log("result !", result);
      }
    );
  });

  app.post("/add_category", (req, res) => {
    const { name } = req.body;
    pool.query(
      `INSERT INTO "categories" ("def") VALUES($1)`,
      [name],
      (error, results) => {
        if (error) throw error;
        res.status(201).json("success");
      }
    );
  
  });
  app.post("/add_books", (req, res) => {
  
    const { name, category_id, descr,img, author} = req.body;
    pool.query(
      `INSERT INTO "books" ("name", "descr","category_id","img","author") VALUES($1, $2, $3, $4, $5)`,
      [ name, descr , category_id,img, author],
      (error, results) => {
        if (error) throw error;
        res.status(201).json("success");
      }
    );
  
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
