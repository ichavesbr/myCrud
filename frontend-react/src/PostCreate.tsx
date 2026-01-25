import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const PostCreate = () => {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const navigate = useNavigate()

  const submitForm = e => {
    e.preventDefault()
    axios.post("http://localhost:3001/api/posts", { name: name, age: age }).then(() => navigate("/"))
  }

  return (
    <>
      <h1>Create Post Page</h1>
      <form onSubmit={submitForm} className="flex flex-col gap-4 mt-30">
        <div className="flex justify-center items-center gap-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
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
            placeholder="your age here"
            required
            onChange={e => setAge(e.target.value)}
          />
        </div>

        <button type="submit">Add user</button>
      </form>
      <Link to="/">Home</Link>
    </>
  )
}

export { PostCreate }
