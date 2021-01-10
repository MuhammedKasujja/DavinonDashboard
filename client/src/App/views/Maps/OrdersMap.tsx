import React, { useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  StreetViewPanorama
} from "react-google-maps";
import { compose } from "recompose";
import {fetchTrips} from "../../../_store/trips/actions"
import {connect, useDispatch} from "react-redux"
import { RootStore } from "_store/store";
import { Trip } from "_store/trips/types";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
interface MapWithMarkersProps{
    selectedMarker:boolean
}
// const MapWithMarkers = compose(withScriptjs,
//   withGoogleMap)((props:any) => {
//     return (
//       <GoogleMap
//         defaultMapTypeId="satellite"
//         defaultZoom={8}
//         defaultCenter={{ lat: 0.3239186, lng: 32.549717999999984 }}
//         defaultOptions={{
//           //setting MapType
//           mapTypeControl: false,
//           //showing labels
//           mapTypeId: 'hybrid',
//           //
//         //   streetView: StreetViewPanorama,
//           scrollwheel: false,
//           zoomControl: true,
//           styles: [
//             {
//               featureType: "water",
//               stylers: [
//                 { saturation: 43 },
//                 { lightness: -11 },
//                 { hue: "#0088ff" }
//               ]
//             },
//             {
//               featureType: "road",
//               elementType: "geometry.fill",
//               stylers: [
//                 { hue: "#ff0000" },
//                 { saturation: -100 },
//                 { lightness: 99 }
//               ]
//             },
//             {
//               featureType: "road",
//               elementType: "geometry.stroke",
//               stylers: [{ color: "#808080" }, { lightness: 54 }]
//             },
//             {
//               featureType: "landscape.man_made",
//               elementType: "geometry.fill",
//               stylers: [{ color: "#ece2d9" }]
//             },
//             {
//               featureType: "poi.park",
//               elementType: "geometry.fill",
//               stylers: [{ color: "#ccdca1" }]
//             },
//             {
//               featureType: "road",
//               elementType: "labels.text.fill",
//               stylers: [{ color: "#767676" }]
//             },
//             {
//               featureType: "road",
//               elementType: "labels.text.stroke",
//               stylers: [{ color: "#ffffff" }]
//             },
//             { featureType: "poi", stylers: [{ visibility: "off" }] },
//             {
//               featureType: "landscape.natural",
//               elementType: "geometry.fill",
//               stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
//             },
//             { featureType: "poi.park", stylers: [{ visibility: "on" }] },
//             {
//               featureType: "poi.sports_complex",
//               stylers: [{ visibility: "on" }]
//             },
//             { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
//             {
//               featureType: "poi.business",
//               stylers: [{ visibility: "simplified" }]
//             }
//           ]
//         }}
//       >
//         {props.markers.map((trip:Trip) => {
//           const onClick = props.onClick.bind(this, trip)
//           const tripStatus = () => {
//             var status = trip.status;
//             if (status === 1) {
//               return 'Open'
//             } else if (status === 3) {
//               return 'Waiting'
//             }
//             else if (status === 4) {
//               return 'Started'
//             }
//             else if (status === 5) {
//               return 'Finished'
//             }
//             else if (status === 6) {
//               return 'Canceled'
//             }
//           }
//           return <Marker
//             key={trip.id}
//             onClick={onClick}
//             position={{ lat: trip.originLatitude, lng: trip.originLongitude }} >
//             <InfoWindow>
//               <div>
//                 {trip.originAddress}
//                 <div>{trip.distance} {tripStatus()}</div>
//               </div>

//             </InfoWindow>
//             {props.selectedMarker === trip &&
//               <InfoWindow>
//                 <div>
//                   {trip.originAddress}
//                   <div>{trip.distance} {tripStatus()}</div>
//                 </div>
//               </InfoWindow>}
//           </Marker>
//         })}
//       </GoogleMap>
//     )
//   }
//   );

//   interface OrdersMapProps{
//     trips: Trip[],
//     selectedMarker: false
//   }

// // class TripsMap extends React.Component {
// const OrdersMap: React.FC<any> = (props:OrdersMapProps) =>{
//     const [selectedMarker, setSelectedMarker] = useState(false)
//     const dispatch = useDispatch()
 
//   React.useEffect(() => {
//       //componentDidMount
//       setSelectedMarker(false)
//     dispatch(fetchTrips())
//   }, [])

//   const handleMarkerClick = (marker:boolean, event:any) => {
//     setSelectedMarker(false)
//     setSelectedMarker(marker)
//   }

//     var url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIka0wD5mEerRq7aSbxHqxBGPFYYVkp64"//+GOOGLE_API_KEY;
//     return (
//       <MapWithMarkers
//         // selectedMarker={selectedMarker}
//         // markers={props.trips}
//         // onClick={handleMarkerClick}
//         // googleMapURL={url}
//         // loadingElement={<div style={{ height: `100%` }} />}
//         // containerElement={<div style={{ height: `100vh` }} />}
//         // mapElement={<div style={{ height: `100%` }} />}
//       />
//     );
// }

