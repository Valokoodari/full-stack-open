import { useSubscription } from "@apollo/client";
import { BOOK_ADDED } from "../queries";

const Notifications = () => {
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`New book added: ${subscriptionData.data.bookAdded.title}`);
    },
  });

  return null;
};

export default Notifications;
