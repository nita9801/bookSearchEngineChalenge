// 
import type Context from '../interfaces/UserContext.js';
import type userInfo from '../interfaces/UserDocuments.js';
// import type bookData from '../interfaces/BookInput.js';
import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../services/auth.js';

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: Context): Promise<userInfo | null> => {
      
      if (context.user) {

        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('User not authenticated');
    },
  },
  Mutation: {
    addUser: async (_parent: any, args: any): Promise<{ token: string; user: userInfo }> => {
      const user = await User.create(args);
      const token = signToken(user.username, user.email, user._id);
            
      return { token, user };
    },
    login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; user: userInfo }> => {
      const user = await User.findOne({ email });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    saveBook: async (_parent: any, { authors, description, bookId, image, link, title }: { authors: [String], description: String, bookId: String, image: String, link: String, title: String}, context: Context): Promise<userInfo | null> => {
      
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: {authors, description, bookId, image, link, title} } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('User not authenticated');
    },
    removeBook: async (_parent: any, { bookId }: { bookId: string }, context: Context): Promise<userInfo | null> => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('User not authenticated');
    },
  },
};

export default resolvers;