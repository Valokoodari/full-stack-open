const BlogForm = ({
  showBlogForm, setShowBlogForm,
  title, setTitle,
  author, setAuthor,
  url, setUrl,
  createBlog
}) => {
  const showButtonStyle = {
    marginTop: "1.2em"
  }

  if (!showBlogForm) {
    return (
      <button style={showButtonStyle} onClick={() => setShowBlogForm(true)}>
        new blog
      </button>
    )
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
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
        <button onClick={(event) => {
          event.preventDefault(); setShowBlogForm(false)
        }}>cancel</button>
      </form>
    </div>
  )
}

export default BlogForm
