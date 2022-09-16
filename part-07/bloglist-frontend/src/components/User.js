import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const User = () => {
  const id = useParams().id;
  const user = useSelector((state) => state.users.find((u) => u.id === id));

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2 className="mb-4">{user.name}</h2>
      <h4>added blogs</h4>
      {user.blogs.length === 0 ? (
        <p>the user has not added any blogs yet.</p>
      ) : (
        <Table striped>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {user.blogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
                <td>{blog.author}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default User;
