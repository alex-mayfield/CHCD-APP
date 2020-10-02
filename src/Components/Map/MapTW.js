//IMPORTS

import React, { Component } from 'react';
import L from 'leaflet';
// postCSS import of Leaflet's CSS
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster-src.js';
import { PruneCluster, PruneClusterForLeaflet } from 'prunecluster/dist/PruneCluster.js'
import {NavLink} from 'react-router-dom';


// using webpack json loader we can import our geojson file like this
import geojson from 'json!../../Assets/json/geo-person.geojson';
import Data from '../../Assets/json/geo-person.json';

// import local components Filter and ForkMe
import Filter from '../Filter/FilterTW';
import InputRange from 'react-input-range';
import Individual from '../Individual/IndividualTW';

// STORES THE MAP PROPERTIES AS AN OBJECT



let config = {};
config.params = {
  center: [37.0269, 111.9167],
  zoomControl: false,
  zoom: 7,
  maxZoom: 15,
  minZoom: 6,
  scrollwheel: false,
  legends: true,
  infoControl: false,
  attributionControl: true
};
config.tileLayer = {
  uri: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
  params: {
    minZoom: 6,
    maxZoom: 15,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    id: '',
    accessToken: ''
  }
};
config.tileLayer2 = {
  uri: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
  params: {
    minZoom: 6,
    maxZoom: 15,
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
    id: '',
    accessToken: ''
  }
};

//ARRAYS THAT STORE UNIQUE VALUES OF FILTER LISTS

// this eventually gets passed down to the Filter component
let genderList = [];
let nationList = [];
let nameList = [];
let locatList = [];
let corpList = [];


class Map extends Component {


//INITIAL CONSTRUCTOR

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      tileLayer: null,
      geojsonLayer: null,
      cluster:null,
      geojson: null,
      numMarkers: null,
      popupClass: "hidden",
      popupFilter: '',
      listClass: "hidden",

      genderFilter: '*',
      nationFilter: '*',
      nameFilter: '*',
      locatFilter: '*',
      corpFilter: '*',

      value: { min: 1600, max: 1950 }


    };
    this.genderFilterUpdate = this.genderFilterUpdate.bind(this);
    this.nationFilterUpdate = this.nationFilterUpdate.bind(this);
    this.locatFilterUpdate = this.locatFilterUpdate.bind(this);
    this.corpFilterUpdate = this.corpFilterUpdate.bind(this);
    this.nameFilterUpdate = this.nameFilterUpdate.bind(this);
    this.resetFilterUpdate = this.resetFilterUpdate.bind(this);

    this.setPopup = this.setPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.openPopup = this.closePopup.bind(this);
    this.toggleList = this.toggleList.bind(this);

    this._mapNode = null;
    this.onEachFeature = this.onEachFeature.bind(this);
    this.pointToLayer = this.pointToLayer.bind(this);
    this.filterFeatures = this.filterFeatures.bind(this);
    this.filterGeoJSONLayer = this.filterGeoJSONLayer.bind(this);
  }



//CODE FOR MOUNTING AND CHECKING THE STATE OF THE MAP

    // code to run just after the component "mounts" / DOM elements are created
    // we could make an AJAX request for the GeoJSON data here if it wasn't stored locally
    // create the Leaflet map object
  componentDidMount() {
    setInterval(() => {
      let pass = popupPass;
      this.setState({popupFilter: pass});
      }, 500);
        this.getData();
    if (!this.state.map) this.init(this._mapNode);}

  componentDidUpdate(prevProps, prevState) {
    // code to run when the component receives new props or state
    // check to see if geojson is stored, map is created, and geojson overlay needs to be added
    // add the geojson overlay
    if (this.state.geojson && this.state.map && !this.state.geojsonLayer) {this.addGeoJSONLayer(this.state.geojson);}
    // check to see if the subway lines filter has changed
    // filter / re-render the geojson overlay
    if (
      this.state.value.min !== prevState.value.min ||
      this.state.value.max !== prevState.value.max ||
      this.state.popupClass !== prevState.popupClass ||
      this.state.listClass !== prevState.listClass ||
      this.state.nameFilter !== prevState.nameFilter ||
      this.state.genderFilter !== prevState.genderFilter ||
      this.state.locatFilter !== prevState.locatFilter ||
      this.state.corpFilter !== prevState.corpFilter ||
      this.state.nationFilter !== prevState.nationFilter
    ) {
        this.filterGeoJSONLayer();}}
    // code to run just before unmounting the component
    // this destroys the Leaflet map object & related event listeners

  componentWillUnmount() {this.state.map.remove();}
  // could also be an AJAX request that results in setting state with the geojson data
  // for simplicity sake we are just importing the geojson data using webpack's json loader
  getData() {this.setState({numMarkers: geojson.features.length,geojson});}


