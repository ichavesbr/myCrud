import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const PostCreate = () => {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const navigate = useNavigate()

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios.post("http://localhost:3001/api/posts", { name: name, age: age }).then(() => navigate("/"))
  }

  return (
    <div className="page-wrapper">
      <div className="header">
        <h1>➕ Create New User</h1>
      </div>

      <form onSubmit={submitForm} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter full name"
            required
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Enter age"
            required
            onChange={e => setAge(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-success">
            ✓ Create User
          </button>
          <Link
            to="/"
            className="btn-secondary"
            style={{ padding: "0.75rem 1.75rem", borderRadius: "8px", display: "inline-block" }}>
            ✕ Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

export { PostCreate }
