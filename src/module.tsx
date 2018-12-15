import { connectRouter, push } from 'connected-react-router';
import { History } from 'history';
import { Action, combineReducers } from 'redux';
import { reducer as formReducer, reset } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import typeToReducer from 'type-to-reducer';
import { ExtraArgument, UserDetails, UsersList } from './interfaces';


// ---------------- Interfejsy i typy ----------------

export interface State {
  firebase: {
    inputFileKey: string,
    isEdited: string,
    isError: false,
    isLoading: false,
    isUploading: false,
    toDelete: string,
    toEdit: string,
    user: UserDetails['user'],
    users: UsersList['users']
  }
};

interface AddUserToFirebase { firstName: string, key: string, secondName: string, uploadFile: string[] };

type FirebaseReducer = State['firebase'];

type Thunk = ThunkAction<void, State, ExtraArgument, Action>;

// ---------------------------------------------------

// ----------------- Definicja akcji -----------------

const PENDING = 'PENDING';
const REJECTED = 'REJECTED';
const FULFILLED = 'FULFILLED';
const CREATE = 'CREATE';
const RETRIEVE = 'RETRIEVE';
const DELETE = 'DELETE';
const EDIT = 'EDIT';
const UPDATE = 'UPDATE';
const DETAILS = 'DETAILS';
const DELETE_HOVER = 'DELETE_HOVER';
const EDIT_HOVER = 'EDIT_HOVER';
const CHANGE_KEY = 'CHANGE_KEY';

// ---------------------------------------------------

// --------------- Inicjalizacja stanu ---------------

const baseInitialState = {
  inputFileKey: Date.now().toString(),
  isEdited: '',
  isError: false,
  isLoading: false,
  isUploading: false,
  toDelete: '',
  toEdit: '',
  user: {},
  users: {},
};

// ----------------------------------------------------

// --- Wstawianie pliku do Storage Firebase oraz zapis rekordu do Database Firebase ---

const addUser = (
  { firstName, key, secondName, uploadFile }: AddUserToFirebase, 
  usersRef: firebase.database.Reference, 
  pictureRef: firebase.storage.Reference
  ) => {
  if (key === undefined) {
    key = Date.now().toString();
  }
  pictureRef.child(key).put(uploadFile[0]).then((snapshot) => {
    pictureRef.child(snapshot.metadata.name).getDownloadURL().then((url: string) => {
      usersRef.child(key).set({
        firstName,
        key,
        secondName,
        url
      })
    })
  });
}

// ------------------------------------------------------------------------------------

// ----------- Dodawanie użytkownika do bazy -----------

export const addPending = () => ({
  type: `${CREATE}_${PENDING}`
});

export const addSuccess = (users: FirebaseReducer['users']) => ({
  type: `${CREATE}_${FULFILLED}`,
  users
});

export const addError = (error: Error) => ({
  error: error.message,
  type: `${CREATE}_${REJECTED}`
});

export const addUserToFirebase = (user: AddUserToFirebase): Thunk =>
  async (dispatch, getState, { base, storage }) => {
    dispatch(addPending());
    const usersRef = base.ref('users');
    const pictureRef = storage.ref('personalPicture');
    try {
      await addUser(user, usersRef, pictureRef);
      usersRef.on('value', (data) => {
        if (data) {
          dispatch(addSuccess(data.val()))
        }
      });
      dispatch(reset('List'));
    } catch (error) {
      dispatch(addError(error));
    };
  };

// ---------------------------------------------------

// ----------- Usunięcie użytkownika z bazy -----------

export const deleteSuccess = (users: FirebaseReducer['users']) => ({
  type: `${DELETE}_${FULFILLED}`,
  users
});

export const deleteError = (error: Error) => ({
  error: error.message,
  type: `${DELETE}_${REJECTED}`
});

export const deleteUserFromFirebase = (key: string): Thunk =>
  (dispatch, getState, { base, storage }) => {
    const usersRef = base.ref('users');
    const pictureRef = storage.ref('personalPicture');
    try {
      usersRef.child(`${key}`).remove().then(
        () => pictureRef.child(`${key}`).delete().then(
          () => usersRef.on('value', (data) => {
            if (data) {
              dispatch(deleteSuccess(data.val()))
            }
          })
        ).then(() => dispatch(push('/')))
      );
    } catch (error) {
      dispatch(deleteError(error));
    };
  };

