import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const resolvers = {
  Query: {
    me: async (_parent: unknown, _args: any, context: any) => {
      if (!context.token) throw new Error('Not authenticated');
      const user = await User.findById(context.user._id);
      return user;
    },
  },
  Mutation: {
    Mutation: {
      addUser: async (_: unknown, { username, email, password }:{ username: string; email: string; password: string }) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY!, { expiresIn: '1h' });
        return { token, user };
      },
      login: async (_: unknown, { email, password }:{ email: string; password: string }) => {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new Error('Invalid password');
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY!, { expiresIn: '1h' });
        return { token, user };
      },
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