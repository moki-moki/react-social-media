import {
  ProfileCardContainer,
  ProfileInfoContainer,
  ProfilePicture,
  ProfilePictureContainer,
  ProfilePictureWrapper,
} from "./styles/ProfileStyles/ProfileStyles";

const ProfileInfo = ({ name }) => {
  return (
    <ProfileCardContainer>
      <ProfilePictureContainer>
        <ProfilePictureWrapper>
          <ProfilePicture
            src={`
https://avatars.dicebear.com/api/identicon/${name}.svg
                `}
          />
        </ProfilePictureWrapper>
      </ProfilePictureContainer>
      <ProfileInfoContainer>
        <h3>
          Name: <span>{name}</span>
        </h3>
      </ProfileInfoContainer>
    </ProfileCardContainer>
  );
};

export default ProfileInfo;
