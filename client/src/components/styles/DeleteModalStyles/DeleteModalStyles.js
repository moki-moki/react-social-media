import styled from "styled-components";

export const DeleteModalMainContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: rgb(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

export const DeleteModalContainer = styled.div`
  position: relative;
  height: 60vh;
  width: 70%;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.body};
  border: 3px solid ${({ theme }) => theme.colors.editBtn};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Close = styled.span`
  position: absolute;
  top: 0;
  left: 93%;
  margin: 1em;
  padding: 0.3em;
  border: 1px solid ${({ theme }) => theme.colors.editBtn};
  cursor: pointer;
  transition: 0.3s ease all;

  &:hover {
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.editBtn};
  }
`;
