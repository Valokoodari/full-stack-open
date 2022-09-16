import { Form, Button, ListGroup, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
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
      added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
      <InputGroup className="my-3">
        <InputGroup.Text id="basic-addon1">{blog.likes} likes</InputGroup.Text>
        <Button variant="primary" onClick={handleLike}>
          like
        </Button>
      </InputGroup>
      {user.username === blog.user.username ? (
        <Button variant="danger" onClick={handleRemove}>
          remove
        </Button>
      ) : null}
      <div className="comments mt-3">
        <h3>Comments ({blog.comments.length})</h3>
        <Form className="my-3" onSubmit={handleComment}>
          <InputGroup>
            <Form.Control type="text" name="comment" />
            <Button type="submit">add comment</Button>
          </InputGroup>
        </Form>
        <ListGroup>
          {blog.comments.map((comment, index) => (
            <ListGroup.Item key={index}>{comment}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default Blog;
