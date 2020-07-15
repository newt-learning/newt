import newtApi from "./newtApi";
import { useMutation, useQuery, queryCache } from "react-query";
import displayErrorAlert from "../components/shared/displayErrorAlert";

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
    displayErrorAlert("Sorry, there was an error while creating your quiz");
  }
};
const updatePersonalQuiz = async ({ quizId, data }) => {
  try {
    const res = await newtApi.put(`/quizzes/${quizId}/update`, data);
    return res.data;
  } catch (error) {
    displayErrorAlert(
      "Sorry, there was an error while updating your Reading Challenge"
    );
  }
};

// React-query bindings
export function useFetchQuiz(quizId) {
  return useQuery(["quiz", quizId], fetchQuiz);
}
export function useCreatePersonalQuiz() {
  return useMutation(createPersonalQuiz);
}
export function useUpdatePersonalQuiz() {
  return useMutation(updatePersonalQuiz, {
    onSettled: () => queryCache.refetchQueries("quiz"),
  });
}
