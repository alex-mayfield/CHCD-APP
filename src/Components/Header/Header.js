import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {

  render() {
    return (
      <header>
      <div className="disclaimer"><b>Developer's Note:</b> The online educational platform of the China Historical Christians Database is still in development and built from a partial dataset on Shanxi. To offer comments on the current state of the platform, <a href="https://docs.google.com/forms/d/1SLj2tg3QR0sW8dkd1M2TydI_EMIOs0OwK3IUO9DlXGk/edit?usp=sharing" target="_blank">click here</a>.</div>
        <div className="links">
        <Link to="/"><div className="logo en"/></Link>

        <nav>
          <ul>
            <li className="first">
              <Link to="/">Map</Link>
            </li>
            <li>
              <Link to="/network">Network</Link>
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
        </div>
      </header>
    );
  }
}

export default Header;
