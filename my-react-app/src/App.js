import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import * as Nominatim from 'nominatim-browser';
import { isArray } from 'util';

import './App.css';
import SearchItem from './SearchItem/SearchItem'


var myIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [22, 94],
  popupAnchor: [-10, -90]
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
      displayName: 'London',
      searchInput: '',
      searchListItems: [],
      poligon: [[51.5, -0.06], [51.52, -0.06], [51.52, -0.12], [51.5, -0.12]]
    };
  }

  handleSearchInputChange = (e) => {
    this.setState({ searchInput: e.target.value });
  }

  handleSearchButtonClick = () => {
    Nominatim.geocode({
      q: this.state.searchInput,
      polygon_geojson: 1
    })
      .then((results) => {
        if (results.length > 0) {
          this.setState(
            {
              lat: results[0].lat,
              lng: results[0].lon,
              zoom: 15,
              displayName: results[0].display_name,
              searchListItems: results,
              poligon: results[0].geojson.coordinates[0]
            });
        }
        else {
          alert('no results!')
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onSearchListClick = (event) => {
    this.setState({
      lat: this.state.searchListItems[event.currentTarget.dataset.id].lat,
      lng: this.state.searchListItems[event.currentTarget.dataset.id].lon,
      zoom: 15,
      displayName: this.state.searchListItems[event.currentTarget.dataset.id].display_name,
      poligon: this.state.searchListItems[event.currentTarget.dataset.id].geojson.coordinates
    });
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const displayName = this.state.displayName;
    let polygonArr = [];
    if (isArray(this.state.poligon[0][0])) {
      polygonArr = this.state.poligon[0];
    } else {
      polygonArr = this.state.poligon;
    }

    return (
      <div>
        <div id="mapid"></div>
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={position}
            icon={myIcon}
          >
            <Popup>
              {displayName}
            </Popup>
          </Marker>
          {/* doesn't work with data from geojson */}
          {/* <Polygon key="polygon" color="purple" positions={polygonArr} /> */}
        </Map>
        <SearchItem
          value={this.state.searchListItems}
          onClick={this.handleSearchButtonClick}
          onChange={this.handleSearchInputChange}
          onSearchListClick={this.onSearchListClick}
        >
        </SearchItem>
      </div>
    );
  }
}

export default App;