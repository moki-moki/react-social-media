import { Link } from "react-router-dom";
import {
  Logo,
  NavbarContainer,
  NavLeftSide,
  NavUserContainer,
  NavUserImg,
} from "./styles/NavbarStyles";

const Navbar = ({ user }) => {
  return (
    <NavbarContainer>
      <NavLeftSide>
        <h4>LOGO</h4>
        <Link style={{ margin: "0 1em" }} to="/">
          Home
        </Link>
        <Link to="/about">About</Link>
      </NavLeftSide>
      <NavUserContainer>
        <h3>{user.username}</h3>
        <NavUserImg
          src={`https://avatars.dicebear.com/api/identicon/${user.username}.svg`}
        />
      </NavUserContainer>
    </NavbarContainer>
  );
};

export default Navbar;
