import { restConnector } from "../connectors/Axios-connector";
const baseLink = "/trips"
class TripService {
  editTrip(trip: any) {
    return restConnector({
      url: `${baseLink}/edit/${trip.id}`,
      method: "PUT",
      data: trip
    })
  }

  // admin
  fetchAllTrips() {
    return restConnector({
      url: `${baseLink}`,
      method: "GET",
    });
  }

  fetchTripsReviews() {
    return restConnector({
      url: `${baseLink}/reviews`,
      method: "GET",
    });
  }

  fetchSingleTrip(tripID: string) {
    return restConnector({
      url: `${baseLink}/${tripID}`,
      method: "GET",
    });
  }

  deleteTrip(token: string) {
    return restConnector({
      url: `${baseLink}/delete?id=${token}`,
      method: "DELETE",
    });
  }

  streamTrips() {
    // var eventSource =new EventSource('http://localhost:3001/api/trips/stream/')
    // eventSource.onmessage = e =>
    //   console.log(JSON.parse(e.data));
    return restConnector({
      url: `${baseLink}/stream`,
      method: "GET",
    });
  }

  addTrip(trip: any) {
    console.log(trip);
    return restConnector({
      url: `${baseLink}/add`,
      method: "POST",
      data: trip
    })
  }
}

export default new TripService();
