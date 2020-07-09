import newtApi from "./newtApi";
import { useMutation } from "react-query";

// API calls
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
export function useCreatePersonalQuiz() {
  return useMutation(createPersonalQuiz);
}
