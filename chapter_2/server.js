import express from "express"

const app = express()
const PORT = 3737

const data = ["igor"]

// MIDDLEWARE
app.use(express.json())

// website endpoint (send back html)
app.get("/", (req, res) => {
  res.send(`
  <body>
    <h1>DATA:</h1>
    <p>${JSON.stringify(data)}</p>
    <a href="/dashboard">Dashboard</a>
  </body>
  `)
})

app.get("/dashboard", (req, res) => {
  res.send(`
    <body>
      <h1>DATA:</h1>
      <a href="/">Home</a>
    </body>
`)
})

// API endpoint
app.get("/api/data", (req, res) => {
  console.log("endpoint for data")
  res.status(599).send(data)
})

app.post("/api/data", (req, res) => {
  const newEntry = req.body
  console.log(newEntry)
  data.push(newEntry.name)
  res.sendStatus(201)
})

app.delete("/api/data", (req, res) => {
  data.pop()
  console.log("last element deleted")
  res.sendStatus(203)
})

app.listen(PORT, () => console.log(`Server. has started on ${PORT}`))
