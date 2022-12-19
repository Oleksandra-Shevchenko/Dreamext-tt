import {Posts} from '../types/posts';
import {fetchWithFS} from './file_fetch';

export const baseUrl = 'https://jsonplaceholder.typicode.com';
const posts = `${baseUrl}/posts`;
const postsPath = 'posts.json';

export const getAllPosts = async (): Promise<Posts[]> => {
  return fetchWithFS(posts, postsPath);
};
