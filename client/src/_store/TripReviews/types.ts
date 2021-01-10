export const FETCH_TRIPS_REVIEWS = "FETCH_TRIPS_REVIEWS"

export interface TripReview {
    id:string
    code: string
    tripCode:string
    tripId: string
    driverName: string
    driverRating: string
    clientName: string
    rate: number
    createdOn: string 
    comment:string 
}

export interface TripReviewState{
    reviews:Array<TripReview>
}

export interface FetchTripsReviewsAction{
     type: typeof FETCH_TRIPS_REVIEWS
     payload:Array<TripReview>
}


export type TripReviewActionTypes = FetchTripsReviewsAction 