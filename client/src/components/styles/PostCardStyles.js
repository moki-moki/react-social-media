import styled from "styled-components";

export const PostCardContainer = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  margin: 0 auto;
  width: 50%;
  height: 100%;
  border-radius: 15px;
`;

export const PostCardContentContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 1em 0;
  width: 100%;
`;

export const PostCardUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

export const PostCardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 1em 0;
  padding: 0 1em;
`;

export const PostCardUserInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const PostCardDesc = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.3em;
  margin: 1em 0;
  padding: 0 1em;
  width: 100%;
`;

export const PostCardUserImg = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  margin: 0 5px;
`;

export const PostCardBottomBar = styled.div`
  padding: 0.5em;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.heading};
`;

export const PostCardBtnContainer = styled.div``;

export const PostCardButtonsDislike = styled.button`
  font-size: 1.5em;
  padding: 0.2em;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.redBtn};
  transition: 0.2s ease all;
  margin: 0 0.3em;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background: ${({ theme }) => theme.colors.redBtn};
    border-radius: 10px;
  }
  &:active {
    background: ${({ theme }) => theme.colors.redBtn};
  }

  &:focus {
    background: ${({ theme }) => theme.colors.redBtn};
  }
`;

export const PostCardButtonsLike = styled.button`
  font-size: 1.5em;
  padding: 0.2em;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.greenBtn};
  transition: 0.2s ease all;
  margin: 0 0.3em;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background: ${({ theme }) => theme.colors.greenBtn};
    border-radius: 10px;
  }

  &:active {
    background: ${({ theme }) => theme.colors.greenBtn};
  }

  &:focus {
    background: ${({ theme }) => theme.colors.greenBtn};
  }
`;
