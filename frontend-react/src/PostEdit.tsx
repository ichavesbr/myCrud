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

  const submitForm = e => {
    e.preventDefault()
    axios.put(`http://localhost:3001/api/posts/${id}`, { name: name, age: age }).then(() => navigate("/"))
  }

  return (
    <>
      <h1>Edit Post Page</h1>
      <form onSubmit={submitForm} className="flex flex-col gap-4 mt-30">
        <div className="flex justify-center items-center gap-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Your name here"
            required
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="flex justify-center items-center gap-4">
          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            name="age"
            value={age}
            placeholder="your age here"
            required
            onChange={e => setAge(e.target.value)}
          />
        </div>

        <button type="submit">Edit user</button>
      </form>
      <Link to="/">Home</Link>
    </>
  )
}

export { PostEdit }
