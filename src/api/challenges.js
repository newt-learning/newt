import newtApi from "./newtApi";
import { useQuery, useMutation, queryCache } from "react-query";
import displayErrorAlert from "../components/shared/displayErrorAlert";

// API calls
const fetchChallenges = async () => {
  const { data } = await newtApi.get("/challenges");
  return data;
};
const fetchIndividualChallenge = async (queryKey, challengeId) => {
  const { data } = await newtApi.get(`/challenges/${challengeId}`);
  return data;
};
const createChallenge = async (data) => {
  try {
    await newtApi.post("/challenges/create", data);
  } catch (error) {
    displayErrorAlert(
      "Sorry, there was an error while creating your Reading Challenge"
    );
  }
};
const updateChallenge = async ({ challengeId, data }) => {
  try {
    await newtApi.put(`/challenges/${challengeId}/update`, data);
  } catch (error) {
    displayErrorAlert(
      "Sorry, there was an error while updating your Reading Challenge"
    );
  }
};
const addContentToChallenge = async (contentId) => {
  return await newtApi.put("/challenges/add-content", { contentId });
};
const deleteChallenge = async (challengeId) => {
  try {
    await newtApi.delete(`/challenges/${challengeId}`);
  } catch (error) {
    displayErrorAlert(
      "Sorry, there was an error trying to delete your Reading Challenge. Try again in a bit."
    );
  }
};

// React-query bindings
function useFetchChallenges() {
  return useQuery("challenges", fetchChallenges);
}
function useFetchIndividualChallenge(challengeId) {
  return useQuery(["challenge", challengeId], fetchIndividualChallenge);
}
function useCreateChallenge() {
  return useMutation(createChallenge, {
    onSettled: () => queryCache.refetchQueries("challenges"),
  });
}
function useUpdateChallenge() {
  return useMutation(updateChallenge, {
    onSettled: () => queryCache.refetchQueries("challenge"),
  });
}
function useAddContentToChallenge() {
  return useMutation(addContentToChallenge, {
    onError: () => console.log(error),
  });
}
function useDeleteChallenge() {
  return useMutation(deleteChallenge, {
    onSettled: () => queryCache.refetchQueries("challenges"),
  });
}

export {
  useFetchChallenges,
  useFetchIndividualChallenge,
  useCreateChallenge,
  useUpdateChallenge,
  useAddContentToChallenge,
  useDeleteChallenge,
};
