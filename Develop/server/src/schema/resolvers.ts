import User from '../models/User.js';
import { signToken } from '../services/auth.js';

const resolvers = {
  Query: {
    me: async (_parent: unknown, _args: any, context: any) => {
      if (!context.token) throw new Error('Not authenticated');
      const user = await User.findById(context.user._id);
      return user;
    },
  },
  Mutation: {
    login: async (_parent: unknown, { email, password }: { email: string; password: string }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User not found');
      const isValid = await user.isCorrectPassword(password);
      if (!isValid) throw new Error('Invalid credentials');
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    addUser: async (_parent: unknown,  { username, email, password }: { username: string; email: string; password: string }
    ) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    saveBook: async (_parent: unknown,{ bookData }: { bookData: { bookId: string; authors?: string[]; description?: string; title: string; image?: string; link?: string } },
      context: any
    ) => {
      if (!context.token) throw new Error('Not authenticated');
      const user = await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedBooks: bookData } },
        { new: true }
      );
      return user;
    },
    removeBook: async (_parent: unknown,  { bookId }: { bookId: string },
      context: any
    ) => {
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