//ADDS GEOJSON LAYER

  addGeoJSONLayer(geojson) {
    // create a native Leaflet GeoJSON SVG Layer to add as an interactive overlay to the map
    // an options object is passed to define functions for customizing the layer
    const cluster = L.markerClusterGroup({
      spiderfyDistanceMultiplier: 1.75,
      showCoverageOnHover: true,
      maxClusterRadius: 60,
      singleMarkerMode: true,
      polygonOptions: {stroke: false, fillColor: '#000', fillOpacity: .1}});

    const geojsonLayer = L.geoJson(geojson, {
      onEachFeature: this.onEachFeature,
      pointToLayer: this.pointToLayer,
      filter: this.filterFeatures
    });
    cluster.addLayer(geojsonLayer);

    // add our GeoJSON layer to the Leaflet map object
    cluster.addTo(this.state.map);
    // store the Leaflet GeoJSON layer in our component state for use later
    this.setState({ geojsonLayer });
    this.setState({ cluster })
    // fit the geographic extent of the GeoJSON layer within the map's bounds / viewport
    this.zoomToFeature(cluster);
  }

//FILTERS GEOJSON DATA TO ONLY INCLUDE DATA WHICH MEETS FILTER CRITERIA
  filterGeoJSONLayer() {
    // clear the geojson layer of its data & re-add the geojson so that it filters out subway lines which do not match state.filter
    this.state.geojsonLayer.clearLayers();
    this.state.geojsonLayer.addData(geojson);
    //clear the cluster layer of data and re-add the updated geojson layer data
    this.state.cluster.clearLayers();
    this.state.cluster.addLayer(this.state.geojsonLayer);
    // fit the map to the new geojson layer's geographic extent
    this.zoomToFeature(this.state.cluster);
  }



//AUTOZOOM TO FIT FILTERED MAP TO SCREEN
  zoomToFeature(target) {
    // pad fitBounds() so features aren't hidden under the Filter UI element
    var fitBoundsParams = {
      paddingTopLeft: [250,10],
      paddingBottomRight: [10,10]
    };
    // set the map's center & zoom so that it fits the geographic extent of the layer
    this.state.map.fitBounds(target.getBounds(), fitBoundsParams);
  }



// RENDERS POINTS AS CIRCLES
  pointToLayer(feature, latlng) {
    var markerParams = {
      radius: 7,
      fillColor: '#333333',
      color: '#333333',
      weight: 1,
      opacity: 0.75,
      fillOpacity: 0.8
    };

    return L.circleMarker(latlng, markerParams);
  }



  //SETS THE VALUE FOR FILTERING

    genderFilterUpdate(e) {
      let gender = e.target.value; if (gender === "All") {gender = "*";}
      this.setState({ genderFilter: gender});
    }

    nationFilterUpdate(e) {
      let nationality = e.target.value; if (nationality === "All") {nationality = "*";}
      this.setState({nationFilter: nationality});
    }

    nameFilterUpdate(e) {
      let name = e.target.value; if (name === "All") {name = "*";}
      this.setState({nameFilter: name});
    }

    locatFilterUpdate(e) {
      let locat = e.target.value; if (locat === "All") {locat = "*";}
      this.setState({locatFilter: locat});
    }

    corpFilterUpdate(e) {
      let corp = e.target.value; if (corp === "All") {corp = "*";}
      this.setState({corpFilter: corp});
    }

    resetFilterUpdate() {
      window.location.reload();
    }

