import { Link } from "react-router-dom";
import {
  NavbarContainer,
  NavLeftSide,
  NavUserContainer,
  NavUserImg,
  NavUsername,
} from "./styles/NavbarStyles";

const Navbar = ({ user }) => {
  return (
    <NavbarContainer>
      <NavLeftSide>
        <Link to="/">
          <h4>LOGO</h4>
        </Link>
        <Link style={{ margin: "0 1em" }} to="/about">
          About
        </Link>
        <Link to="/createPost">Create a post</Link>
      </NavLeftSide>
      {/* <Link to={`/profile/${user.username}`}> */}
      <Link to={`/profile/${user.username}/${user._id}`}>
        <NavUserContainer>
          <NavUsername>{user.username}</NavUsername>
          <NavUserImg
            src={`https://avatars.dicebear.com/api/identicon/${user.username}.svg`}
          />
        </NavUserContainer>
      </Link>
    </NavbarContainer>
  );
};

export default Navbar;
