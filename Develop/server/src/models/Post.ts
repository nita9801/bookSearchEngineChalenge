import mongoose, { Schema, Document } from 'mongoose';

export interface PostDocument extends Document {
  title: string;
  content: string;
  comments: { commentText: string; username: string }[];
}

const PostSchema = new Schema<PostDocument>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  comments: [
    {
      commentText: { type: String, required: true },
      username: { type: String, required: true },
    },
  ],
});

export const Post = mongoose.model<PostDocument>('Post', PostSchema);