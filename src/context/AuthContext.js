import createDataContext from "./createDataContext";
import * as Google from "expo-google-app-auth";
import firebase from "../config/firebase";
import keys from "../config/keys";

// Action constants
const REQUEST_SIGN_IN = "REQUEST_SIGN_IN";

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Actions
const requestSignIn = () => {
  return { type: REQUEST_SIGN_IN };
};

const authenticateWithGoogle = dispatch => async () => {
  try {
    const result = await Google.logInAsync({
      iosClientId: keys.googleIosClientId,
      androidClientId: keys.googleAndroidClientId
    });

    if (result.type === "success") {
      const credential = firebase.auth.GoogleAuthProvider.credential(
        result.idToken,
        result.accessToken
      );

      firebase
        .auth()
        .signInWithCredential(credential)
        .then(res => console.log(res))
        .catch(error => console.log(error));
    } else {
      console.log("There was an error while signing in.");
    }
  } catch (error) {
    console.log(error);
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { authenticateWithGoogle },
  { isFetching: false, exists: false, userInfo: null, errorMessage: "" }
);
