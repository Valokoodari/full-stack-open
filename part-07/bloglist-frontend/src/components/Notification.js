import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  return notification ? (
    <div id="notification-box" className={notification.type}>
      <b>{notification.message}</b>
    </div>
  ) : null;
};

export default Notification;
