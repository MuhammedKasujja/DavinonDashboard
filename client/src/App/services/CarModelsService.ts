import { restConnector } from "../connectors/Axios-connector";
const baseLink = "/car-brands";
class CarModelsService {
  editBrandModel(brand:any) {
    return restConnector({
      url: `${baseLink}/edit/${brand.id}`,
      method: "PUT",
      data: brand
    })
  }

  fetchAllBrandModels() {
    return restConnector({
      url: `${baseLink}`,
      method: "GET",
    });
  }

  fetchSingleBrandBrand(truckID:string) {
    return restConnector({
      url: `${baseLink}/${truckID}`,
      method: "GET",
    });
  }

  deleteBrandModel(token:string) {
    return restConnector({
      url: `${baseLink}/delete?id=${token}`,
      method: "DELETE",
    });
  }

  addBrandModel(model:any){
    console.log(model);
    return restConnector({
      url: `${baseLink}/add`,
      method: "POST",
      data: model
    })
  }
}

export default new CarModelsService();
