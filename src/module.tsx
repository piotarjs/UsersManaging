import { connectRouter, push } from 'connected-react-router';
import { History } from 'history';
import { Action, combineReducers } from 'redux';
import { reducer as formReducer, reset } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import typeToReducer from 'type-to-reducer';
import { ExtraArgument, SortByColumn, SortColumn, SortingOrder, UserDetails, UsersList } from './interfaces';

// ----- Definicja stałych -----

const INITIAL_FILENAME = 'Wybierz plik';

// -----------------------------

// ---------------- Interfejsy i typy ----------------

export interface State {
  firebase: {
    fileName: string,
    listElementIsEdited: string,
    isError: false,
    isLoading: false,
    isUploading: false,
    listElementToDelete: string,
    listElementToEdit: string,
    sortColumn: SortColumn,
    sortingOrder: SortingOrder,
    user: UserDetails['user'],
    users: UsersList['users'],
    usersFiltered: UsersList['users'],
    usersSorted: UsersList['users'],
  }
};

interface AddUserToFirebase { firstName: string, key: string, secondName: string, uploadFile: string[] };

type FirebaseReducer = State['firebase'];

type ResetFileName = 'Wybierz plik';

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
const FILTER = 'FILTER';
const SORT = 'SORT';
const GET_FILE_NAME = 'GET_FILE_NAME';

// ---------------------------------------------------

// --------------- Inicjalizacja stanu ---------------

