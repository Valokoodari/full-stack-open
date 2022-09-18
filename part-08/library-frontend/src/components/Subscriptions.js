import { useSubscription } from "@apollo/client";
import { BOOK_ADDED, ALL_BOOKS } from "../queries";

const Subscriptions = ({ client }) => {
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: async ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`New book added: ${addedBook.title}`);

      client.cache.updateQuery({ query: ALL_BOOKS }, (data) => {
        if (!data) {
          return null;
        }
        const updatedData = { ...data };
        updatedData.allBooks = [...data.allBooks, addedBook];
        return updatedData;
      });
    },
  });

  return null;
};

export default Subscriptions;
