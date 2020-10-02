import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';


import Header from './Components/Header/Header';
import HeaderZH from './Components/Header/HeaderZH';
import HeaderTW from './Components/Header/HeaderTW';

import Footer from './Components/Footer/Footer';
import FooterZH from './Components/Footer/FooterZH';
import FooterTW from './Components/Footer/FooterTW';

import Network from './Components/Network/Network';
import NetworkZH from './Components/Network/NetworkZH';
import NetworkTW from './Components/Network/NetworkTW';


import Map from './Components/Map/Map';
import MapZH from './Components/Map/MapZH';
import MapTW from './Components/Map/MapTW';

import InstMap from './Components/Map/InstMap';
import InstMapZH from './Components/Map/InstMapZH';
import InstMapTW from './Components/Map/InstMapTW';


import About from './Components/Pages/About';
import AboutZH from './Components/Pages/AboutZH';
import AboutTW from './Components/Pages/AboutTW';

import Data from './Components/Pages/Data';
import DataZH from './Components/Pages/DataZH';
import DataTW from './Components/Pages/DataTW';


// App component
class App extends Component {
  render() {

    return (
      <Router>
        <div id="root">

        <Route exact path='/' component={Header} />
        <Route exact path='/' component={Map} />
            <Route exact path='/zh' component={HeaderZH} />
            <Route exact path='/zh' component={MapZH} />
                <Route exact path='/tw' component={HeaderTW} />
                <Route exact path='/tw' component={MapTW} />

        <Route exact path='/inst-map' component={Header} />
        <Route exact path='/inst-map' component={InstMap} />
            <Route exact path='/zh/inst-map' component={HeaderZH} />
            <Route exact path='/zh/inst-map' component={InstMapZH} />
                <Route exact path='/tw/inst-map' component={HeaderTW} />
                <Route exact path='/tw/inst-map' component={InstMapTW} />

        <Route exact path='/network' component={Header} />
        <Route exact path='/network' component={Network} />
            <Route exact path='/zh/network' component={HeaderZH} />
            <Route exact path='/zh/network' component={NetworkZH} />
                <Route exact path='/tw/network' component={HeaderTW} />
                <Route exact path='/tw/network' component={NetworkTW} />


        <Route exact path='/about' component={Header} />
        <Route exact path='/about' component={About} />
        <Route exact path='/about' component={Footer} />
            <Route exact path='/zh/about' component={HeaderZH} />
            <Route exact path='/zh/about' component={AboutZH} />
            <Route exact path='/zh/about' component={FooterZH} />
                <Route exact path='/tw/about' component={HeaderTW} />
                <Route exact path='/tw/about' component={AboutTW} />
                <Route exact path='/tw/about' component={FooterTW} />

        <Route exact path='/data' component={Header} />
        <Route exact path='/data' component={Data} />
        <Route exact path='/data' component={Footer} />
            <Route exact path='/zh/data' component={HeaderZH} />
            <Route exact path='/zh/data' component={DataZH} />
            <Route exact path='/zh/data' component={FooterZH} />
                <Route exact path='/tw/data' component={HeaderTW} />
                <Route exact path='/tw/data' component={DataTW} />
                <Route exact path='/tw/data' component={FooterTW} />

        </div>
      </Router>
    );

  }
}

export default App;
