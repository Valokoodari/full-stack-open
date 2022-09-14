import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      <h2>blogs</h2>
      <div id="blog-list">
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} className="blog" user={user} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
