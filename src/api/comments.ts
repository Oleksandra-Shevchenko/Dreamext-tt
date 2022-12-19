import {baseUrl} from './posts';
import {Comments} from '../types/comments';

const comments = `${baseUrl}/comments`;

export const getAllComments = async (postId: number): Promise<Comments[]> => {
  const response = await fetch(`${comments}?postId=${postId}`);
  return response.json();
};
