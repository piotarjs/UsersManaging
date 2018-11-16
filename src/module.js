import typeToReducer from 'type-to-reducer';
//import axios from 'axios';
//import { takeEvery, put, call } from 'redux-saga/effects';
//import * as firebase from "firebase";
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';


const PENDING = 'PENDING';
const REJECTED = 'REJECTED';
const FULFILLED = 'FULFILLED';
const ADD = 'ADD';


// -------Dodawanie użytkownika do bazy-------

const baseInitialState = {
  items: {},
  isUploading: false,
  isError: false
}

export const addPending = () => ({
  type: `${ADD}_${PENDING}`
});

export const addSuccess = (user, {firstName, secondName}) => {
  if(firstName && secondName){
    user.push({
      firstName,
      secondName,
      key: Date.now()
    });
  }
  user.on("value", (data) => data.val());
  return{
    type: `${ADD}_${FULFILLED}`
  };
}

export const addError = (error) => ({
  type: `${ADD}_${REJECTED}`,
  error
});


export const  addUserToFirebase = (userData) => async(dispatch, getState, prepareFirebase) => {
  dispatch(addPending());
  try{
    const resolve = await prepareFirebase;
    dispatch(addSuccess(resolve, userData))
  } catch(error){     
    dispatch(addError(error));
  };
};

const firebaseReducer = typeToReducer({
  [ADD]: {
    PENDING: (state) => ({
      ...state,
      isUploading: true,
      isError: false
    }),
    FULFILLED: (state) => {
      return{
        ...state,
        isUploading: false,
        isError: false
      };
    },
    REJECTED: (state, {error}) => ({
      ...state,
      error,
      isUploading: false,
      isError: true
    }), 
  },
}, baseInitialState);

// -------------------------------------------

const rootReducer = combineReducers({
  form: formReducer,
  firebase: firebaseReducer
});

export default rootReducer;