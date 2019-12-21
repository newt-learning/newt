import createDataContext from "./createDataContext";
import * as Google from "expo-google-app-auth";
import firebase from "../config/firebase";
import newtApi from "../api/newtApi";
import keys from "../config/keys";
import { navigate } from "../refs/navigationRef";

// Action constants
const REQUEST_SIGN_IN = "REQUEST_SIGN_IN";
const RESOLVE_SIGN_IN = "RESOLVE_SIGN_IN";
const SET_AUTHED_USER = "SET_AUTHED_USER";
const SET_ERROR = "SET_ERROR";
const CLEAR_ERROR = "CLEAR_ERROR";

const authReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_SIGN_IN:
      return { ...state, isFetching: true };
    case RESOLVE_SIGN_IN:
      return { ...state, isFetching: false };
    case SET_AUTHED_USER:
      return {
        ...state,
        isFetching: false,
        userInfo: action.payload,
        exists: true,
        errorMessage: ""
      };
    case SET_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

// Actions
const requestSignIn = () => {
  return { type: REQUEST_SIGN_IN };
};
const resolveSignIn = () => {
  return { type: RESOLVE_SIGN_IN };
};
const setAuthedUser = payload => {
  return { type: SET_AUTHED_USER, payload };
};
const setError = payload => {
  return { type: SET_ERROR, payload };
};

// Authenticate with Google through a popup
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

      // Sign in with credential through Firebase
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

          // Navigate to Home screen
          navigate("Home");
        })
        .catch(error => {
          dispatch(resolveSignIn());
          dispatch(setError("There was an error while signing in."));
        });
    } else {
      dispatch(resolveSignIn());
      dispatch(setError("There was an error while signing in."));
    }
  } catch (error) {
    dispatch(resolveSignIn());
    dispatch(setError("There was an error while signing in."));
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { authenticateWithGoogle },
  { isFetching: false, exists: false, userInfo: null, errorMessage: "" }
);
