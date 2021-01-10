import { AppSettingsState, AppSettingsActionTypes, FETCH_SETTINGS, SAVE_SETTINGS } from "../../_types/AppSettings"

const initialState: AppSettingsState = {
    settings: {
        oneSignalApiKey: '',
        email: '',
        stripeApiPublishableKey: '',
        stripeApiSecretKey: '',
        currency: 'UGX',
        isOneSignalLive: false,
        isStripeLive: false,
        costPerKm: 0
    }
}

export const settingsReducer = (state = initialState, action: AppSettingsActionTypes) => {
    switch (action.type) {
        case FETCH_SETTINGS:
            return { ...state, settings: action.payload }
        default:
            return state;
    }
}