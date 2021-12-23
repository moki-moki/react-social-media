import { NotificationFailContainer } from "./styles/NotificationStyles/NotificationFailStyles";
import { NotificationSuccessText } from "./styles/NotificationStyles/NotificationSuccess";

const NotificationFail = () => {
  return (
    <NotificationFailContainer>
      <NotificationSuccessText>
        Oops... Something went wrong.
      </NotificationSuccessText>
    </NotificationFailContainer>
  );
};

export default NotificationFail;
