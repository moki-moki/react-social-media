import styled from "styled-components";

export const NavbarContainer = styled.div`
  width: 100%;
  height: 45px;
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: 0 0 10px 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const NavLeftSide = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.img``;

export const NavUserContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const NavUserImg = styled.img`
  height: 30px;
  width: 30px;
  margin: 0 1em;
  border-radius: 50%;
`;
