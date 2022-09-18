const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const { UserInputError, AuthenticationError } = require("apollo-server-errors");
const Author = require("../models/author");
const Book = require("../models/book");
const User = require("../models/user");
const config = require("./config");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_, { author, genre }) => {
      if (author && genre) {
        const author_id = (await Author.findOne({ name: author }))._id;
        return Book.find({
          author: author_id,
          genres: { $in: [genre] },
        }).populate("author");
      } else if (author) {
        const author_id = (await Author.findOne({ name: author }))._id;
        return Book.find({ author: author_id }).populate("author");
      } else if (genre) {
        return Book.find({ genres: { $in: [genre] } }).populate("author");
      } else {
        return Book.find({}).populate("author");
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      return authors.map(async (author) => ({
        name: author.name,
        born: author.born,
        bookCount: await Book.find({ author: author._id }).countDocuments(),
      }));
    },
    me: async (_, __, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (_, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const book = new Book({ ...args });
      const authorExists = await Author.findOne({ name: args.author });
      if (!authorExists) {
        const newAuthor = new Author({ name: args.author });
        try {
          await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
        book.author = newAuthor._id;
      } else {
        book.author = authorExists._id;
      }

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      const populatedBook = book.populate("author");

      pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook });

      return populatedBook;
    },
    editAuthor: async (_, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const author = await Author.findOne({ ...args });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;

      try {
        return author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    createUser: async (_, args) => {
      const user = new User({ ...args });

      try {
        return user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, config.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
