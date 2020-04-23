import createDataContext from "./createDataContext";
import * as Google from "expo-google-app-auth";
import firebase from "../config/firebase";
import newtApi from "../api/newtApi";
import keys from "../config/keys";

// Action constants
const REQUEST_SIGN_IN = "REQUEST_SIGN_IN";
const RESOLVE_SIGN_IN = "RESOLVE_SIGN_IN";
const SET_AUTHED_USER = "SET_AUTHED_USER";
const REMOVE_AUTHED_USER = "REMOVE_AUTHED_USER";
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
        errorMessage: "",
      };
    case REMOVE_AUTHED_USER:
      return {
        ...state,
        isFetching: false,
        userInfo: null,
        exists: false,
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
const setAuthedUser = (payload) => {
  return { type: SET_AUTHED_USER, payload };
};
const removeAuthedUser = () => {
  return { type: REMOVE_AUTHED_USER };
};
const setError = (payload) => {
  return { type: SET_ERROR, payload };
};

// Authenticate with Google through a popup
const authenticateWithGoogle = (dispatch) => async () => {
  try {
    // Request sign in (begin async sign in process)
    dispatch(requestSignIn());

    const result = await Google.logInAsync({
      iosClientId: keys.googleIosClientId,
      androidClientId: keys.googleAndroidClientId,
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
        .then(async (res) => {
          const { user } = res;

          // Take only currently necessary info from user object
          const userInfo = {
            _id: user.uid,
            displayName: user.displayName,
            email: user.email,
          };

          // Request to create user if doesn't exist, or send back existing user
          // from Mongo DB
          const dbRes = await newtApi.post("/user/create", userInfo);

          // Set user info to state
          dispatch(setAuthedUser(dbRes.data));
        })
        .catch((error) => {
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

// Function to check if the user is already signed in on the device.
const tryLocalSignIn = (dispatch) => async () => {
  await firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(requestSignIn());

      // Get user info from db
      newtApi
        .get(`/user/${user.uid}`)
        .then((res) => dispatch(setAuthedUser(res.data)))
        .catch((error) => {
          dispatch(resolveSignIn());
        });
    } else {
      dispatch(removeAuthedUser());
    }
  });
};

const signOut = (dispatch) => async () => {
  await firebase.auth().signOut();
  dispatch(removeAuthedUser());
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { authenticateWithGoogle, signOut, tryLocalSignIn },
  { isFetching: true, exists: false, userInfo: null, errorMessage: "" }
);
