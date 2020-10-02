import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {

  render() {
    return (
      <header>
        <Link to="/"><div className="logo en"/></Link>

        <nav>
          <ul>
            <li className="first">
              <Link to="/">Map</Link>
            </li>
            <li>
              <Link to="/network">Network</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li className="last">
              <Link to="/data">Data</Link>
            </li>
          </ul>
        </nav>

        <div className="langselect">
          <ul>
            <li>
              <Link to="/">EN</Link>
            </li>
            <li>
              <Link to="/zh">中国</Link>
            </li>
            <li>
              <Link to="/tw">中國</Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;
