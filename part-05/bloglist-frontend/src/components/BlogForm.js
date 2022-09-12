import { useState, useImperativeHandle, forwardRef } from "react"

const BlogForm = forwardRef(({ createBlog }, ref) => {
  const [visibility, setVisibility] = useState(false)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = async (event) => {
    event.preventDefault()

    createBlog({
      title, author, url
    })
  }

  const clearForm = () => {
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  const handleToggleVisibility = (event) => {
    event.preventDefault()
    toggleVisibility()
  }

  useImperativeHandle(ref, () => {
    return {
      clearForm,
      toggleVisibility
    }
  })

  if (!visibility) {
    return (
      <div style={{ marginTop: "1.2em" }}>
        <button onClick={toggleVisibility}>new blog</button>
      </div>
    )
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title{" "}
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author{" "}
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url{" "}
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>{" "}
        <button onClick={(event) => handleToggleVisibility(event)}>cancel</button>
      </form>
    </div>
  )
})

BlogForm.displayName = "BlogForm"

export default BlogForm
