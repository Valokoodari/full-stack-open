import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBlog, removeBlog } from "../reducers/blogReducer";

const Blog = ({ user, blog }) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

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
    }
  };

  return (
    <div className="blog">
      <b>{blog.title}</b> {blog.author ? ` by ${blog.author}` : null}{" "}
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? "hide" : "view"}
      </button>
      {visible ? (
        <div>
          <a href={blog.url}>{blog.url}</a>
          <div>
            {" "}
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username ? (
            <button
              onClick={() => {
                handleRemove();
              }}
            >
              remove
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
