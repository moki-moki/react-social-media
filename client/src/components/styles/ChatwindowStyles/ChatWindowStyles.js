import styled from "styled-components";

export const MainWindowContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 85vh;
  margin-bottom: 1em;
`;

export const FriendListContainer = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  heigth: 100%;
  padding: 1em;
  border-radius: 10px;
  overflow-y: auto;
  flex: 1;
`;

export const FriendListWrapper = styled.div`
  border-right: 2px solid ${({ theme }) => theme.colors.hoverOverlay};
  padding: 0.3em;
`;

export const ChatBoxContainer = styled.div`
  padding: 0 1em;
  display: flex;
  flex-direction: column;
  flex: 2;
`;

export const ChatBoxMessageBox = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.hoverOverlay};
  border-radius: 10px;
  margin-bottom: 0.3em;
  padding: 1em;
  color: ${({ theme }) => theme.colors.text};
  height: 100%;
  overflow-y: auto;
`;

export const ChatBoxInput = styled.input`
  width: 100%;
  background: none;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.colors.hoverOverlay};
  color: ${({ theme }) => theme.colors.text};
  padding: 1em;
  outline: none;
`;

export const OnlineUsers = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  heigth: 100%;
  padding: 1em;
  border-radius: 10px;
  overflow-y: auto;
  flex: 1;
`;

export const OnlineUsersWrapper = styled.div`
  border-left: 2px solid ${({ theme }) => theme.colors.hoverOverlay};
  padding: 0.3em;
`;
