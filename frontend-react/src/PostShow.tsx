import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const PostShow = () => {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/api/posts/${id}`).then(res => {
        setName(res.data.name)
        setAge(res.data.age)
      })
    }
  }, [id])

  return (
    <div className="page-wrapper">
      <div className="header">
        <h1>👤 User Details</h1>
      </div>

      <div className="detail-card">
        <div className="detail-item">
          <strong>Full Name:</strong>
          <span style={{ marginLeft: "1rem", fontSize: "1.1rem" }}>{name}</span>
        </div>
        <div className="detail-item">
          <strong>Age:</strong>
          <span style={{ marginLeft: "1rem", fontSize: "1.1rem" }}>{age}</span>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <Link to="/" className="btn-primary">
          ← Back to List
        </Link>
      </div>
    </div>
  )
}

export { PostShow }
