import { connectRouter, push } from 'connected-react-router';
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import typeToReducer from 'type-to-reducer';
import { UsersList } from './interfaces';


const PENDING = 'PENDING';
const REJECTED = 'REJECTED';
const FULFILLED = 'FULFILLED';
const ADD = 'ADD';
const GET = 'GET';




// -------Dodawanie użytkownika do bazy-------

const baseInitialState = {
  isError: false,
  isLoading: false,
  isUploading: false,
  users: {}
};

export const addPending = () => ({
  type: `${ADD}_${PENDING}`
});

export const addSuccess = (users: UsersList) => ({
  type: `${ADD}_${FULFILLED}`,
  users
});

export const addError = (error: string) => ({
  error,
  type: `${ADD}_${REJECTED}`
});

export const  addUserToFirebase = ({firstName, secondName, uploadFile}) => async(dispatch, getState, {base, storage}) => {
  dispatch(addPending());
  const usersRef = await base.ref('users');
  const pictureRef = await storage.ref('personalPicture');
  const key = Date.now();
  try{
    pictureRef.child(`${key}`).put(uploadFile[0]).then((snapshot) => {
      pictureRef.child(snapshot.metadata.name).getDownloadURL().then((url) => {
        usersRef.child(`${key}`).set({
          firstName,
          key,
          secondName,
          url
        })
      })
    });
    usersRef.on('value', (data) => {
      dispatch(addSuccess(data.val()))
    });
  } catch(error){
    dispatch(addError(error));
  };
};

// -------------------------------------------

// ------- Pobranie listy użytkowników z bazy -------

export const getPending = () => ({
  type: `${GET}_${PENDING}`
});

export const getSuccess = (users: UsersList) => ({
  type: `${GET}_${FULFILLED}`,
  users
});

export const getError = (error: string) => ({
  error,
  type: `${GET}_${REJECTED}`,
});

export const  getUserFromFirebase = () => async(dispatch, getState, {base}) => {
  dispatch(getPending());
  try {
    const users = await base.ref('users').once('value');
    dispatch(getSuccess(users.val()));
  } catch(error){     
    dispatch(getError(error));
  };
};

// --------------------------------------------------

export const redirect = (url: string) => (dispatch) => {
  try{
    dispatch(push(url));
  }catch(error){
    dispatch(getError(error))
  };
}

const firebaseReducer = typeToReducer({
  [ADD]: {
    FULFILLED: (state, {users}) => ({
      ...state,
      isError: false,
      isUploading: false,
      users
    }),
    PENDING: (state) => ({
      ...state,
      isError: false,
      isUploading: true
    }),
    REJECTED: (state, {error}) => ({
      ...state,
      error,
      isError: true,
      isUploading: false
    }), 
  },
  [GET]: {
    FULFILLED: (state, {users}) => ({
      ...state,
      isError: false,
      isLoading: false,
      users
    }),
    PENDING: (state) => ({
      ...state,
      isError: false,
      isLoading: true
    }),
    REJECTED: (state, {error}) => ({
      ...state,
      error,
      isError: true,
      isLoading: false
    }), 
  },
}, baseInitialState);

export default (history) => combineReducers({
  firebase: firebaseReducer,
  form: formReducer,
  router: connectRouter(history)
});
