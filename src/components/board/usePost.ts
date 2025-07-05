import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { serverCall } from "../utils/serverCall";

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  nickname: string;
  commentCnt: number;
}

export interface PostResponse {
  posts: Post[];
  cursor: string;
  pageSize: number;
}

export interface ApiResponse {
  result: PostResponse;
}

export interface PostDetail {
  id: number;
  nickname: string;
  writeDate: string;
  writeTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  title: string;
  content: string;
  likes: number;
}

interface PostDetailResponse {
  result: PostDetail;
}

export const usePosts = (tags: string[], size: number = 10) => {
  return useInfiniteQuery<PostResponse, Error>({
    queryKey: ["infinitePosts", tags, size],
    initialPageParam: "-1",
    queryFn: async ({ pageParam }) => {
      const cursor = typeof pageParam === 'string' ? pageParam : '-1';
      const params = new URLSearchParams();
      tags.forEach(tag => params.append('tags', tag));
      params.append('cursor', cursor);
      params.append('size', size.toString());
      const response: ApiResponse = await serverCall(
        'GET',
        `/api/posts?${params.toString()}`
      );
      return response.result;
    },
    getNextPageParam: (lastPage) => lastPage.cursor,
  });
};

export const usePostDetail = (postId: number) => {
  return useQuery<PostDetailResponse, Error>({
    queryKey: ["postDetail", postId],
    queryFn: async () => {
      const response: PostDetailResponse = await serverCall("GET", `/api/posts/${postId}`);
      return response;
    },
    enabled: !!postId,
  });
};