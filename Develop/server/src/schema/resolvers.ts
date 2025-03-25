import User from '../models/User.js';
import { signToken } from '../services/auth.js';

const resolvers = {
  Query: {
    me: async (_parent, _args, context) => {
      if (!context.token) throw new Error('Not authenticated');
      const user = await User.findById(context.user._id);
      return user;
    },
  },
  Mutation: {
    login: async (_parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User not found');
      const isValid = await user.isCorrectPassword(password);
      if (!isValid) throw new Error('Invalid credentials');
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    addUser: async (_parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    saveBook: async (_parent, { bookData }, context) => {
      if (!context.token) throw new Error('Not authenticated');
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedBooks: bookData } },
        { new: true }
      );
      return user;
    },
    removeBook: async (_parent, { bookId }, context) => {
      if (!context.token) throw new Error('Not authenticated');
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      return user;
    },
  },
};

export default resolvers;