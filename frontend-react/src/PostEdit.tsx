import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const PostEdit = () => {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/api/posts/${id}`).then(res => {
        setName(res.data.name)
        setAge(res.data.age)
      })
    }
  }, [id])

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios.put(`http://localhost:3001/api/posts/${id}`, { name: name, age: age }).then(() => navigate("/"))
  }

  return (
    <div className="page-wrapper">
      <div className="header">
        <h1>✏️ Edit User</h1>
      </div>

      <form onSubmit={submitForm} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
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
            value={age}
            placeholder="Enter age"
            required
            onChange={e => setAge(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-success">
            ✓ Save Changes
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

export { PostEdit }