// TOGGLES POPUP

    setPopup() {
      let pass = popupPass;
      this.setState({popupFilter: pass });
      console.log(this.state.popupFilter)
    }

    closePopup() {
      var element = document.getElementById("hiddendata")
      element.classList.toggle("dataPopup");
      this.setState({popupFilter: '' });
   }

   openPopup() {
     window.popupPass = "test"
     let pass = popupPass;
     this.setState({popupFilter: pass });
     var element = document.getElementById("hiddendata")
     element.classList.toggle("dataPopup");
  }

    toggleList() {
      if (this.state.listClass === "hidden"){this.setState({listClass: "list"});}
      else if (this.state.listClass === "list") {this.setState({listClass: "hidden"});}
   }



//FILTERS THE MARKERS // passes value to const geojsonLayer = L.geoJson(geojson, { ... filter:

    filterFeatures(feature, layer) {
    // filter the markers based on the map's current search filter

    const mainfilter =  feature.properties.gender.concat(feature.properties.nationality).concat(feature.properties.name_en).concat(feature.properties.corp_name_en).concat(feature.properties.location_name_en);
    const gendertest = mainfilter.includes(this.state.genderFilter);
    const nationtest = mainfilter.includes(this.state.nationFilter);
    const nametest = mainfilter.includes(this.state.nameFilter);
    const locattest = mainfilter.includes(this.state.locatFilter);
    const corptest = mainfilter.includes(this.state.corpFilter);

  //NO FILTERS
    if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.genderFilter === '*' && this.state.nationFilter === '*' && this.state.nameFilter === '*' && this.state.corpFilter === '*' && this.state.locatFilter === '*') {return true;}
  //SINGLE FILTERS
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.nationFilter === '*' && this.state.nameFilter === '*' && this.state.locatFilter === '*' && this.state.corpFilter === '*' && gendertest === true ) {return true;} //GENDER
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.nationFilter === '*' && this.state.nameFilter === '*' && this.state.genderFilter === '*' && this.state.corpFilter === '*' &&  locattest === true ) {return true;} //LOCAT
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.genderFilter === '*' && this.state.nationFilter === '*' && this.state.locatFilter === '*' && this.state.corpFilter === '*' && nametest === true ) {return true;} //NAME
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.nationFilter === '*' && this.state.nameFilter === '*' && this.state.locatFilter === '*' && this.state.genderFilter === '*' && corptest === true ) {return true;} //CORP
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.genderFilter === '*' && this.state.nameFilter === '*' && this.state.locatFilter === '*' && this.state.corpFilter === '*' && nationtest === true ) {return true;} //NATION
  //DOUBLE FILTERS
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.nationFilter === '*' && this.state.nameFilter === '*' && this.state.corpFilter === '*' && gendertest === true && locattest === true ) {return true;} //GENDER & LOCAT
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.nationFilter === '*' && this.state.corpFilter === '*' && this.state.locatFilter === '*' && gendertest === true && nametest === true ) {return true;} //GENDER & NAME
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.nationFilter === '*' && this.state.nameFilter === '*' && this.state.locatFilter === '*' && gendertest === true && corptest === true ) {return true;} //GENDER & CORP
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.locatFilter === '*' && this.state.nameFilter === '*' && this.state.corpFilter === '*' && gendertest === true && nationtest === true ) {return true;} //GENDER & NATION
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.nationFilter === '*' && this.state.corpFilter === '*' && this.state.genderFilter === '*' && locattest === true && nametest === true ) {return true;} //LOCAT & NAME
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.nationFilter === '*' && this.state.nameFilter === '*' && this.state.genderFilter === '*' && locattest === true && corptest === true ) {return true;} //LOCAT & CORP
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.genderFilter === '*' && this.state.corpFilter === '*' && this.state.nameFilter === '*' && locattest === true && nationtest === true ) {return true;} //LOCAT & NATION
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.genderFilter === '*' && this.state.nationFilter === '*' && this.state.locatFilter === '*' && corptest === true && nametest === true ) {return true;} //NAME & CORP
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.genderFilter === '*' && this.state.locatFilter === '*' && this.state.corpFilter === '*' && nationtest === true && nametest === true ) {return true;} //NAME & NATION
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.genderFilter === '*' && this.state.locatFilter === '*' && this.state.nameFilter === '*' && nationtest === true && corptest === true ) {return true;} //CORP & NATION
  // TRIPLE FILTERS
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.corpFilter === '*' && this.state.nationFilter === '*' && gendertest === true && locattest === true  && nametest === true) {return true;} //GENDER & LOCAT & NAME
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.nameFilter === '*' && this.state.nationFilter === '*' && gendertest === true && locattest === true  && corptest === true) {return true;} //GENDER & LOCAT & CORP
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.nameFilter === '*' && this.state.corpFilter === '*' && gendertest === true && locattest === true  && nationtest === true) {return true;} //GENDER & LOCAT & NATION
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.locatFilter === '*' && this.state.nationFilter === '*' && gendertest === true && corptest === true  && nametest === true) {return true;} //GENDER & NAME & CORP
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.locatFilter === '*' && this.state.corpFilter === '*' && gendertest === true && nationtest === true  && nametest === true) {return true;} //GENDER & NAME & NATION
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.locatFilter === '*' && this.state.nameFilter === '*' && gendertest === true && nationtest === true  && corptest === true) {return true;} //GENDER & CORP & NATION
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.nationFilter === '*' && this.state.genderFilter === '*' && corptest === true && locattest === true  && nametest === true) {return true;} //LOCAT & NAME & CORP
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.corpFilter === '*' && this.state.genderFilter === '*' && nationtest === true && locattest === true  && nametest === true) {return true;} //LOCAT & NAME & NATION
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.nameFilter === '*' && this.state.genderFilter === '*' && nationtest === true && locattest === true  && corptest === true) {return true;} //LOCAT & CORP & NATION
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.locatFilter === '*' && this.state.genderFilter === '*' && nationtest === true && corptest === true  && nametest === true) {return true;} //NAME & NATION & CORP
  //QUADRUPLE FILTERS
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.nationFilter === '*' && gendertest === true && locattest === true  && nametest === true && corptest === true) {return true;} //GENDER & LOCAT & NAME & CORP
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.corpFilter === '*' && gendertest === true && locattest === true  && nametest === true && nationtest === true) {return true;} //GENDER & LOCAT & NAME & NATION
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.nameFilter === '*' && gendertest === true && locattest === true  && nationtest === true && corptest === true) {return true;} //GENDER & LOCAT & CORP & NATION
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.locatFilter === '*' && gendertest === true && nationtest === true  && nametest === true && corptest === true) {return true;} //GENDER & NAME & CORP & NATION
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && this.state.genderFilter === '*' && locattest === true && nationtest === true  && nametest === true && corptest === true) {return true;} //LOCAT & NAME & CORP & NATION
  //ALL FILTERS
    else if (this.state.value.min <= feature.properties.start_year && this.state.value.max >= feature.properties.start_year && gendertest === true && locattest === true && nationtest === true  && nametest === true && corptest === true) {return true;}
}



