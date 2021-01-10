export const SAVE_ADVERT = "SAVE_ADVERT"
export const FETCH_ALL_ADVERTS = "FETCH_ALL_ADVERTS"
export const DELETE_ADVERT = "DELETE_ADVERT"

export interface Advert {
    id:string
    name: string
    image:string
    displayOrder: number
    beginTime: string
    endTime: string
    createdOn: number
    totalImpression: number
    usedImpression: string //= 'enabled' | 'disabled'
    intendedUserType:string //= 'drivers' | 'clients'
}

export interface AdvertsState{
    adverts:Array<Advert>
}

export interface FetchAllAdvertsAction{
     type: typeof FETCH_ALL_ADVERTS
     payload:Array<Advert>
}

export interface SaveAdvertAction{
    type: typeof SAVE_ADVERT
    payload:Advert
}

export type AdvertsActionTypes = FetchAllAdvertsAction | SaveAdvertAction