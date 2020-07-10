import newtApi from "./newtApi";
import { useMutation, useQuery } from "react-query";

// API calls
const fetchQuiz = async (queryKey, quizId) => {
  const { data } = await newtApi.get(`/quizzes/${quizId}`);
  return data;
};
const createPersonalQuiz = async (data) => {
  try {
    const { data: personalQuizData } = await newtApi.post(
      "/quizzes/create",
      data
    );
    return personalQuizData;
  } catch (error) {
    console.log(error);
  }
};

// React-query bindings
export function useFetchQuiz(quizId) {
  return useQuery(["quiz", quizId], fetchQuiz);
}
export function useCreatePersonalQuiz() {
  return useMutation(createPersonalQuiz);
}