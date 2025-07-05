import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";

export type Posts = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    nickname: string;
};

interface LPResponse {
    result: Posts[];
    cursor: string;
    pageSize: number;
}

export const useInfiniteLPs = (order: "asc" | "desc") => {
  return useInfiniteQuery<
    LPResponse,
    Error,
    LPResponse,
    ["infiniteLPs", "asc" | "desc"],
    number
  >({
    queryKey: ["infiniteLPs", order],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      await new Promise((res) => setTimeout(res, 500));
      const res = await axiosInstance.get<{ data: LPResponse }>(`/v1/lps`, {
        params: {
          cursor: pageParam,
          order,
        },
      });
      return res.data.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};