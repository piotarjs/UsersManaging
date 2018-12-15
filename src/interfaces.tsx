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

export interface UserDetails{
    user: {
        firstName: string,
    key: string,
    secondName: string,
    url: string
    }
}

export interface ExtraArgument { base: firebase.database.Database, storage: firebase.storage.Storage }