// ---------------------------------------------------

// ------- Pobranie listy użytkowników z bazy -------

export const getPending = () => ({
  type: `${RETRIEVE}_${PENDING}`
});

export const getSuccess = (users: FirebaseReducer['users']) => ({
  type: `${RETRIEVE}_${FULFILLED}`,
  users
});

export const getError = (error: Error) => ({
  error: error.message,
  type: `${RETRIEVE}_${REJECTED}`,
});

export const getUserFromFirebase = (): Thunk => async (dispatch, getState, { base }) => {
  dispatch(getPending());
  try {
    const users = await base.ref('users').once('value');
    dispatch(getSuccess(users.val()));
  } catch (error) {
    dispatch(getError(error));
  };
};

// --------------------------------------------------

// -- Edycja użytkownika - przekazanie jego danych --

export const editSuccess = (user: UserDetails['user']) => ({
  type: `${EDIT}_${FULFILLED}`,
  user
})
export const editError = (error: Error) => ({
  error: error.message,
  type: `${EDIT}_${REJECTED}`,
});
export const editUser = ({ firstName, key, secondName, url }: UserDetails['user']): Thunk => (dispatch) => {
  try {
    const user = {
      firstName,
      key,
      secondName,
      url,
    };
    dispatch(editSuccess(user));
  } catch (error) {
    dispatch(editError(error));
  }
}

// --------------------------------------------------

// --------- Aktualizacja danych użytkownika ---------

export const updateSuccess = (users: FirebaseReducer['users']) => ({
  isEdited: '',
  type: `${UPDATE}_${FULFILLED}`,
  users
});

export const updateError = (error: Error) => ({
  error: error.message,
  type: `${UPDATE}_${REJECTED}`
});

export const updateUserInFirebase = (user: AddUserToFirebase): Thunk =>
  async (dispatch, getState, { base, storage }) => {
    const usersRef = base.ref('users');
    const pictureRef = storage.ref('personalPicture');
    try {
      await pictureRef.child(user.key).delete().then(() => addUser(user, usersRef, pictureRef));
      usersRef.on('value', (data) => {
        if (data) {
          dispatch(updateSuccess(data.val()))
        }
      });
      dispatch(reset('List'));
      dispatch(push('/'));
    } catch (error) {
      dispatch(updateError(error));
    };
  };

// ---------------------------------------------------

// -------------------- Routing --------------------

export const redirect = (url: string): Thunk => (dispatch) => {
  try {
    dispatch(push(url));
  } catch (error) {
    dispatch(getError(error))
  };
}

// -------------------------------------------------

// --- Podświetlenie wybranego elementu w tabeli ---

export const detailsSuccess = (isEdited: string) => ({
  isEdited,
  type: `${DETAILS}_${FULFILLED}`
});

export const detailsError = (error: Error) => ({
  error: error.message,
  type: `${DETAILS}_${REJECTED}`
});

export const highligthChosenElement = (key: string): Thunk => (dispatch) => {
  try {
    dispatch(detailsSuccess(key))
  } catch (error) {
    dispatch(detailsError(error))
  }
}

// -------------------------------------------------

// --- Podświetlenie elementu na czerwono po wejściu na ikonę usunięcia ---

export const onDeleteHoverSuccess = (toDelete: string) => ({
  toDelete,
  type: `${DELETE_HOVER}_${FULFILLED}`
});

export const onDeleteHoverError = (error: Error) => ({
  error: error.message,
  type: `${DELETE_HOVER}_${REJECTED}`
});

export const onDeleteHoverHighlight = (type: string, key: string): Thunk => (dispatch) => {
  try {
    type === 'mouseenter' ? dispatch(onDeleteHoverSuccess(key)) : dispatch(onDeleteHoverSuccess(""));
  } catch (error) {
    dispatch(onDeleteHoverError(error))
  }
}

// ------------------------------------------------------------------------ 

