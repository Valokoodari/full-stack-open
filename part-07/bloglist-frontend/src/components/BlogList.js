import Blog from "./Blog";

const BlogList = ({ blogs, updateBlog, removeBlog, user }) => {
  return (
    <div>
      <h2>blogs</h2>
      <div id="blog-list">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              className="blog"
              user={user}
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
