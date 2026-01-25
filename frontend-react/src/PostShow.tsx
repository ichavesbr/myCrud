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
    <>
      <h1>Show Post Page</h1>
      <div>
        <p>
          <strong>Name:</strong>
          {name}
        </p>
        <p>
          <strong>Age:</strong>
          {age}
        </p>
      </div>
      <Link to="/">Home</Link>
    </>
  )
}

export { PostShow }
