import styled from "styled-components";

export const ProfileCardContainer = styled.div`
  width: 36%;
  border-radius: 10px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.cardBg};
  padding: 1em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const ProfileInfoContainer = styled.div`
  grid-column: 2/4;
`;

export const ProfilePictureContainer = styled.div`
  position: relative;
`;

export const ProfilePictureWrapper = styled.div`
  position: relative;
  border-radius: 50%;
  width: 50%;
`;

export const EditBtn = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfilePicture = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  margin: 0 5px;
`;

export const ProfileDesc = styled.div`
  grid-column: 2/4;
`;

export const ProfilePictureEditCircle = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.editBtn};
  cursor: pointer;
  transition: 0.3s ease background;

  &:hover {
    background: ${({ theme }) => theme.colors.editBtn};
  }
`;
