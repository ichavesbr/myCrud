import "./App.css"
import { Route, Routes } from "react-router-dom"
import { PostCreate } from "./PostCreate"
import { Posts } from "./Posts"
import { PostEdit } from "./PostEdit"
import { PostShow } from "./PostShow"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/create" element={<PostCreate />} />
        <Route path="/edit/:id" element={<PostEdit />} />
        <Route path="/show/:id" element={<PostShow />} />
      </Routes>
    </>
  )
}

export default App
