import { connectRouter, push } from 'connected-react-router';
import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import typeToReducer from 'type-to-reducer';
import { Thunk, UsersList } from './interfaces';

const PENDING = 'PENDING';
const REJECTED = 'REJECTED';
const FULFILLED = 'FULFILLED';
const ADD = 'ADD';
const GET = 'GET';

interface State{
  isError: false,
  isLoading: false,
  isUploading: false,
  users: UsersList
}

const baseInitialState = {
  isError: false,
  isLoading: false,
  isUploading: false,
  users: {} 
};

// -------Dodawanie użytkownika do bazy-------

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

export const  addUserToFirebase = ({firstName, secondName, uploadFile}
  :
  {firstName:string, secondName: string, uploadFile: {}}): Thunk => 
  async(dispatch, getState, {base, storage}) => {
  dispatch(addPending());
  const usersRef = await base.ref('users');
  const pictureRef = await storage.ref('personalPicture');
  const key = Date.now();
  try{
    pictureRef.child(`${key}`).put(uploadFile[0]).then((snapshot) => {
      pictureRef.child(snapshot.metadata.name).getDownloadURL().then((url:string) => {
        usersRef.child(`${key}`).set({
          firstName,
          key,
          secondName,
          url
        })
      })
    });
    usersRef.on('value', (data) => {
      if (data) {
        dispatch(addSuccess(data.val()))
      }
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



export const  getUserFromFirebase = (): Thunk => async(dispatch, getState, { base }) => {
  dispatch(getPending());
  try {
    const users = await base.ref('users').once('value');
    dispatch(getSuccess(users.val()));
  } catch(error){     
    dispatch(getError(error));
  };
};

// --------------------------------------------------

// -------------------- Routing --------------------

export const redirect = (url: string): Thunk => (dispatch) => {
  try{
    dispatch(push(url));
  }catch(error){
    dispatch(getError(error))
  };
}

// -------------------------------------------------

const firebaseReducer = typeToReducer({
  [ADD]: {
    FULFILLED: (state: State, {users}:{users: UsersList}) => ({
      ...state,
      isError: false,
      isUploading: false,
      users
    }),
    PENDING: (state: State) => ({
      ...state,
      isError: false,
      isUploading: true
    }),
    REJECTED: (state: State, {error}:{error:string}) => ({
      ...state,
      error,
      isError: true,
      isUploading: false
    }), 
  },
  [GET]: {
    FULFILLED: (state: State, {users}:{users: UsersList}) => ({
      ...state,
      isError: false,
      isLoading: false,
      users
    }),
    PENDING: (state: State) => ({
      ...state,
      isError: false,
      isLoading: true
    }),
    REJECTED: (state: State, {error}:{error:string}) => ({
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
