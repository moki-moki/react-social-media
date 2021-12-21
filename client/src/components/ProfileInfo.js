import { useEffect } from "react";
import {
  EditBtn,
  ProfileCardContainer,
  ProfileInfoContainer,
  ProfilePicture,
  ProfilePictureContainer,
  ProfilePictureEditCircle,
  ProfilePictureWrapper,
} from "./styles/ProfileStyles/ProfileStyles";

const ProfileInfo = ({ user, name, id }) => {
  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <ProfileCardContainer>
      <ProfilePictureContainer>
        <ProfilePictureWrapper>
          <ProfilePicture
            src={`
https://avatars.dicebear.com/api/identicon/${name}.svg
                `}
          />

          {user.user._id === id ? (
            <ProfilePictureEditCircle>
              <EditBtn>&#128295;</EditBtn>
            </ProfilePictureEditCircle>
          ) : null}
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
