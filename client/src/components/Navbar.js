import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  NavbarContainer,
  NavbarDropdownLink,
  NavbarDropdownSignOut,
  NavDropdownCotnainer,
  NavLeftSide,
  NavUserContainer,
  NavUserImg,
  NavUsername,
} from "./styles/NavbarStyles";

const Navbar = ({ user }) => {
  const [menu, setMenu] = useState(false);
  console.log(user);
  const navRef = useRef();

  useEffect(() => {
    let closeNavDropdown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenu(!menu);
      }
    };

    document.addEventListener("mousedown", closeNavDropdown);

    return () => {
      document.removeEventListener("mousedown", closeNavDropdown);
    };
  });

  const handleDropdownMenu = () => {
    setMenu(!menu);
  };

  const signOutHandler = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

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
      <NavUserContainer onClick={() => handleDropdownMenu()}>
        <NavUsername>{user.username}</NavUsername>
        <NavUserImg
          src={`https://avatars.dicebear.com/api/identicon/${user.username}.svg`}
        />
        {menu ? (
          <NavDropdownCotnainer ref={navRef}>
            <NavbarDropdownLink to={`/profile/${user.username}/${user._id}`}>
              Profile
            </NavbarDropdownLink>
            <NavbarDropdownSignOut onClick={() => signOutHandler()}>
              Sign Out
            </NavbarDropdownSignOut>
          </NavDropdownCotnainer>
        ) : null}
      </NavUserContainer>
    </NavbarContainer>
  );
};

export default Navbar;
