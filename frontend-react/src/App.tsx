import { Route, Routes } from "react-router-dom"
import { PostCreate } from "./PostCreate"
import { Posts } from "./Posts"
import { PostEdit } from "./PostEdit"
import "./App.css"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/create" element={<PostCreate />} />
        <Route path="/edit/:id" element={<PostEdit />} />
      </Routes>
    </>
  )
}

export default App
