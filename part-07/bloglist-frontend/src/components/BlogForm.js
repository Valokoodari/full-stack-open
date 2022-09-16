import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = () => {
  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();

    dispatch(
      createBlog({
        title,
        author,
        url,
      })
    );

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const handleToggleVisibility = (event) => {
    event.preventDefault();
    toggleVisibility();
  };

  if (!visibility) {
    return (
      <div className="mt-3 mb-4">
        <Button variant="primary" onClick={handleToggleVisibility}>
          new blog
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-3 mb-4 border border-dark rounded p-4">
      <h2>Add a new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label className="mt-3">Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label className="mt-3">Url</Form.Label>
          <Form.Control
            type="text"
            name="url"
            value={url}
            placeholder="https://example.com"
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button
            variant="primary"
            type="submit"
            className="my-auto mt-4 me-3"
            style={{ fontSize: "1.2em" }}
          >
            create
          </Button>
          <Button
            variant="secondary"
            type="button"
            className="mt-4"
            style={{ fontSize: "1.2em" }}
            onClick={handleToggleVisibility}
          >
            cancel
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default BlogForm;
