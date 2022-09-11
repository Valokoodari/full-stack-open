import { useState, useEffect } from "react"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import loginService from "./services/login"
import blogService from "./services/blogs"
import Blog from "./components/Blog"

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const currentUserJSON = window.localStorage.getItem("currentBloglistUser")
    if (currentUserJSON) {
      const user = JSON.parse(currentUserJSON)
      blogService.setToken(user.token)
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
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log("wrong credentials")
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("currentBloglistUser")
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title, author, url
    }

    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  if (!user) {
    return (
      <LoginForm
        username={username} password={password}
        setUsername={setUsername} setPassword={setPassword}
        handleLogin={handleLogin}
      />
    )
  }

  return (
    <div>
      <h1>Bloglist</h1>
      <div>
        Logged in as {user.name}{" "}
        <button onClick={handleLogout}>logout</button>
      </div>
      <BlogForm
        title={title} setTitle={setTitle}
        author={author} setAuthor={setAuthor}
        url={url} setUrl={setUrl}
        createBlog={handleCreateBlog}
      />
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
