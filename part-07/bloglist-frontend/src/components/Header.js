import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/loginReducer";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div id="header">
      <Link to="/">blogs</Link> <Link to="/users">users</Link> Logged in as{" "}
      {user.name}{" "}
      <button type="button" onClick={() => dispatch(logout())}>
        logout
      </button>
    </div>
  );
};

export default Header;
