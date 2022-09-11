import { useState, useEffect } from "react"
import LoginForm from "./components/LoginForm";
import loginService from "./services/login"
import blogService from "./services/blogs"
import Blog from "./components/Blog"

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

  useEffect(() => {
    const currentUserJSON = window.localStorage.getItem("currentBloglistUser")
    if (currentUserJSON) {
      const user = JSON.parse(currentUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        "currentBloglistUser", JSON.stringify(user)
      )
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log("wrong credentials")
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("currentBloglistUser")
    setUser(null)
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
      <div>
        Logged in as {user.name}{" "}
        <button onClick={handleLogout}>logout</button>
      </div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
