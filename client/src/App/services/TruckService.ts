import { restConnector } from "../connectors/Axios-connector";
const baseLink = "/trucks"
class TruckService {
  editTruck(truck: any) {
    return restConnector({
      url: `${baseLink}/edit/${truck.id}`,
      method: "PUT",
      data: truck
    })
  }

  // admin
  fetchAllTrucks() {
    return restConnector({
      url: `${baseLink}`,
      method: "GET",
    });
  }

  fetchSingleTruck(truckID: string) {
    return restConnector({
      url: `${baseLink}/${truckID}`,
      method: "GET",
    });
  }
  fetchTruckTonnages() {
    return restConnector({
      url: `${baseLink}/tonnages`,
      method: "GET"
    })
  }

  fetchTruckBodies() {
    return restConnector({
      url: `${baseLink}/truck-body`,
      method: "GET"
    })
  }

  fetchVehicleTypes() {
    return restConnector({
      url: `${baseLink}/vehicle-types`,
      method: "GET"
    })
  }

  deleteTruck(token: string) {
    return restConnector({
      url: `${baseLink}/delete?id=${token}`,
      method: "DELETE",
    });
  }

  addTruck(truck: any) {
    return restConnector({
      url: `${baseLink}/add`,
      method: "POST",
      data: truck,
    })
  }

  addData() {
    console.log('adding data')
    return restConnector({
      url: `${baseLink}/addData`,
      method: "POST",
      data: { name: "kasujja Muhammed" }
    })
  }
}

export default new TruckService();