// --- Zmiana klucza w InputFile w celu resetu po wysłaniu formularza ---

export const onChangeKeySuccess = (inputFileKey: string) => ({
  inputFileKey,
  type: `${CHANGE_KEY}_${FULFILLED}`
});

export const onChangeKeyError = (error: Error) => ({
  error: error.message,
  type: `${CHANGE_KEY}_${REJECTED}`
});

export const onChangeKeyInputFile = (): Thunk => (dispatch) => {
  try {
    dispatch(onChangeKeySuccess(Date.now().toString()));
  } catch (error) {
    dispatch(onDeleteHoverError(error))
  }
}

// ----------------------------------------------------------------------

// ----- Podświetlenie elementu na niebesko po wejściu na ikonę edycji -----

export const onEditHoverSuccess = (toEdit: string) => ({
  toEdit,
  type: `${EDIT_HOVER}_${FULFILLED}`
});

export const onEditHoverError = (error: Error) => ({
  error: error.message,
  type: `${EDIT_HOVER}_${REJECTED}`
});

export const onEditHoverHighlight = (type: string, key: string): Thunk => (dispatch) => {
  try {
    type === 'mouseenter' ? dispatch(onEditHoverSuccess(key)) : dispatch(onEditHoverSuccess(""));
  } catch (error) {
    dispatch(onDeleteHoverError(error))
  }
}

// -------------------------------------------------------------------------


const firebaseReducer = typeToReducer({
  [CREATE]: {
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
  [RETRIEVE]: {
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
  [EDIT]: {
    FULFILLED: (state: FirebaseReducer, { user }: FirebaseReducer) => ({
      ...state,
      isError: false,
      user
    }),
    REJECTED: (state: FirebaseReducer, { error }: { error: string }) => ({
      ...state,
      error,
      isError: true,
    })
  },
  [DELETE]: {
    FULFILLED: (state: FirebaseReducer, { users }: FirebaseReducer) => ({
      ...state,
      isError: false,
      users
    }),
    REJECTED: (state: FirebaseReducer, { error }: { error: string }) => ({
      ...state,
      error,
      isError: true,
    }),
  },
  [UPDATE]: {
    FULFILLED: (state: FirebaseReducer, { isEdited, users }: FirebaseReducer) => ({
      ...state,
      isEdited,
      isError: false,
      isUploading: false,
      users
    }),
    REJECTED: (state: FirebaseReducer, { error }: { error: string }) => ({
      ...state,
      error,
      isError: true,
      isUploading: false
    }),
  },
  [DETAILS]: {
    FULFILLED: (state: FirebaseReducer, { isEdited }: FirebaseReducer) => ({
      ...state,
      isEdited,
      isError: false,
      isUploading: false,
    }),
    REJECTED: (state: FirebaseReducer, { error }: { error: string }) => ({
      ...state,
      error,
      isError: true,
      isUploading: false
    }),
  },
  [DELETE_HOVER]: {
    FULFILLED: (state: FirebaseReducer, { toDelete }: FirebaseReducer) => ({
      ...state,
      isError: false,
      toDelete
    }),
    REJECTED: (state: FirebaseReducer, { error }: { error: string }) => ({
      ...state,
      error,
      isError: true,
    }),
  },
  [EDIT_HOVER]: {
    FULFILLED: (state: FirebaseReducer, { toEdit }: FirebaseReducer) => ({
      ...state,
      isError: false,
      toEdit
    }),
    REJECTED: (state: FirebaseReducer, { error }: { error: string }) => ({
      ...state,
      error,
      isError: true,
    }),
  },
  [CHANGE_KEY]: {
    FULFILLED: (state: FirebaseReducer, { inputFileKey }: FirebaseReducer) => ({
      ...state,
      inputFileKey,
      isError: false
    }),
    REJECTED: (state: FirebaseReducer, { error }: { error: string }) => ({
      ...state,
      error,
      isError: true,
    }),
  }
  // ['@@router/LOCATION_CHANGE']: () => 
}, baseInitialState);

export default (history: History) => combineReducers({
  firebase: firebaseReducer,
  form: formReducer,
  router: connectRouter(history)
});
