import typeToReducer from 'type-to-reducer';
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {base, storage} from './firebase';


const PENDING = 'PENDING';
const REJECTED = 'REJECTED';
const FULFILLED = 'FULFILLED';
const ADD = 'ADD';
const GET = 'GET';



// -------Dodawanie użytkownika do bazy-------

const baseInitialState = {
  users: {},
  isUploading: false,
  isLoading: false,
  isError: false
}

export const addPending = () => ({
  type: `${ADD}_${PENDING}`
});

export const addSuccess = (users) => ({
  type: `${ADD}_${FULFILLED}`,
  users
});

export const addError = (error) => ({
  type: `${ADD}_${REJECTED}`,
  error
});

export const  addUserToFirebase = ({firstName, secondName, uploadFile}) => async(dispatch) => {
  dispatch(addPending());
  const usersRef = await base.ref('users');
  const pictureRef = await storage.ref('personalPicture');
  try{
    await pictureRef.child(`${Date.now()}`).put(uploadFile[0]).then((snapshot) => {
      pictureRef.child(snapshot.metadata.name).getDownloadURL().then((url) => {
        usersRef.child(`${Date.now()}`).set({
          firstName,
          secondName,
          url: url || 'test',
          key: Date.now()
        })
      })
    });
    const users = await usersRef.once('value')
    dispatch(addSuccess(users.val()))
  } catch(error){
    dispatch(addError(error));
  };
};

// -------------------------------------------

// ------- Pobranie listy użytkowników z bazy -------

export const getPending = () => ({
  type: `${GET}_${PENDING}`
});

export const getSuccess = (users) => ({
  type: `${GET}_${FULFILLED}`,
  users
});

export const getError = (error) => ({
  type: `${GET}_${REJECTED}`,
  error
});

export const  getUserFromFirebase = () => async(dispatch) => {
  dispatch(getPending());
  try {
    const users = await base.ref('users').once('value');
    dispatch(getSuccess(users.val()));
  } catch(error){     
    dispatch(getError(error));
  };
};

// --------------------------------------------------


const firebaseReducer = typeToReducer({
  [ADD]: {
    PENDING: (state) => ({
      ...state,
      isUploading: true,
      isError: false
    }),
    FULFILLED: (state, {users}) => ({
      ...state,
      users,
      isUploading: false,
      isError: false
    }),
    REJECTED: (state, {error}) => ({
      ...state,
      error,
      isUploading: false,
      isError: true
    }), 
  },
  [GET]: {
    PENDING: (state) => ({
      ...state,
      isLoading: true,
      isError: false
    }),
    FULFILLED: (state, {users}) => ({
      ...state,
      users,
      isLoading: false,
      isError: false
    }),
    REJECTED: (state, {error}) => ({
      ...state,
      error,
      isLoading: false,
      isError: true
    }), 
  },
}, baseInitialState);

const rootReducer = combineReducers({
  form: formReducer,
  firebase: firebaseReducer
});

export default rootReducer;