const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "node_crud",
})

// aqui a gente cria a rota para listar os posts
app.get("/api/posts", (req, res) => {
  db.query("SELECT * FROM posts", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

// aqui a gente cria a rota para criar um post
app.post("/api/posts", (req, res) => {
  const { name, age } = req.body
  db.query("INSERT INTO posts (name, age) values (?, ?)", [name, age], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ id: result.insertId, name: name, age: age })
  })
})

// aqui a gente inicia o servidor
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))
