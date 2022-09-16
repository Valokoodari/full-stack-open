import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import BlogForm from "./BlogForm";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      <BlogForm />
      <h2>blogs</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Website</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
                <td>{blog.author}</td>
                <td>
                  <a href={blog.url}>Visit</a>
                </td>
                <td>{blog.likes}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BlogList;
