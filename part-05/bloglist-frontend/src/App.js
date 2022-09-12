import { useState, useEffect, useRef } from "react"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import loginService from "./services/login"
import blogService from "./services/blogs"
import Blog from "./components/Blog"

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [notifTimeout, setNotifTimeout] = useState(null)

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

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)

      createNotification("success", `Logged in as ${user.name}`)

      window.localStorage.setItem(
        "currentBloglistUser", JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
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

  const createNotification = (type, message) => {
    setNotification({ message, type })
    if (notifTimeout) {
      clearTimeout(notifTimeout)
    }
    setNotifTimeout(setTimeout(() => {
      setNotification(null)
    }, 5000))
  }

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      blogFormRef.current.toggleVisibility()
      createNotification("success", `A new blog ${returnedBlog.title} by ${returnedBlog.author} added.`)
    } catch (exception) {
      createNotification("error", `Could not create blog: ${exception.response.data.error}`)
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.update(blogObject.id, blogObject)
      setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog))
      createNotification("success", `Blog ${returnedBlog.title} by ${returnedBlog.author} updated.`)
    } catch (exception) {
      createNotification("error", `Could not update blog: ${exception.response.data.error}`)
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification notification={notification} />
      { user === null ?
        <div>
          <LoginForm handleLogin={handleLogin} />
        </div> :
        <div>
          <div>
            Logged in as {user.name}{" "}
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel="new blog" ref={blogFormRef} >
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
          )}
        </div>
      }
    </div>
  )
}

export default App
