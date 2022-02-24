import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  HamburgerContainer,
  NavbarContainer,
  NavbarDropdownLink,
  NavbarDropdownSignOut,
  NavDropdownCotnainer,
  NavItemWrapper,
  NavLeftSide,
  NavUserContainer,
  NavUserImg,
  NavUsername,
  ToggleBtn,
  ToggleContainer,
  ToggleItemWrapper,
} from "./styles/NavbarStyles";

const Navbar = ({ user, setThemes, themes }) => {
  // toggle profile menu
  const [menu, setMenu] = useState(false);

  // toggle themes
  const [toggle, setToggle] = useState(false);

  // toggle hamburger
  const [toggleHamburger, setToggleHamburger] = useState(false);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const closeHamburgerMenu = (e) => {
      if (
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target) &&
        e.target.tagName !== "A"
      ) {
        setToggleHamburger(false);
      }
    };

    document.addEventListener("mousedown", closeHamburgerMenu);

    return () => {
      document.removeEventListener("mousedown", closeHamburgerMenu);
    };
  }, [hamburgerRef]);

  const toggleHamburgerMenu = () => {
    setToggleHamburger(!toggleHamburger);
  };

  const navRef = useRef(null);

  const changeTheme = () => {
    if (themes === "light") {
      setThemes("dark");
      localStorage.setItem("theme", JSON.stringify("dark"));
    } else {
      setThemes("light");
      localStorage.setItem("theme", JSON.stringify("light"));
    }
    setToggle(!toggle);
  };

  useEffect(() => {
    let closeNavDropdown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenu(false);
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
      {user ? (
        <>
          <HamburgerContainer
            onClick={toggleHamburgerMenu}
            hamburgerToggle={toggleHamburger}
            ref={hamburgerRef}
          >
            <span></span>
            <span></span>
            <span></span>
          </HamburgerContainer>
          <NavUserContainer onClick={() => handleDropdownMenu()}>
            <NavUsername>{user.user.username}</NavUsername>
            <NavUserImg
              src={`https://avatars.dicebear.com/api/identicon/${user.user.username}.svg`}
            />
            {menu ? (
              <NavDropdownCotnainer ref={navRef}>
                <NavbarDropdownLink
                  to={`/profile/${user.user.username}/${user.user._id}`}
                >
                  Profile
                </NavbarDropdownLink>
                <NavbarDropdownSignOut onClick={() => signOutHandler()}>
                  Sign Out
                </NavbarDropdownSignOut>
              </NavDropdownCotnainer>
            ) : null}
          </NavUserContainer>
          <NavItemWrapper hamburgerToggle={toggleHamburger}>
            <NavLeftSide>
              <Link to="/">Home</Link>
              <Link style={{ margin: "0 1em" }} to="/about">
                About
              </Link>
              <Link to="/createPost">Create a post</Link>
            </NavLeftSide>
          </NavItemWrapper>
          <ToggleContainer>
            <ToggleItemWrapper>
              <span>&#127774;</span>
              <span>&#127771;</span>
              <ToggleBtn toggle={toggle} onClick={changeTheme}></ToggleBtn>
            </ToggleItemWrapper>
          </ToggleContainer>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
