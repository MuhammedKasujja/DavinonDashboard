import User from "_types/User";
import { restConnector } from "../connectors/Axios-connector";
import HttpClient from "./client";
const baseLink = "/users"
class ReportsService  {


  // public fetchTripPayments = () => this.instance.get<any>(`/payments`);

  // public register = (user: User) => this.instance.post<any>(`/users/register`, user);

  fetchTripPayments() {
    return restConnector({
      url: `/payments`,
      method: "GET"
    });
  }

  fetchGrandTotalPayments() {
    return restConnector({
      url: `/payments/grand-total`,
      method: "GET"
    });
  }

  signin(email: string, password:string) {
    return restConnector({
      url: `${baseLink}/login/${email}/${password}`,
      method: "GET"
    });
  }

  editUser(user: any) {
    return restConnector({
      url: `${baseLink}/edit/${user.id}`,
      method: "PUT",
      data: user
    })
  }

  // admin
  fetchUsersFromDB() {
    return restConnector({
      url: `${baseLink}`,
      method: "GET",
    });
  }

  deletehUserFromDB(token: string) {
    return restConnector({
      url: `${baseLink}/delete?id=${token}`,
      method: "DELETE",
    });
  }

  addUser(user: any) {
    console.log(user);
    return restConnector({
      url: `${baseLink}/add`,
      method: "POST",
      data: user
    })
  }
}

export default new ReportsService();
