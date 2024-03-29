import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper, mapEventHandler, markerEventHandler, GoogleAPI } from 'google-maps-react';

const mapStyle = {
    width: '920px',
    height: '500px'
}

export class MapContainer extends Component<{ google: GoogleAPI }>{
    // onMapClicked: mapEventHandler;
    // onMarkerClick: markerEventHandler;
    onInfoWindowClose: any;
    map?: google.maps.Map | google.maps.StreetViewPanorama

    render() {
        return (
            <>
                <Map google={google}
                    zoom={16}
                    draggable
                    initialCenter={
                        {
                            lat: 0.3239186,
                            lng: 32.549717999999984
                        }
                    }
                    onReady={(mapProps, map) => {
                        this.setState({ map: map as google.maps.Map })
                    }}
                    style={mapStyle}
                   // onClick={this.onMapClicked}
                   >

                    <Marker //onClick={this.onMarkerClick}
                        title={`Location of ...`} />
                </Map>
                <p className="float-left md:ml-0 mt-64 lg:ml-48 sm:pt-64 lg:pt-64">
                    <button className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-3 px-5 border border-gray-400 rounded shadow">Alarm</button>
                    <button className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-3 px-5 border border-gray-400 xs:ml-20 sm:ml-20 md:ml-32 lg:ml-40 rounded shadow">Unlock</button>
                    <button className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-3 px-5 border border-gray-400 xs:ml-20 sm:ml-20 md:ml-32 lg:ml-40 rounded shadow">Reset</button>
                </p>
            </>
        )
    }
}

const GoogleMap = GoogleApiWrapper({
    apiKey: 'AIzaSyBIka0wD5mEerRq7aSbxHqxBGPFYYVkp64'
})(MapContainer)


export default GoogleMap