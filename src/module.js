import typeToReducer from 'type-to-reducer';
import axios from 'axios';
import { takeEvery, put, call } from 'redux-saga/effects';

const PENDING = 'PENDING';
const REJECTED = 'REJECTED';
const FULFILLED = 'FULFILLED';
const FIND = 'FIND';
const DELETE = 'DELETE';

const initialState = {
    items: {},
    phrase: '',
    isLoading: false,
    isError: false
};

export const deleteItem = (key) => ({
  type: DELETE,
  key
});

export const findPending = (phrase) => ({
  type: `${FIND}_${PENDING}`,
  phrase
});

export const findSuccess = (data, phrase) => {
  const filteredList = data.filter(({login}) => (
    login.includes(phrase)
  ));
  const items = {};
  filteredList.forEach(({ id, login }) => items[id] = { login, key: id });
  return{
    type: `${FIND}_${FULFILLED}`,
    items
  }; 
};
export const findError = (error) => ({
  type: `${FIND}_${REJECTED}`,
  error
});

export function* getList(args){
  try{    
    const response = yield call(axios, 'https://api.github.com/users');
    yield put(findSuccess(response.data, args.phrase));
  } catch (error){
    yield put(findError(error));
  }
};

export function* getListSaga(){
  yield takeEvery('FIND_PENDING', getList);
};

const listReducer = typeToReducer({
  [DELETE]: (state, {key}) => {
    const items = { ...state.items } ;
    delete items[key];
    return {
      ...state,
      items,
    }; 
  },
  [FIND]: {
    PENDING: (state) => ({
      ...state,
      isLoading: true,
      isError: false
    }),
    FULFILLED: (state, {items}) => {
      return{
        ...state,
        items,
        isLoading: false
      };
    },
    REJECTED: (state) => ({
      ...state,
      isLoading: false,
      isError: true
    }), 
  },
}, initialState);

export default listReducer;