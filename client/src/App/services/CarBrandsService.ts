import { restConnector } from "../connectors/Axios-connector";
const baseLink = "/car-brands"
class CarBrandsService {
  editBrand(brand:any) {
    return restConnector({
      url: `${baseLink}/edit/${brand.id}`,
      method: "PUT",
      data: brand
    })
  }

  // admin
  fetchAllBrands() {
    return restConnector({
      url: `${baseLink}`,
      method: "GET",
    });
  }

  fetchSingleBrand(truckID:string) {
    return restConnector({
      url: `${baseLink}/${truckID}`,
      method: "GET",
    });
  }

  deleteBrand(token:string) {
    return restConnector({
      url: `${baseLink}/delete?id=${token}`,
      method: "DELETE",
    });
  }

  addBrand(brand:any) {
    console.log(brand);
    return restConnector({
      url: "/car-brands/add",
      method: "POST",
      data: brand
    })
  }

  addBrandText(brand:string) {
    console.log(brand);
    const url = 'http://localhost:3001/api/car-brands/add/';
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: brand
    };
    return fetch(url, options)
  }
}

export default new CarBrandsService();
