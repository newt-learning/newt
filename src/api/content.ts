import newtApi from "./newtApi";
import { useQuery, useMutation, queryCache } from "react-query";

interface UpdateContentParams {
  contentId: string;
  data: any
}
interface UpdateBookProgressData {
  contentId: string;
  data: { pagesRead: number };
}

// API calls
const fetchAllContent = async () => {
  const { data } = await newtApi.get("/v2/content");
  return data;
};
const fetchContent = async (queryKey: any, contentId: string) => {
  const { data } = await newtApi.get(`/content/${contentId}`)
  return data
}
const fetchAllSeries = async () => {
  const { data } = await newtApi.get("/series");
  return data;
};
const addContent = async (data: any) => {
  await newtApi.post("/v2/content/create", data);
};
const createSeries = async (data: any) => {
  await newtApi.post("/series/create", data);
};
const updateContent = async ({ contentId, data }: UpdateContentParams) => {
  await newtApi.put(`/content/${contentId}/update`, data)
}
const updateBookProgress = async ({
  contentId,
  data,
}: UpdateBookProgressData) => {
  await newtApi.put(`/content/${contentId}/book-progress`, data);
};
const deleteContent = async (contentId: string) => {
  await newtApi.delete(`/content/${contentId}`)
}

// React-query bindings
export function useFetchAllContent() {
  return useQuery("contents", fetchAllContent);
}
export function useFetchContent(contentId: string) {
  return useQuery(["content", contentId], fetchContent)
}
export function useFetchAllSeries() {
  return useQuery("series", fetchAllSeries);
}
export function useCreateContent() {
  return useMutation(addContent, {
    onSettled: () => queryCache.refetchQueries("contents"),
  });
}
export function useCreateSeries() {
  return useMutation(createSeries, {
    onSettled: () => queryCache.refetchQueries("series"),
  });
}
export function useUpdateContent() {
  return useMutation(updateContent, {
    onSettled: () => queryCache.refetchQueries("contents")
  })
}
export function useUpdateBookProgress() {
  return useMutation(updateBookProgress, {
    onSettled: () => queryCache.refetchQueries("contents"),
  });
}
export function useDeleteContent() {
  return useMutation(deleteContent, {
    onSettled: () => queryCache.refetchQueries('contents')
  })
}
