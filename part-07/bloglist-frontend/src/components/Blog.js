import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog, removeBlog, addComment } from "../reducers/blogReducer";

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

  const handleComment = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    event.target.comment.value = "";
    dispatch(addComment(blog.id, comment));
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
      <div className="comments">
        <h3>comments</h3>
        <form onSubmit={(event) => handleComment(event)}>
          <input type="text" name="comment" />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
