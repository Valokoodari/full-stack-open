import { useState } from "react"
import PropTypes from "prop-types"

const Blog = ({ user, blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const handleLike = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    })
  }

  return (
    <div className="blog">
      <b>{blog.title}</b> {blog.author ? ` by ${blog.author}` : null}{" "}
      <button onClick={() => { setVisible(!visible) }}>
        {visible ? "hide" : "view"}
      </button>
      {visible ?
        <div>
          <a href={blog.url}>{blog.url}</a>
          <div> likes {blog.likes}{" "} <button onClick={handleLike}>like</button></div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username ?
            <button onClick={() => { removeBlog(blog) }}>remove</button> :
            null
          }
        </div> : null
      }
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog
