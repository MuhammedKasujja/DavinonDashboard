export const SAVE_SETTINGS = "SAVE_SETTINGS"
export const FETCH_SETTINGS = "FETCH_SETTINGS"
export const LOADING = "LOADING"
export const ERROR = "ERROR"
export const SUCCESS ="SUCCESS"

export interface AppState{
    isLoading:boolean,
    error?:string,
    success?:string
}

export interface AppSettingsState {
    settings: AppSettings 
}

export interface AppStateLoading {
    type: typeof LOADING
    payload: boolean
}

export interface AppStateError {
    type: typeof ERROR
    payload?: string
}

export interface AppStateSuccess {
    type: typeof SUCCESS
    payload?: string
}

export interface SaveAppSettingsAction {
    type: typeof SAVE_SETTINGS
    payload?: AppSettings
}

export interface FetchAppSettingsAction {
    type: typeof FETCH_SETTINGS
    payload: AppSettings
}

export type AppSettingsActionTypes = SaveAppSettingsAction | FetchAppSettingsAction

export interface AppSettings {
    oneSignalApiKey: string,
    stripeApiSecretKey: string,
    isOneSignalLive: boolean,
    isStripeLive: boolean,
    email: string,
    stripeApiPublishableKey: string,
    costPerKm:number,
    currency: string
}