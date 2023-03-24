export interface Comment {
  id?: number;
  commentText: string;
  post: {
    postId: number;
  };
}