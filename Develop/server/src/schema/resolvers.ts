import type IUserContext from '../interfaces/UserContext.js';
// Ensure the correct path to the UserDocument interface
import type IUserDocument from '../interfaces/UserDocuments.js';
// import type IBookInput from '../interfaces/BookInput.js';
import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../services/auth.js';
import bcrypt from 'bcrypt';
import { Post } from '../models/Post.js';

import type { IResolvers } from '@graphql-tools/utils';

const resolvers: IResolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: IUserContext): Promise<IUserDocument | null> => {
      
      if (context.user) {

        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('User not authenticated');
    },
  },
  Mutation: {
    addUser: async (_parent: any, { username, email, password }: { username: string; email: string; password: string }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });
      const token = signToken(user.username, user.email, user._id);
            
      return { token, user };
    },
    login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; user: IUserDocument }> => {
      const user = await User.findOne({ email });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    saveBook: async (_parent: any, { authors, description, bookId, image, link, title }: { authors: [String], description: String, bookId: String, image: String, link: String, title: String}, context: IUserContext): Promise<IUserDocument | null> => {
      
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: {authors, description, bookId, image, link, title} } },
          { new: true }
        );

        return updatedUser ? updatedUser.toObject() : null;
      }

      throw new AuthenticationError('User not authenticated');
    },
    removeBook: async (_parent: any, { bookId }: { bookId: string }, context: IUserContext): Promise<IUserDocument | null> => {
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
  addComment: async (_parent: any, { postId, commentText }: { postId: string; commentText: string }, context: IUserContext) => {
    if (!context.user) {
      throw new AuthenticationError('You need to be logged in!');
    }
  
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: { commentText, username: context.user.username } } },
      { new: true, runValidators: true }
    );
  
    if (!updatedPost) {
      throw new Error('Post not found');
    }
  
    return updatedPost; // Return the updated post
  }
  }
};
export default resolvers;