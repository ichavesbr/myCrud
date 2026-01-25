import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

type Post = {
  id: number
  name: string
  age: number
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    axios.get("http://localhost:3001/api/posts").then(res => setPosts(res.data))
  })

  const deletePost = (id: number) => {
    if (confirm("Are you sure?")) {
      axios.delete(`http://localhost:3001/api/posts/${id}`).then(() => {
        setPosts(posts.filter(p => p.id !== id))
      })
    }
  }

  return (
    <div className="page-wrapper">
      <div className="header">
        <h1>📋 User Management System</h1>
        <Link to="/create" className="btn-primary">
          + Add New User
        </Link>
      </div>

      <div className="table-header">
        <div>Name</div>
        <div>Age</div>
        <div>View</div>
        <div>Edit</div>
        <div>Delete</div>
      </div>

      <div>
        {posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-light)" }}>
            No users found. Click "Add New User" to get started.
          </div>
        ) : (
          posts.map(({ id, name, age }) => (
            <div key={id} className="table-row">
              <div style={{ fontWeight: 600 }}>{name}</div>
              <div>{age}</div>
              <div className="table-actions">
                <Link to={`/show/${id}`} style={{ color: "var(--primary)" }}>
                  👁️ View
                </Link>
              </div>
              <div className="table-actions">
                <Link to={`/edit/${id}`} style={{ color: "var(--secondary)" }}>
                  ✏️ Edit
                </Link>
              </div>
              <div className="table-actions">
                <button
                  onClick={() => deletePost(id)}
                  className="btn-danger"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export { Posts }
