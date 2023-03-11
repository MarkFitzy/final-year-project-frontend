import {ImagePost} from "./imagePost.model";
export class Comment {
  id: number;
  text: string;
  imagePost: { url: string; alt: string; postId: number; };
};

const newComment: Comment = {
  id: 0,
  text: '',
  imagePost: { url: '', alt: '', postId: 0 }
};