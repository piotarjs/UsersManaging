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

export interface User{
    user:{
      firstName: string,
      key: string,
      secondName: string,
      url: string
    }
  }

export interface Redirect{
    redirect: ActionCreator<Action>
}

export interface AddUserToFirebase{
    addUserToFirebase: ActionCreator<Action>,
    handleSubmit
}

export interface GetUsersFromFirebase{
    getUserFromFirebase
}

export interface AddUserProps{
    match: {
        params: {
          key: string
        }
      },
      isError: boolean,
      isLoading: boolean,
}
export interface Database{
    ref(path: string)
}

export interface Snapshot{
    metadata:{
        name: string
    }
}
