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
  align-items: center;
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
