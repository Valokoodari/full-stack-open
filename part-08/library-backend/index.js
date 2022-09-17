const mongoose = require("mongoose");
const { ApolloServer, gql, UserInputError } = require("apollo-server");
const Author = require("./models/author");
const Book = require("./models/book");

const MONGODB_URI = "mongodb://localhost/library";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((error) => console.log("error connecting to MongoDB:", error.message));

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

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
  },
  Mutation: {
    addBook: async (_, args) => {
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

      return book.populate("author");
    },
    editAuthor: async (_, args) => {
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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
