import styled from "styled-components";

export const BtnArrowUp = styled.span`
  position: fixed;
  display: inline-block;
  bottom: 6%;
  right: 7%;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 3em;
  cursor: pointer;
  transition: 0.2s ease all;

  &:hover {
    color: ${({ theme }) => theme.colors.editBtn};
  }
`;
