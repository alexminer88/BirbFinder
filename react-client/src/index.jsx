import React from 'react';
import ReactDOM from 'react-dom';

import RecentBirdList from './components/RecentBirdList.jsx';
import RecentBirdStats from './components/RecentBirdStats.jsx';
import SimpleMap from './components/SimpleMap.jsx';
import AddressForm from './components/AddressForm.jsx';

const axios = require('axios');
const { birdAPIKey, googleAPIKey } = require('../../birdAPI.js');
const googleMapsClient = require('@google/maps').createClient({
  key: googleAPIKey,
  Promise: Promise
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      recentBirds: [],
      birdStats: {},
      birdStatsArr: [],
      latLng: {},
      county: '',
      countyCode: '',
    }
    //bindings
    this.updateAddress = this.updateAddress.bind(this);
  }


  getCounty(dataArr) {
    let result = dataArr.filter(obj => {
      return obj.types.indexOf("administrative_area_level_2") > -1;
    }).reduce((acc, el) => {
      return el.formatted_address.split(' County,')[0];
    }, '');
    this.setState({
      county: result,
    });
  }

  setLatLng(lat, lng) {
    this.setState({
      latLng: { lat, lng },
    });
  }

  getCountyCode(county) {
    return axios.get(`https://ebird.org/ws2.0/ref/region/list/subnational2/US.json`, {
      headers: {'X-eBirdApiToken': birdAPIKey}
    }).then((res) => {
      let countyCode = res.data.filter(obj => {
        return obj.name === county
      }).reduce((acc, el) => {
        return acc + el.code
      }, '');
      this.setState({
        countyCode: countyCode,
      });
      return countyCode;
    }).catch((err) => {
      throw err;
    });

  }

  updateAddress(address) {
    let lat;
    let lng;
    console.log('address: ', address);
    googleMapsClient.geocode({address: address})
      .asPromise()
      .then((response) => {
        console.log(response.json.results[0].geometry);
        lat = response.json.results[0].geometry.location.lat;
        lng = response.json.results[0].geometry.location.lng;
        console.log(lat, lng);
        this.setState({
          latLng: { lat, lng },
        });
        this.updateBirdList(lat, lng);
      })
      .catch((err) => {
        console.log('from err: ', err)
        throw err;
      });
  }
  
  updateBirdList(lat, lng) {
    googleMapsClient.reverseGeocode({latlng:[lat, lng]})
    // googleMapsClient.reverseGeocode({latlng:[40, -122.39]})
      .asPromise()
      .then((response) => {
        // console.log('the data is: ', response.json.results);
        this.getCounty(response.json.results);
        return this.getCountyCode(this.state.county);
        })
      .then((countyCode) => {
        console.log(countyCode);
        return axios.get(`https://ebird.org/ws2.0/data/obs/${countyCode}/recent/notable`, {
          headers: { 'X-eBirdApiToken': birdAPIKey },
        });
      })
      .then(res => {
        // console.log('hello frrom here',res);
        let recentBirds = res.data;
        let birdStats = {};
        recentBirds.forEach((bird) => {
          if (birdStats[bird.comName] === undefined) {
            birdStats[bird.comName] = 1;
          } else {
            birdStats[bird.comName]++;
          }
        });
        
        let birdStatsArr = [];
        for (let key in birdStats) {
          birdStatsArr.push([key, birdStats[key]]);
        }
        birdStatsArr.sort((a, b) => {
          return b[1] - a[1];
        });
  
        this.setState({
          recentBirds: recentBirds,
          birdStats: birdStats,
          birdStatsArr: birdStatsArr,
        });
      })
      .catch(err => {
        // console.log('the error is', err);
        throw err;
      });
    
  }

  componentDidMount() {

    if(navigator.geolocation) {
      let location = navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        this.setState({
          latLng: {lat, lng},
        });
        this.updateBirdList(lat, lng);
      });
    }
  }

  render () {
    return (<div>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
        <div style={{width: '70%', height: '500px', padding: '50px 0 0 0'}}>
          <SimpleMap latLng={this.state.latLng}/>
        </div>

        <RecentBirdStats birdStatsArr={ this.state.birdStatsArr }/> 
      </div>
      <AddressForm updateAddress={this.updateAddress}/>
      <RecentBirdList recentBirds={this.state.recentBirds} birdStatsArr={this.state.birdStatsArr}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));