import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Posts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/api/posts").then(res => setPosts(res.data))
  })

  return (
    <div>
      <h1>CRUD APP</h1>

      <Link to="/create">Create</Link>
      <hr className="my-8" />
      <div className="flex gap-4 justify-between items-center">
        <h2>Name</h2>
        <h2>Age</h2>
        <button>Edit</button>
        <button>Show</button>
        <button>Delete</button>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {posts.map(post => (
          <div key={post.id} className="flex gap-4 justify-between items-center">
            <div>{post.name}</div>
            <div>{post.age}</div>
            <button>Edit</button>
            <button>Show</button>
            <button>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export { Posts }
