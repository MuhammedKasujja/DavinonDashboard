import User from "_types/User";
import { restConnector } from "../connectors/Axios-connector";
import HttpClient from "./client";
const baseLink = "/users"
class UserService extends HttpClient {


  // public login = (email: string, password: string) => this.instance.get<User>(`/users/login/${email}/${password}`);

  public register = (user: User) => this.instance.post<any>(`/users/register`, user);

  signup(user: any) {
    console.log(user);

    return restConnector({
      url: `${baseLink}/signup`,
      method: "POST",
      data: user
    });
  }

  signin(email: string, password: string) {
    return restConnector({
      url: `${baseLink}/login/${email}/${password}`,
      method: "GET"
    });
  }

  login(email: string, password: string) {
    return restConnector({
      url: `/login`,
      method: "POST",
      data: { email, password }
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

export default new UserService();