// LOOPS THROUGH MARKERS TO CREATE ARRAYS TO PASS TO FILTER AND TO CREATE POPPUPS

  onEachFeature(feature, layer) {
    if (feature.properties.gender || feature.properties.nationality || feature.properties.name_en || feature.properties.location_name_en || feature.properties.corp_name_en) {

// create gender array for list
      if (genderList.length < 3) {
        // add gender if it doesn't yet exist in the array
        feature.properties.gender.split().forEach(
          function(line, index){
          if (genderList.indexOf(line) === -1) genderList.push(line);});
      } else if (genderList.length === 3) {genderList.sort(); genderList.unshift('All');}
// create nationality array for list
      if (nationList.length < 17) {
        // add nationality name if it doesn't yet exist in the array
        feature.properties.nationality.split().forEach(
          function(line, index){
          if (nationList.indexOf(line) === -1) nationList.push(line);});
      } else if (nationList.length === 17) {nationList.sort(); nationList.unshift('All');}
// create name array for list
      if (nameList.length < 1057) {
        // add nationality name if it doesn't yet exist in the array
        feature.properties.name_en.split().forEach(
          function(line, index){
          if (nameList.indexOf(line) === -1) nameList.push(line);});
      } else if (nameList.length === 1057) {nameList.sort(); nameList.unshift('All');}

// create locat array for list
      if (locatList.length < 94) {
        // add nationality name if it doesn't yet exist in the array
        feature.properties.location_name_en.split().forEach(
          function(line, index){
          if (locatList.indexOf(line) === -1) locatList.push(line);});
      } else if (locatList.length === 94) {locatList.sort(); locatList.unshift('All');}

// create corp array for list
      if (corpList.length < 26) {
        // add nationality name if it doesn't yet exist in the array
        feature.properties.corp_name_en.split().forEach(
          function(line, index){
          if (corpList.indexOf(line) === -1) corpList.push(line);});
      } else if (corpList.length === 26) {corpList.sort(); corpList.unshift('All');}
// assemble the HTML for the markers' popups (Leaflet's bindPopup method doesn't accept React JSX)
        var popupContent =
          `<h4>${feature.properties.name_en}</h4>
          <strong>性別: </strong>${feature.properties.gender}
          </br>
          <strong>國籍： </strong>${feature.properties.nationality}
          </br>
          <strong>開始年份： </strong>${feature.properties.start_year}
          </br>
          <strong>結束年份： </strong>${feature.properties.end_year}
          </br>
          <strong>聯繫：</strong>${feature.properties.corp_name_en}
          </br>
          <strong>地點： </strong>${feature.properties.location_name_en}
          </br>
          <button class="popupbutton" onclick="showPopup('${feature.properties.name_en}')">學到更多</button>
          `;

        // add our popups
        layer.bindPopup(popupContent)

    }
  }


