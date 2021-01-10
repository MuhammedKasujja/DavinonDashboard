import { restConnector } from "../connectors/Axios-connector";
const baseLink = "/vehicles"
class VehicleService {
  editVehicle(vehicle:any) {
    return restConnector({
      url: `${baseLink}/edit/${vehicle.id}`,
      method: "PUT",
      data: vehicle
    })
  }

  fetchAllVehicles() {
    return restConnector({
      url: `${baseLink}`,
      method: "GET",
    });
  }

  fetchSingleVehicle(vehicleID:string) {
    return restConnector({
      url: `${baseLink}/${vehicleID}`,
      method: "GET",
    });
  }

  deleteVehicle(vehicleID:string) {
    return restConnector({
      url: `${baseLink}/delete?id=${vehicleID}`,
      method: "DELETE",
    });
  }

  addVehicle(vehicle:any){
    console.log(vehicle);
    return restConnector({
      url: `${baseLink}/add`,
      method: "POST",
      data: vehicle,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }

  
}

export default new VehicleService();
