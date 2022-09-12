import { useState } from "react"

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="blog">
      <b>{blog.title}</b> {blog.author ? ` by ${blog.author}` : null}{" "}
      <button onClick={() => { setVisible(!visible) }}>
        {visible ? "hide" : "view"}
      </button>
      {visible ?
        <div>
          <a href={blog.url}>{blog.url}</a>
          <div> likes {blog.likes}{" "} <button>like</button></div>
          <div>{blog.user.name}</div>
        </div> : null
      }
    </div>
  )
}

export default Blog