// const mapStateToProps = (state:RootStore) =>{
//   return {
//      trips : state.trips.trips
//   };
// }
// export default connect(mapStateToProps)(OrdersMap);




// import React from "react";
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
//   InfoWindow
// } from "react-google-maps";
// import { compose } from "recompose";
// import {fetchTrips} from "../../../_store/trips/actions"
// import {connect} from "react-redux"

// const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
// const MapWithMarkers = compose(withScriptjs,
//   withGoogleMap)(props => {
//     return (
//       <GoogleMap
//         defaultMapTypeId="satellite"
//         defaultZoom={8}
//         defaultCenter={{ lat: 0.3239186, lng: 32.549717999999984 }}
//         defaultOptions={{
//           //setting MapType
//           mapTypeControl: false,
//           //showing labels
//           mapTypeId: 'hybrid',
//           //
//           streetView: false,
//           scrollwheel: false,
//           zoomControl: true,
//           styles: [
//             {
//               featureType: "water",
//               stylers: [
//                 { saturation: 43 },
//                 { lightness: -11 },
//                 { hue: "#0088ff" }
//               ]
//             },
//             {
//               featureType: "road",
//               elementType: "geometry.fill",
//               stylers: [
//                 { hue: "#ff0000" },
//                 { saturation: -100 },
//                 { lightness: 99 }
//               ]
//             },
//             {
//               featureType: "road",
//               elementType: "geometry.stroke",
//               stylers: [{ color: "#808080" }, { lightness: 54 }]
//             },
//             {
//               featureType: "landscape.man_made",
//               elementType: "geometry.fill",
//               stylers: [{ color: "#ece2d9" }]
//             },
//             {
//               featureType: "poi.park",
//               elementType: "geometry.fill",
//               stylers: [{ color: "#ccdca1" }]
//             },
//             {
//               featureType: "road",
//               elementType: "labels.text.fill",
//               stylers: [{ color: "#767676" }]
//             },
//             {
//               featureType: "road",
//               elementType: "labels.text.stroke",
//               stylers: [{ color: "#ffffff" }]
//             },
//             { featureType: "poi", stylers: [{ visibility: "off" }] },
//             {
//               featureType: "landscape.natural",
//               elementType: "geometry.fill",
//               stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
//             },
//             { featureType: "poi.park", stylers: [{ visibility: "on" }] },
//             {
//               featureType: "poi.sports_complex",
//               stylers: [{ visibility: "on" }]
//             },
//             { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
//             {
//               featureType: "poi.business",
//               stylers: [{ visibility: "simplified" }]
//             }
//           ]
//         }}
//       >
//         {props.markers.map(trip => {
//           const onClick = props.onClick.bind(this, trip)
//           const tripStatus = () => {
//             var status = trip.status;
//             if (status === 1) {
//               return 'Open'
//             } else if (status === 3) {
//               return 'Waiting'
//             }
//             else if (status === 4) {
//               return 'Started'
//             }
//             else if (status === 5) {
//               return 'Finished'
//             }
//             else if (status === 6) {
//               return 'Canceled'
//             }
//           }
//           return <Marker
//             key={trip.id}
//             onClick={onClick}
//             position={{ lat: trip.originLatitude, lng: trip.originLongitude }} >
//             <InfoWindow>
//               <div>
//                 {trip.originAddress}
//                 <div>{trip.distance} {tripStatus()}</div>
//               </div>
//             </InfoWindow>
//             {props.selectedMarker === trip &&
//               <InfoWindow>
//                 <div>
//                   {trip.originAddress}
//                   <div>{trip.distance} {tripStatus()}</div>
//                 </div>
//               </InfoWindow>}
//           </Marker>
//         })}
//       </GoogleMap>
//     )
//   }
//   );

// class TripsMap extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       trips: [],
//       selectedMarker: false
//     }
//   }

//   componentDidMount() {
//     const { dispatch } = this.props;
//     dispatch(fetchTrips());
//   }

//   handleMarkerClick = (marker, event) => {
//     this.setState({ selectedMarker: false })
//     this.setState({
//       selectedMarker: marker
//     })
//   }

//   render() {
//     var url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIka0wD5mEerRq7aSbxHqxBGPFYYVkp64"//+GOOGLE_API_KEY;
//     return (
//       <MapWithMarkers
//         selectedMarker={this.state.selectedMarker}
//         markers={this.props.trips}
//         onClick={this.handleMarkerClick}
//         googleMapURL={url}
//         loadingElement={<div style={{ height: `100%` }} />}
//         containerElement={<div style={{ height: `100vh` }} />}
//         mapElement={<div style={{ height: `100%` }} />}
//       />
//     );
//   }
// }

// const mapStateToProps = (state) =>{
//   return {
//      trips : state.trips.trips
//   };
// }
// export default connect(mapStateToProps)(TripsMap);
