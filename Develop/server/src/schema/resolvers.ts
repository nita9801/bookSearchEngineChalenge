import User from '../models/User.js';
import { signToken } from '../services/auth.js';
import { Document } from 'mongoose';
import { AuthenticationError } from 'apollo-server-express';

interface Context {
    user?: { _id: string };
}

interface BookData {
    bookId: string;
    title: string;
    authors: string[];
    description?: string;
    image?: string;
    link?: string;
}

interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    savedBooks: BookData[];
    isCorrectPassword(password: string): Promise<boolean>;
}

interface LoginArgs {
    email: string;
    password: string;
}

interface AddUserArgs {
    username: string;
    email: string;
    password: string;
}

interface SaveBookArgs {
    bookData: BookData;
}

interface RemoveBookArgs {
    bookId: string;
}

const resolvers: {
  Query: {
    me: (_parent: unknown, _args: unknown, context: Context) => Promise<UserDocument | null>;
  };
  Mutation: {
    login: (_parent: unknown, args: LoginArgs) => Promise<{ token: string; user: UserDocument }>;
    addUser: (_parent: unknown, args: AddUserArgs) => Promise<{ token: string; user: UserDocument }>;
    saveBook: (_parent: unknown, args: SaveBookArgs, context: Context) => Promise<UserDocument | null>;
    removeBook: (_parent: unknown, args: RemoveBookArgs, context: Context) => Promise<UserDocument | null>;
  };
} = {
  Query: {
    me: async (_parent: unknown, _args: unknown, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('User not authenticated');
      }
    
      try {
        const user = await User.findById(context.user._id);
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (err) {
        console.error('Error in me resolver:', err);
        throw new Error('Failed to fetch user data');
      }
              console.log('User in context:', context.user);
      }
    },

  Mutation: {
    login: async (_parent: unknown, { email, password }: LoginArgs) => {
      const user = await User.findOne({ $or: [{ email }, { username: email }] }) as UserDocument | null;
      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error('Wrong password!');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    addUser: async (_parent: unknown, { username, email, password }: AddUserArgs) => {
      try {
        const user = await User.create({ username, email, password }) as UserDocument;
        const token = signToken(user.username, user.email, user._id);
        return { token, user };
      } catch (err: any) {
        if (err.code === 11000) {
          throw new Error('Username or email already exists');
        }
        throw new Error('Something went wrong');
      }
    },
    saveBook: async (_parent: unknown, { bookData }: SaveBookArgs, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
    
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedBooks: bookData } },
        { new: true, runValidators: true }
      );
    
      return updatedUser;
    },
    removeBook: async (_parent: unknown, { bookId }: RemoveBookArgs, context: Context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
    
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
    
      return updatedUser;
    }
  }
};
export default resolvers;