const baseInitialState = {
  fileName: 'Wybierz plik',
  isError: false,
  isLoading: false,
  isUploading: false,
  listElementIsEdited: '',
  listElementToDelete: '',
  listElementToEdit: '',
  sortColumn: {},
  sortingOrder: 'asc',
  user: {},
  users: {},
  usersFiltered: {}
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

export const addSuccess = (users: FirebaseReducer['users'], fileName: string) => ({
  fileName,
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
    const fileName = INITIAL_FILENAME;
    try {
      await addUser(user, usersRef, pictureRef);
      usersRef.on('value', (data) => {
        if (data) {
          dispatch(addSuccess(data.val(), fileName))
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
      dispatch(push('/'));
      usersRef.child(`${key}`).remove().then(
        () => pictureRef.child(`${key}`).delete().then(
          () => usersRef.on('value', (data) => {
            if (data) {
              dispatch(deleteSuccess(data.val()))
            }
          })
        )
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

// --------- Filtrowanie listy użytkowników ---------

export const filterPending = () => ({
  type: `${FILTER}_${PENDING}`
});

export const filterSuccess = (usersFiltered: FirebaseReducer['users'], sortColumn: SortColumn) => ({
  sortColumn,
  type: `${FILTER}_${FULFILLED}`,
  usersFiltered,
});

export const filterError = (error: Error) => ({
  error: error.message,
  type: `${FILTER}_${REJECTED}`,
});

export const filterUsersList = (usersSorted: FirebaseReducer['users'], phrase: string): Thunk => async (dispatch) => {
  dispatch(filterPending());
  try {    
    const filteredList = Object.values(usersSorted).filter(({firstName, secondName}) => firstName.toLowerCase().includes(phrase) || secondName.toLowerCase().includes(phrase));
    const usersFiltered = {};
    filteredList.forEach(({ firstName, key, secondName, url }) => usersFiltered[key] = { firstName, key, secondName, url });
    const sortColumn: SortColumn = {
      sortedByColumn: 'reset',
      sortingOrder: 'reset'
    };
    dispatch(filterSuccess(usersFiltered, sortColumn));
  } catch (error) {
    dispatch(filterError(error));
  };
};

// --------------------------------------------------

// --------- Sortowanie listy użytkowników ---------

export const sortPending = () => ({
  type: `${SORT}_${PENDING}`
});

export const sortSuccess = (usersSorted: FirebaseReducer['users'], sortingOrder: SortingOrder, sortColumn: SortColumn) =>  ({
  sortColumn,
  sortingOrder,
  type: `${SORT}_${FULFILLED}`,
  usersSorted
});

export const sortError = (error: Error) => ({
  error: error.message,
  type: `${SORT}_${REJECTED}`,
});

const sortBy = (a: string, b: string, sortingOrder: SortingOrder) => 
  sortingOrder === 'asc'
  ? 
    a > b
    ? 
      1 : -1
  : 
    a > b
    ?
      -1 : 1

export const sortUsersList = (usersFiltered: FirebaseReducer['users'], sortingOrder: SortingOrder, sortedByColumn: SortByColumn): Thunk => async (dispatch) => {
  dispatch(sortPending());
  try {
    const usersSorted = {};
    Object.values(usersFiltered).sort((a,b) => sortBy(a[sortedByColumn], b[sortedByColumn], sortingOrder))
    .map(({ firstName, key, secondName, url }) => usersSorted[key] = { firstName, key, secondName, url });
    const sortColumn = {
      sortedByColumn,
      sortingOrder
    };
    sortingOrder = (sortingOrder === 'asc')? 'desc' : 'asc';
    dispatch(sortSuccess(usersSorted, sortingOrder, sortColumn));
  } catch (error) {
    dispatch(sortError(error));
  };
};

// -------------------------------------------------

// -- Edycja użytkownika - przekazanie jego danych --

export const editSuccess = (user: UserDetails['user']) => ({
  type: `${EDIT}_${FULFILLED}`,
  user
})
export const editError = (error: Error) => ({
  error: error.message,
  type: `${EDIT}_${REJECTED}`,
});
export const editUser = ( userData: UserDetails['user']): Thunk => (dispatch) => {
  try {
    const { firstName, key, secondName, url } = userData;
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

export const updateSuccess = (users: FirebaseReducer['users'], fileName: string) => ({
  fileName,
  listElementIsEdited: '',
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
    const fileName = INITIAL_FILENAME;
    try {
      await pictureRef.child(user.key).delete().then(() => addUser(user, usersRef, pictureRef));
      usersRef.on('value', (data) => {
        if (data) {
          dispatch(updateSuccess(data.val(), fileName))
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

export const redirectSuccess = (fileName: ResetFileName) => ({
    fileName,
    type: `${GET_FILE_NAME}_${FULFILLED}`
});

export const redirectError = (error: Error) => ({
  error: error.message,
  type: `${GET_FILE_NAME}_${REJECTED}`
});

export const redirect = (url: string, resetFileName: string): Thunk => (dispatch) => {
  try { 
    if(resetFileName){
      dispatch(redirectSuccess(INITIAL_FILENAME));
    }
    dispatch(push(url));
  } catch (error) {
    dispatch(getError(error))
  };
}

// -------------------------------------------------

// --- Podświetlenie wybranego elementu w tabeli ---

export const detailsSuccess = (listElementIsEdited: string) => ({
  listElementIsEdited,
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

export const onDeleteHoverSuccess = (listElementToDelete: string) => ({
  listElementToDelete,
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

// ----- Podświetlenie elementu na niebesko po wejściu na ikonę edycji -----

export const onEditHoverSuccess = (listElementToEdit: string) => ({
  listElementToEdit,
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

// ----- Pobranie nazwy pliku do costomowego uploadFile -----

export const getFileNameSuccess = (fileName: string) => ({
  fileName,
  type: `${GET_FILE_NAME}_${FULFILLED}`
});

export const getFileNameError = (error: Error) => ({
  error: error.message,
  type: `${GET_FILE_NAME}_${REJECTED}`
});

export const getFileName = ({target: {value}}: React.ChangeEvent<HTMLInputElement>): Thunk => (dispatch) => {
  try {
    const fileName = (value.length > 0)? value.slice("C:/\fakepath\/".length) : INITIAL_FILENAME;
    dispatch(getFileNameSuccess(fileName));
  } catch (error) {
    dispatch(onDeleteHoverError(error))
  }
}

// -------------------------------------------------------------------------

const firebaseReducer = typeToReducer({
  [CREATE]: {
    FULFILLED: (state: FirebaseReducer, { fileName, users }: FirebaseReducer) => ({
      ...state,
      fileName,
      isError: false,
      isUploading: false,
      users,
      usersFiltered: users,
      usersSorted: users
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
      users,
      usersFiltered: users,
      usersSorted: users
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
      users,
      usersFiltered: users,
      usersSorted: users
    }),
    REJECTED: (state: FirebaseReducer, { error }: { error: string }) => ({
      ...state,
      error,
      isError: true,
    }),
  },
  [UPDATE]: {
    FULFILLED: (state: FirebaseReducer, { fileName, listElementIsEdited, users }: FirebaseReducer) => ({
      ...state,
      fileName,
      isError: false,
      isUploading: false,
      listElementIsEdited,
      users,
      usersFiltered: users,
      usersSorted: users
    }),
    REJECTED: (state: FirebaseReducer, { error }: { error: string }) => ({
      ...state,
      error,
      isError: true,
      isUploading: false
    }),
  },
  [DETAILS]: {
    FULFILLED: (state: FirebaseReducer, { listElementIsEdited }: FirebaseReducer) => ({
      ...state,
      isError: false,
      isUploading: false,
      listElementIsEdited,
    }),
    REJECTED: (state: FirebaseReducer, { error }: { error: string }) => ({
      ...state,
      error,
      isError: true,
      isUploading: false
    }),
  },
  [DELETE_HOVER]: {
    FULFILLED: (state: FirebaseReducer, { listElementToDelete }: FirebaseReducer) => ({
      ...state,
      isError: false,
      listElementToDelete
    }),
    REJECTED: (state: FirebaseReducer, { error }: { error: string }) => ({
      ...state,
      error,
      isError: true,
    }),
  },
  [EDIT_HOVER]: {
    FULFILLED: (state: FirebaseReducer, { listElementToEdit }: FirebaseReducer) => ({
      ...state,
      isError: false,
      listElementToEdit
    }),
    REJECTED: (state: FirebaseReducer, { error }: { error: string }) => ({
      ...state,
      error,
      isError: true,
    }),
  },
  [FILTER]: {
    FULFILLED: (state: FirebaseReducer, { sortColumn, usersFiltered }: FirebaseReducer) => ({
      ...state,
      isError: false,
      isLoading: false,
      sortColumn,
      usersFiltered,
      usersSorted: usersFiltered
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
  [SORT]: {
    FULFILLED: (state: FirebaseReducer, { sortColumn, sortingOrder, usersSorted }: FirebaseReducer) => ({
      ...state,
      isError: false,
      isLoading: false,
      sortColumn,
      sortingOrder,
      usersSorted
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
  [GET_FILE_NAME]: {
    FULFILLED: (state: FirebaseReducer, { fileName }: FirebaseReducer) => ({
      ...state,
      fileName,
      isError: false,
      isLoading: false,
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
