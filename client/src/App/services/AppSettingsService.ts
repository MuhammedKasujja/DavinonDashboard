import { AppSettings } from "_types/AppSettings";
import { restConnector } from "../connectors/Axios-connector";
const baseLink = "/settings"
class AppSettingsService {
    saveSettings(settings: AppSettings) {
        return restConnector({
            url: `${baseLink}/edit/`,
            method: "POST",
            data: settings
        })
    }
    // admin
    fetchAppSettings() {
        return restConnector({
            url: `${baseLink}`,
            method: "GET",
        });
    }

    // saveAppConfig() {
    //     return restConnector({
    //         url: `/config/saveSettings`,
    //         method: "POST",
    //     });
    // }
}

export default new AppSettingsService();
