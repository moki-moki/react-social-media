import { NotificationFailContainer } from "./styles/NotificationStyles/NotificationFailStyles";
import { NotificationSuccessText } from "./styles/NotificationStyles/NotificationSuccess";

const NotificationFail = () => {
  return (
    <NotificationFailContainer>
      <NotificationSuccessText>
        Oops... Wrong Credentials
      </NotificationSuccessText>
    </NotificationFailContainer>
  );
};

export default NotificationFail;
