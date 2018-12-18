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

enum SORTING_ORDER{
    asc = 'asc',
    desc = 'desc',
    reset = 'reset'
}

export type SortingOrder = keyof typeof SORTING_ORDER

enum SORT_BY_COLUMN{
    firstName = 'firstName',
    secondName = 'secondName',
    reset = 'reset'
}

export type SortByColumn = keyof typeof SORT_BY_COLUMN


export interface SortColumn{
    sortedByColumn: SortByColumn,
    sortingOrder: SortingOrder
}
/*export type SortByColumn = 'firstName' | 'secondName' | 'reset'

export type SortingOrder = 'asc' | 'desc' | 'reset' 

export interface SortColumn{
    sortedByColumn: SortByColumn,
    sortingOrder: SortingOrder
}*/

