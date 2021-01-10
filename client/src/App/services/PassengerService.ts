import { restConnector } from "../connectors/Axios-connector";
const baseLink = "/passengers"
class PassengerService {
  editPassenger(passenger: any) {
    return restConnector({
      url: `${baseLink}/edit/${passenger.id}`,
      method: "PUT",
      data: passenger
    })
  }

  // admin
  fetchAllPassengers() {
    return restConnector({
      url: `${baseLink}`,
      method: "GET",
    });
  }

  fetchSinglePassenger(passengerID: string) {
    return restConnector({
      url: `${baseLink}/${passengerID}`,
      method: "GET",
    });
  }

  deletePassenger(token: any) {
    return restConnector({
      url: `${baseLink}/delete?id=${token}`,
      method: "DELETE",
    });
  }

  addPassenger(passenger: any) {
    console.log(passenger);
    return restConnector({
      url: `${baseLink}/add`,
      method: "POST",
      data: passenger
    })
  }
}

export default new PassengerService();
