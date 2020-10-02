import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class HeaderZH extends Component {

  render() {
    return (
      <header>
        <Link to="/zh"><div className="logo zh"/></Link>

        <nav>
          <ul>
            <li className="first">
              <Link to="/zh">地图</Link>
            </li>
            <li>
              <Link to="/zh/network">网络</Link>
            </li>
            <li>
              <Link to="/zh/about">关于</Link>
            </li>
            <li className="last">
              <Link to="/zh/data">数据</Link>
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

export default HeaderZH;
