import createDataContext from "./createDataContext";
import * as Google from "expo-google-app-auth";
import firebase from "../config/firebase";
import newtApi from "../api/newtApi";
import keys from "../config/keys";

// Action constants
const REQUEST_SIGN_IN = "REQUEST_SIGN_IN";
const SET_AUTHED_USER = "SET_AUTHED_USER";

const authReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_SIGN_IN:
      return { ...state, isFetching: true };
    case SET_AUTHED_USER:
      return {
        ...state,
        isFetching: false,
        userInfo: action.payload,
        exists: true,
        errorMessage: ""
      };
    default:
      return state;
  }
};

// Actions
const requestSignIn = () => {
  return { type: REQUEST_SIGN_IN };
};

const setAuthedUser = payload => {
  return { type: SET_AUTHED_USER, payload };
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
        .then(async res => {
          // Request sign in (begin async sign in process)
          dispatch(requestSignIn());

          const { user } = res;

          // Take only currently necessary info from user object
          const userInfo = {
            _id: user.uid,
            displayName: user.displayName,
            email: user.email
          };

          // Request to create user if doesn't exist, or send back existing user
          // from Mongo DB
          const dbRes = await newtApi.post("/user/create", userInfo);

          // Set user info to state
          dispatch(setAuthedUser(dbRes.data));
        })
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
