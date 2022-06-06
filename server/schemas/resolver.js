const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

// Defining the functionality for the mutations and queries and how you want them to interact with the models.
const resolvers = {
  Query: {
    // Get a single user by id
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }

      throw new AuthenticationError("No User currently logged in");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      //add user
      const newUser = await User.create(args);
      const token = signToken(newUser);

      return { token, newUser };
    },
    login: async (parent, { email, password }) => {
      //login
      const user = User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No User exists with this email");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Password Incorrect");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookData }, context) => {
      //savebook
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          {
            _id: context.user._id,
          },
          {
            $push: { savedBooks: bookData },
          },
          {
            new: true,
          }
        );
      }
      return updatedUser;
    },
    removeBook: async (parent, { bookId }, context) => {
      //removebook
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          {
            _id: context.user._id,
          },
          {
            $pull: { savedBooks: bookId },
          },
          {
            new: true,
          }
        );
        return updatedUser;
      }
    },
  },
};

module.exports = resolvers;
