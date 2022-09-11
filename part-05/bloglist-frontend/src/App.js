import { useState, useEffect } from "react"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import loginService from "./services/login"
import blogService from "./services/blogs"
import Blog from "./components/Blog"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const [showBlogForm, setShowBlogForm] = useState(false)
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

      createNotification("success", `Logged in as ${user.name}`)

      window.localStorage.setItem(
        "currentBloglistUser", JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      createNotification("error", "Incorrect username or password!")
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("currentBloglistUser")
    blogService.setToken(null)
    setUser(null)
    createNotification("success", "Logged out successfully!")
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title, author, url
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setShowBlogForm(false)
      setTitle("")
      setAuthor("")
      setUrl("")
      createNotification("success", `A new blog ${returnedBlog.title} by ${returnedBlog.author} added.`)
    } catch (exception) {
      createNotification("error", `Could not create blog: ${exception.response.data.error}`)
    }
  }

  const createNotification = (type, message) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  if (!user) {
    return (
      <div>
        <Notification notification={notification} />
        <LoginForm
          username={username} password={password}
          setUsername={setUsername} setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification notification={notification} />
      <div>
        Logged in as {user.name}{" "}
        <button onClick={handleLogout}>logout</button>
      </div>
      <BlogForm
        showBlogForm={showBlogForm} setShowBlogForm={setShowBlogForm}
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
