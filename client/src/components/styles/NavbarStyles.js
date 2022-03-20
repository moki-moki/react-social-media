import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.div`
  width: 100%;
  height: 45px;
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: 0 0 10px 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1em;
`;

export const NavLeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-evenly;
  font-size: 1.5em;
`;

export const Logo = styled.img``;

export const NavUserContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

export const NavUserImg = styled.img`
  height: 30px;
  width: 30px;
  margin: 0 1em;
  border-radius: 50%;
`;

export const NavUsername = styled.h3`
  transition: 0.2s ease color;
  &:hover {
    color: ${({ theme }) => theme.colors.orangeBtn};
  }
`;

// Menu dropdown
export const NavDropdownCotnainer = styled.div`
  position: absolute;
  top: 35px;
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 10px;
  z-index: 10;
`;

export const NavbarDropdownLink = styled(Link)`
  width: 100%;
  display: block;
  border-bottom: 1px solid ${({ theme }) => theme.colors.heading};
  padding: 0.5em;
`;

export const NavbarDropdownSignOut = styled.span`
  width: 100%;
  display: block;
  color: ${({ theme }) => theme.colors.orangeBtn};
  transition: 0.2s ease color;
  padding: 0.5em;

  &:hover {
    color: ${({ theme }) => theme.colors.greenBtn};
  }
`;

export const ToggleContainer = styled.div`
  width: 70px;
  height: 30px;
  border-radius: 15px;
  border: 2px solid ${({ theme }) => theme.colors.heading};
  padding: 0.3em;
`;

export const ToggleItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ToggleBtn = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.heading};
  position: absolute;
  left: ${({ toggle }) => (toggle ? "100%" : "0%")};
  transform: ${({ toggle }) =>
    toggle ? "translateX(-100%)" : " translateX(0%)"};
  z-index: 20;
  transition: 0.3s ease all;
`;

export const NavItemWrapper = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  height: 100vh;
  width: 30%;
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  background: ${({ theme }) => theme.colors.cardBg};
  transition: 0.3s ease all;
  transform: ${({ hamburgerToggle }) =>
    hamburgerToggle ? "translateX(0%)" : "translateX(-100%)"};

  @media (max-width: 526px) {
    width: 60%;
  }
`;

export const HamburgerContainer = styled.div`
  z-index: 10;
  width: 33px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  transition: 0.3s ease all;
  z-index: 3;

  & span {
    z-index: 10;
    display: block;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.heading};
    transition: 0.3s ease all;
    position: ${({ hamburgerToggle }) =>
      hamburgerToggle ? "absolute" : "static"};
  }

  & span:nth-child(1) {
    transform: ${({ hamburgerToggle }) =>
      hamburgerToggle ? "rotate(45deg)" : "rotate(0deg)"};
  }

  & span:nth-child(3) {
    transform: ${({ hamburgerToggle }) =>
      hamburgerToggle ? "rotate(-45deg)" : "rotate(0deg)"};
  }

  & span:nth-child(2) {
    opacity: ${({ hamburgerToggle }) => (hamburgerToggle ? "0" : "1")};
    display: ${({ hamburgerToggle }) => (hamburgerToggle ? "none" : "block")};
  }
`;
