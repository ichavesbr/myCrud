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
    <div>
      <h1>CRUD APP</h1>

      <Link to="/create">Create</Link>
      <hr className="my-8" />
      <div className="flex gap-4 items-center font-bold text-lime-500">
        <h2>Name</h2>
        <h2>Age</h2>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {posts.map(({ id, name, age }) => (
          <div key={id} className="flex gap-4 justify-between items-center">
            <div>{name}</div>
            <div>{age}</div>
            <Link to={`/edit/${id}`}>Edit</Link>
            <Link to={`/show/${id}`}>Show</Link>
            <button onClick={() => deletePost(id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export { Posts }
