import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/loginReducer";
import { Nav, Navbar, Button } from "react-bootstrap";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <Navbar className="mb-3" bg="light" expand="lg">
      <Navbar.Brand className="ms-3" as={Link} to="/">
        Bloglist
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            blogs
          </Nav.Link>
          <Nav.Link as={Link} to="/users">
            users
          </Nav.Link>
        </Nav>
        <Nav className="ms-auto me-2">
          <Navbar.Text className="me-2">Logged in as {user.name}</Navbar.Text>
          <Button variant="outline-primary" onClick={() => dispatch(logout())}>
            logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
