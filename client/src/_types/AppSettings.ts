export const SAVE_SETTINGS = "SAVE_SETTINGS"
export const FETCH_SETTINGS = "FETCH_SETTINGS"

export interface AppSettingsState {
    settings: AppSettings 
}

export interface SaveAppSettingsAction {
    type: typeof SAVE_SETTINGS
    payload: AppSettings | undefined
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