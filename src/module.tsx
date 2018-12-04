import { connectRouter, push } from 'connected-react-router';
import { History } from 'history';
import { Action, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import typeToReducer from 'type-to-reducer';
import { ExtraArgument, UsersList } from './interfaces';


// ---------------- Interfejsy i typy ----------------

export interface State {
  firebase: {
    isError: false,
    isLoading: false,
    isUploading: false,
    users: UsersList['users']
  }
};

interface AddUserToFirebase { firstName: string, secondName: string, uploadFile: any };

type FirebaseReducer = State['firebase'];

// ---------------------------------------------------

// ----------------- Definicja akcji -----------------

const PENDING = 'PENDING';
const REJECTED = 'REJECTED';
const FULFILLED = 'FULFILLED';
const ADD = 'ADD';
const GET = 'GET';

// ---------------------------------------------------

// --------------- Inicjalizacja stanu ---------------

const baseInitialState = {
  isError: false,
  isLoading: false,
  isUploading: false,
  users: {}
};

// ----------------------------------------------------

// ----------- Dodawanie użytkownika do bazy -----------

export const addPending = () => ({
  type: `${ADD}_${PENDING}`
});

export const addSuccess = (users: FirebaseReducer['users']) => ({
  type: `${ADD}_${FULFILLED}`,
  users
});

export const addError = (error: Error) => ({
  error: error.message,
  type: `${ADD}_${REJECTED}`
});

export const addUserToFirebase = ({ firstName, secondName, uploadFile }: AddUserToFirebase): ThunkAction<void, State, ExtraArgument, Action> =>
  async (dispatch, getState, { base, storage }) => {
    dispatch(addPending());
    const usersRef = await base.ref('users');
    const pictureRef = await storage.ref('personalPicture');
    const key = Date.now();
    try {
      pictureRef.child(`${key}`).put(uploadFile[0]).then((snapshot) => {
        pictureRef.child(snapshot.metadata.name).getDownloadURL().then((url: string) => {
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
    } catch (error) {
      dispatch(addError(error));
    };
  };

// ---------------------------------------------------

// ------- Pobranie listy użytkowników z bazy -------

export const getPending = () => ({
  type: `${GET}_${PENDING}`
});

export const getSuccess = (users: FirebaseReducer['users']) => ({
  type: `${GET}_${FULFILLED}`,
  users
});

export const getError = (error: Error) => ({
  error: error.message,
  type: `${GET}_${REJECTED}`,
});

export const getUserFromFirebase = (): ThunkAction<void, State, ExtraArgument, Action> => async (dispatch, getState, { base }) => {
  dispatch(getPending());
  try {
    const users = await base.ref('users').once('value');
    dispatch(getSuccess(users.val()));
  } catch (error) {
    dispatch(getError(error));
  };
};

// --------------------------------------------------

// -------------------- Routing --------------------

export const redirect = (url: string): ThunkAction<void, State, ExtraArgument, Action> => (dispatch) => {
  try {
    dispatch(push(url));
  } catch (error) {
    dispatch(getError(error))
  };
}

// -------------------------------------------------

const firebaseReducer = typeToReducer({
  [ADD]: {
    FULFILLED: (state: FirebaseReducer, { users }: FirebaseReducer) => ({
      ...state,
      isError: false,
      isUploading: false,
      users
    }),
    PENDING: (state: FirebaseReducer) => ({
      ...state,
      isError: false,
      isUploading: true
    }),
    REJECTED: (state: FirebaseReducer, { error }: { error: string }) => ({
      ...state,
      error,
      isError: true,
      isUploading: false
    }),
  },
  [GET]: {
    FULFILLED: (state: FirebaseReducer, { users }: FirebaseReducer) => ({
      ...state,
      isError: false,
      isLoading: false,
      users
    }),
    PENDING: (state: FirebaseReducer) => ({
      ...state,
      isError: false,
      isLoading: true
    }),
    REJECTED: (state: FirebaseReducer, { error }: { error: string }) => ({
      ...state,
      error,
      isError: true,
      isLoading: false
    }),
  },
}, baseInitialState);

export default (history: History) => combineReducers({
  firebase: firebaseReducer,
  form: formReducer,
  router: connectRouter(history)
});
