import { useSubscription } from "@apollo/client";
import { BOOK_ADDED, ALL_BOOKS } from "../queries";

const Notifications = ({ client }) => {
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`New book added: ${addedBook.title}`);

      const dataInStore = client.readQuery({ query: ALL_BOOKS });
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...dataInStore,
          allBooks: [...dataInStore.allBooks, addedBook],
        },
      });
    },
  });

  return null;
};

export default Notifications;
