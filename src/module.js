import typeToReducer from 'type-to-reducer';
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';


const PENDING = 'PENDING';
const REJECTED = 'REJECTED';
const FULFILLED = 'FULFILLED';
const ADD = 'ADD';
const GET = 'GET;'


// -------Dodawanie użytkownika do bazy-------

const baseInitialState = {
  items: {},
  isUploading: false,
  isLoading: false,
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

// -------------------------------------------

// ------- Pobranie listy użytkowników z bazy -------

export const getPending = () => ({
  type: `${GET}_${PENDING}`
});

export const getSuccess = (users) => {
  let items = {};
  users.on('value', data => items = data.val());
  return{
    type: `${GET}_${FULFILLED}`,
    items
  };
};

export const getError = (error) => ({
  type: `${GET}_${REJECTED}`,
  error
});



export const  getUserFromFirebase = () => async(dispatch, getState, prepareFirebase) => {
  dispatch(getPending());
  try{
    const resolve = await prepareFirebase;
    dispatch(getSuccess(resolve));
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
  [GET]: {
    PENDING: (state) => ({
      ...state,
      isLoading: true,
      isError: false
    }),
    FULFILLED: (state, {items}) => {
      return{
        ...state,
        items,
        isLoading: false,
        isError: false
      };
    },
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