import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BlogForm from "./BlogForm";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      <BlogForm />
      <h2>blogs</h2>
      <div id="blog-list">
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <div key={blog.id} className="blog">
              <Link to={`/blogs/${blog.id}`}>
                <b>{blog.title}</b> by {blog.author}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogList;
