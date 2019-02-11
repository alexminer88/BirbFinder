import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
const { birdAPIKey, googleAPIKey } = require('../../../birdAPI.js'); 

const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'blue',
    padding: '5px 5px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {/* {text} */}
  </div>
);

class SimpleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultCenter: { lat: 37.9087487, lng: 122.2896895 },
      // center: this.props.latLng,
      center: {},
      zoom: 11
    };
  }


  componentDidMount() {
    this.setState({
      center: this.props.latLng,
      // center: this.props,
    });
  }

  render() {
    // console.log(this.props.latLng);
    return (
       <GoogleMapReact
        bootstrapURLKeys={{ key: googleAPIKey }}
        center={this.props.latLng}
        zoom={this.state.zoom}
        onDrag={()=>{}}
      >
        <AnyReactComponent 
          lat={this.state.center.lat} 
          lng={this.state.center.lng} 
          text={'You!'} 
        />
      </GoogleMapReact>
    );
  }
}
 
export default SimpleMap;