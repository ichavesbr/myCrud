import { Route, Routes } from "react-router-dom"
import { PostCreate } from "./PostCreate"
import { Posts } from "./Posts"
import "./App.css"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/create" element={<PostCreate />} />
      </Routes>
    </>
  )
}

export default App
