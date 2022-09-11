import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm";
import loginService from "./services/login"
import blogService from "./services/blogs"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log("wrong credentials")
    }
  }

  if (!user) {
    return (
      <LoginForm username={username} password={password}
        setUsername={setUsername} setPassword={setPassword}
        handleLogin={handleLogin}
      />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
