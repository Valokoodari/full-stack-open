import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog, removeBlog } from "../reducers/blogReducer";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = useParams().id;
  const user = useSelector((state) => state.user);
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));

  const handleLike = () => {
    dispatch(
      updateBlog({
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      })
    );
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog));
      navigate("/");
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>
        {blog.title} <i>by {blog.author}</i>
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {blog.likes} likes
      <button onClick={handleLike}>like</button>
      <br />
      added by {blog.user.name}
      <br />
      {user.username === blog.user.username ? (
        <button onClick={handleRemove}>remove</button>
      ) : null}
    </div>
  );
};

export default Blog;