// CREATES LEAFLET MAP OBJECT

  init(id) {
    if (this.state.map) return;
    // this function creates the Leaflet map object and is called after the Map component mounts
    let map = L.map(id, config.params);

    L.control.zoom({ position: "bottomright"}).addTo(map);
    L.control.scale({ position: "bottomright"}).addTo(map);

    // a TileLayer is used as the "basemap"
    const tileLayer2 = L.tileLayer(config.tileLayer2.uri, config.tileLayer2.params).addTo(map);
    const tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);
    var baseMaps = {"地形": tileLayer2,"灰度": tileLayer};

    L.control.layers(baseMaps).addTo(map);

    // set our state to include the tile layer
    this.setState({ map, tileLayer, tileLayer2 });
  };


// RENDERS EVERYTHING

  render() {

    const filteredData = Data.filter(item => {

      const mainfilter =  item.gender.concat(item.nationality).concat(item.name_en).concat(item.corp_name_en).concat(item.location_name_en);;
      const gendertest = mainfilter.includes(this.state.genderFilter);
      const nationtest = mainfilter.includes(this.state.nationFilter);
      const nametest = mainfilter.includes(this.state.nameFilter);
      const corptest = mainfilter.includes(this.state.corpFilter);
      const locattest = mainfilter.includes(this.state.locatFilter);

      //NO FILTERS
        if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.genderFilter === '*' && this.state.nationFilter === '*' && this.state.nameFilter === '*' && this.state.corpFilter === '*' && this.state.locatFilter === '*') {return true;}
      //SINGLE FILTERS
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.nationFilter === '*' && this.state.nameFilter === '*' && this.state.locatFilter === '*' && this.state.corpFilter === '*' && gendertest === true ) {return true;} //GENDER
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.nationFilter === '*' && this.state.nameFilter === '*' && this.state.genderFilter === '*' && this.state.corpFilter === '*' &&  locattest === true ) {return true;} //LOCAT
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.genderFilter === '*' && this.state.nationFilter === '*' && this.state.locatFilter === '*' && this.state.corpFilter === '*' && nametest === true ) {return true;} //NAME
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.nationFilter === '*' && this.state.nameFilter === '*' && this.state.locatFilter === '*' && this.state.genderFilter === '*' && corptest === true ) {return true;} //CORP
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.genderFilter === '*' && this.state.nameFilter === '*' && this.state.locatFilter === '*' && this.state.corpFilter === '*' && nationtest === true ) {return true;} //NATION
      //DOUBLE FILTERS
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.nationFilter === '*' && this.state.nameFilter === '*' && this.state.corpFilter === '*' && gendertest === true && locattest === true ) {return true;} //GENDER & LOCAT
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.nationFilter === '*' && this.state.corpFilter === '*' && this.state.locatFilter === '*' && gendertest === true && nametest === true ) {return true;} //GENDER & NAME
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.nationFilter === '*' && this.state.nameFilter === '*' && this.state.locatFilter === '*' && gendertest === true && corptest === true ) {return true;} //GENDER & CORP
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.locatFilter === '*' && this.state.nameFilter === '*' && this.state.corpFilter === '*' && gendertest === true && nationtest === true ) {return true;} //GENDER & NATION
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.nationFilter === '*' && this.state.corpFilter === '*' && this.state.genderFilter === '*' && locattest === true && nametest === true ) {return true;} //LOCAT & NAME
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.nationFilter === '*' && this.state.nameFilter === '*' && this.state.genderFilter === '*' && locattest === true && corptest === true ) {return true;} //LOCAT & CORP
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.genderFilter === '*' && this.state.corpFilter === '*' && this.state.nameFilter === '*' && locattest === true && nationtest === true ) {return true;} //LOCAT & NATION
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.genderFilter === '*' && this.state.nationFilter === '*' && this.state.locatFilter === '*' && corptest === true && nametest === true ) {return true;} //NAME & CORP
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.genderFilter === '*' && this.state.locatFilter === '*' && this.state.corpFilter === '*' && nationtest === true && nametest === true ) {return true;} //NAME & NATION
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.genderFilter === '*' && this.state.locatFilter === '*' && this.state.nameFilter === '*' && nationtest === true && corptest === true ) {return true;} //CORP & NATION
      // TRIPLE FILTERS
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.corpFilter === '*' && this.state.nationFilter === '*' && gendertest === true && locattest === true  && nametest === true) {return true;} //GENDER & LOCAT & NAME
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.nameFilter === '*' && this.state.nationFilter === '*' && gendertest === true && locattest === true  && corptest === true) {return true;} //GENDER & LOCAT & CORP
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.nameFilter === '*' && this.state.corpFilter === '*' && gendertest === true && locattest === true  && nationtest === true) {return true;} //GENDER & LOCAT & NATION
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.locatFilter === '*' && this.state.nationFilter === '*' && gendertest === true && corptest === true  && nametest === true) {return true;} //GENDER & NAME & CORP
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.locatFilter === '*' && this.state.corpFilter === '*' && gendertest === true && nationtest === true  && nametest === true) {return true;} //GENDER & NAME & NATION
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.locatFilter === '*' && this.state.nameFilter === '*' && gendertest === true && nationtest === true  && corptest === true) {return true;} //GENDER & CORP & NATION
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.nationFilter === '*' && this.state.genderFilter === '*' && corptest === true && locattest === true  && nametest === true) {return true;} //LOCAT & NAME & CORP
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.corpFilter === '*' && this.state.genderFilter === '*' && nationtest === true && locattest === true  && nametest === true) {return true;} //LOCAT & NAME & NATION
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.nameFilter === '*' && this.state.genderFilter === '*' && nationtest === true && locattest === true  && corptest === true) {return true;} //LOCAT & CORP & NATION
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.locatFilter === '*' && this.state.genderFilter === '*' && nationtest === true && corptest === true  && nametest === true) {return true;} //NAME & NATION & CORP
      //QUADRUPLE FILTERS
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.nationFilter === '*' && gendertest === true && locattest === true  && nametest === true && corptest === true) {return true;} //GENDER & LOCAT & NAME & CORP
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.corpFilter === '*' && gendertest === true && locattest === true  && nametest === true && nationtest === true) {return true;} //GENDER & LOCAT & NAME & NATION
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.nameFilter === '*' && gendertest === true && locattest === true  && nationtest === true && corptest === true) {return true;} //GENDER & LOCAT & CORP & NATION
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.locatFilter === '*' && gendertest === true && nationtest === true  && nametest === true && corptest === true) {return true;} //GENDER & NAME & CORP & NATION
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && this.state.genderFilter === '*' && locattest === true && nationtest === true  && nametest === true && corptest === true) {return true;} //LOCAT & NAME & CORP & NATION
      //ALL FILTERS
        else if (this.state.value.min <= item.start_year && this.state.value.max >= item.start_year && gendertest === true && locattest === true && nationtest === true  && nametest === true && corptest === true) {return true;}

    });

    return (
      <div className="fullPage">

        <div id="hiddendata">
          {<Individual
            set={this.setPopup}
            close={this.closePopup}
            init={this.state.popupFilter}
            />}
        </div>


        <div className="filterColumn">
        <h6>探索</h6>
        <h5><NavLink exact={true} activeClassName='active' to="/tw">人們</NavLink> | <NavLink exact={true} activeClassName='active' to="/tw/inst-map">機構</NavLink></h5>

          <div className="slider">
            {<InputRange
              maxValue={1950}
              minValue={1600}
              value={this.state.value}
              onChange={value => this.setState({ value: value })}
            />}
          </div>
          <div className="entry">
            {<Filter
                genders={genderList}
                nations={nationList}
                names={nameList}
                locats={locatList}
                corps={corpList}
                genderfilter={this.genderFilterUpdate}
                nationfilter={this.nationFilterUpdate}
                namefilter={this.nameFilterUpdate}
                locatfilter={this.locatFilterUpdate}
                corpfilter={this.corpFilterUpdate}
                />}
            <button type="button" onClick={ this.resetFilterUpdate.bind(this) }>重啟</button>

            <div className="container">
              <label className="switch" for="checkbox">
                <input type="checkbox" id="checkbox" onClick={ this.toggleList}/>
                <div className="slide round tw"></div>
              </label>
            </div>
          </div>
        </div>



        <div className={this.state.listClass} >
          <div className="itemCard-dark">
            <div className="itemColumn">Name</div>
            <div className="itemColumn">Institution</div>
            <div className="itemColumn">Affiliated With</div>
            <div className="itemColumn">Location</div>
            <div className="itemColumn10">Dates</div>
            <div className="itemColumn10">Nationality</div>
            <div className="itemColumn10">Gender</div>
          </div>
            {filteredData.map((item, index) => {
              let name = `${item.name_en}`;
              return <div className="itemCard">
                <div className="itemColumn"><button type="button" value={name} onClick={ pushPopup }>{item.name_en}</button></div>
                <div className="itemColumn"><button type="button" value={item.inst_name_en} onClick={ pushPopup }>{item.inst_name_en}</button></div>
                <div className="itemColumn"><button type="button" value={item.corp_name_en} onClick={ pushPopup }>{item.corp_name_en}</button></div>
                <div className="itemColumn">{item.location_name_en}</div>
                <div className="itemColumn10">{item.start_year}-{item.end_year}</div>
                <div className="itemColumn10">{item.nationality}</div>
                <div className="itemColumn10">{item.gender}</div>

              </div>
            })}
        </div>



        <div className="map" ref={(node) => this._mapNode = node}/>


    </div>
    );
  }
}

export default Map;
