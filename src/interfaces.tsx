import { Action, ActionCreator, Dispatch } from 'redux';


export interface UsersList{
    users: {
        [key: string]: {
          firstName: string,
          key: string,
          secondName: string,
          url: string
        }
    }
}

export interface Redirect{
    redirect: ActionCreator<Action>
}

export type Thunk = (dispatch: Dispatch, getState: () => any, thunk: { base: firebase.database.Database, storage: firebase.storage.Storage }) => void
