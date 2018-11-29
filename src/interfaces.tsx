import { Action, ActionCreator } from 'redux';

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