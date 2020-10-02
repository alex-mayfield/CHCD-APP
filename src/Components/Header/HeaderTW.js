import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class HeaderTW extends Component {

  render() {
    return (
      <header>
        <Link to="/tw"><div className="logo tw"/></Link>

        <nav>
          <ul>
            <li className="first">
              <Link to="/tw">地圖</Link>
            </li>
            <li>
              <Link to="/tw/network">網絡</Link>
            </li>
            <li>
              <Link to="/tw/about">關於</Link>
            </li>
            <li className="last">
              <Link to="/tw/data">數據</Link>
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

export default HeaderTW;
