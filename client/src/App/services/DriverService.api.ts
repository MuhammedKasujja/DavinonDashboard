import { Driver } from '_store/driver/types';
import HttpClient from './client'
const baseLink = "/api/drivers"

class MainApi extends HttpClient {
//   public constructor() {
//     super('https://api.awesome-site.com');
//   }

  public fetchDrivers = () => this.instance.get<Driver[]>(baseLink);
  
  public getUser = (id: string) => this.instance.get<Driver>(`/users/${id}`);

  public addUser = (id: string) => this.instance.post<Driver>(`/users/${id}`);
}

export default new MainApi()