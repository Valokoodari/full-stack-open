import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }

  const type = notification.type === "error" ? "danger" : notification.type;

  return (
    <Alert className="m-3" variant={type}>
      {notification.message}
    </Alert>
  );
};

export default Notification;
