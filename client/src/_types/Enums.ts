export enum TripStatus {
    New = 'New',
    Canceled = "Canceled",
    Finished = "Finished",
    inProgress = 'InProgress',
    DriverPath = 'Driver Found'
}

export enum TripType {
    Passenger = 'Passenger',
    Cargo = 'Cargo',
    ScheduledPassenger = 'Scheduled Passenger',
    ScheduledCargo = 'Scheduled Cargo'
}

export enum DriverState {
    Offline,
    LookingForTrip,
    GoingToMeetPassenger,
    OnTrip
}

export enum DriverRating {
    Poor = 1,
    Fair = 2,
    Good = 3,
    vGood = 4,
    Excellent = 5
}