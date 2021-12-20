import {
  NotificationSuccessContainer,
  NotificationSuccessText,
} from "./styles/NotificationStyles/NotificationSuccess";

const NotificationSuccess = () => {
  return (
    <NotificationSuccessContainer>
      <NotificationSuccessText>
        Your post was uploaded, refresh the page please.
      </NotificationSuccessText>
    </NotificationSuccessContainer>
  );
};

export default NotificationSuccess;
