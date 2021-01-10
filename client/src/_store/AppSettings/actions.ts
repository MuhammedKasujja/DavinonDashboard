import { Dispatch } from "redux"
import service from "../../App/services/index";
import { AppSettingsActionTypes, AppSettings, FETCH_SETTINGS, SAVE_SETTINGS } from "../../_types/AppSettings"

export const fetchAppSettings = () => async (dispatch: Dispatch<AppSettingsActionTypes>) => {
    const res = await service.AppSettingsService.fetchAppSettings()
    console.log({ 'settings': res.data })
    dispatch({
        type: FETCH_SETTINGS,
        payload: res.data
    })
}

export const saveAppSettingsAction = (settings: AppSettings) => async (dispatch: Dispatch<AppSettingsActionTypes>) => {
    console.log(settings)
    const res = await service.AppSettingsService.saveSettings(settings)
    dispatch({
        type: SAVE_SETTINGS,
        payload: res.data
    })
}
