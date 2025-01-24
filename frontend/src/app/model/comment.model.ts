export interface CommentDetails {
  _id: string,
  author: {
    _id: string,
    username: string
  },
  comment: string,
  timestamp: number,
  replies: CommentDetails[]
}
