import express from "express"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import authRoutes from "./routes/authRoutes.js"
import todoRoutes from "./routes/todoRoutes.js"
import authMiddleware from "./middleware/authMiddleware.js"

const app = express()
const PORT = process.env.PORT || 5003

// get the file path from the URL
const __filename = fileURLToPath(import.meta.url)

// get the directory name from the file path
const __dirname = dirname(__filename)

// MIDDLEWARE
app.use(express.json())
// serve the HTML file from the public folder
// also tells express to serve all files from public folder as static assets/files
app.use(express.static(path.join(__dirname, "../public")))

// serve the HTML file from the public folder
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../public", "index.html")))

app.use("/auth", authRoutes)
app.use("/todos", authMiddleware, todoRoutes)

app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`))
