import { useState } from "react"

const Blog = ({ blog, updateBlog }) => {
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
        </div> : null
      }
    </div>
  )
}

export default Blog
