// Import React and React DOM
import * as React from 'react'
import { render } from 'react-dom'

// Import Google Map component
import GoogleMapComponentWithMarker from './GoogleMapWithMarker'

// Some default styles
const styles = {
    width: '100%',
    height: '536px'
}

// Wrapper with Google Map component
class MapWrapper extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            infoboxMessage: '',
            isInfoboxVisible: false,
            markerLang: 0,
            markerLat: 0
        }
    }

    handleMarkerClick = (message: string, lang: number, lat: number) => {
        this.setState({
            infoboxMessage: message,
            isInfoboxVisible: !this.state.isInfoboxVisible,
            markerLang: lang + 0.006,
            markerLat: lat - 0.0004
        })
    }

    handleInfoboxClick = () => {
        this.setState({
            isInfoboxVisible: false
        })
    }

    render() {
        return (
            <div style={styles}>
                <GoogleMapComponentWithMarker
                    // Add your Google Map API key to make custom styles work!
                    //   googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key="
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBIka0wD5mEerRq7aSbxHqxBGPFYYVkp64"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    isInfoboxVisible={this.state.isInfoboxVisible}
                    infoboxMessage={this.state.infoboxMessage}
                    handleInfoboxClick={this.handleInfoboxClick}
                    handleMarkerClick={this.handleMarkerClick}
                    infoboxPosY={this.state.markerLang}
                    infoboxPosX={this.state.markerLat}
                />
            </div>
        )
    }
}

export default MapWrapper
