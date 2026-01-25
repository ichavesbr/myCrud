const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// CREATE CONNECTION TO DATABASE
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "node_crud",
})

// CREATE POST
app.post("/api/posts", (req, res) => {
  const { name, age } = req.body
  db.query("INSERT INTO posts (name, age) values (?, ?)", [name, age], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ id: result.insertId, name: name, age: age })
  })
})

// GET POSTS
app.get("/api/posts", (req, res) => {
  db.query("SELECT * FROM posts", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

// GET POST DETAILS
app.get("/api/posts/:id", (req, res) => {
  db.query("SELECT * FROM posts WHERE id=?", [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows[0])
  })
})

// UPDATE POST
app.put("/api/posts/:id", (req, res) => {
  const { name, age } = req.body
  db.query("UPDATE posts SET name=?, age=? WHERE id=?", [name, age, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ id: req.params.id, name: name, age: age })
  })
})

// DELETE POST
app.delete("/api/posts/:id", (req, res) => {
  db.query("DELETE FROM posts WHERE id=?", [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ message: "Post deletado com sucesso!" })
  })
})

// aqui a gente inicia o servidor
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))
