import { restConnector } from "../connectors/Axios-connector";
const baseLink = "/drivers"
class DriverService {
  editDriver(driver: any) {
    return restConnector({
      url: `${baseLink}/edit/${driver.id}`,
      method: "PUT",
      data: driver
    })
  }

  // admin
  fetchAllDrivers(){
    return restConnector({
      url: `${baseLink}`,
      method: "GET",
    });
  }

  fetchSingleDriver(driverID: string) {
    return restConnector({
      url: `${baseLink}/${driverID}`,
      method: "GET",
    });
  }

  deletehDriver(token:string) {
    return restConnector({
      url: `${baseLink}/delete?id=${token}`,
      method: "DELETE",
    });
  }

  addDriver(driver:any) {
    console.log(driver);
    return restConnector({
      url: `${baseLink}/add`,
      method: "POST",
      data: driver
    })
  }

  addVehicleToDriver(truckID:string, driverID:string) {
    console.log(driverID)
    return restConnector({
      url: `${baseLink}/attach-vehicle`,
      method: "POST",
      data: { truckId: truckID, driverId: driverID }
    })
  }
}

export default new DriverService();
