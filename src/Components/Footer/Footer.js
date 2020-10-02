import React, { Component } from 'react';


class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }
  componentDidMount() {
    var that = this;
    var year = new Date().getFullYear();
    that.setState({date: year});
  }

  render() {
    return (
      <footer>
        <div className="copyright">
          <div className="footer_column">
            <a href="https://www.bu.edu/" target="_blank"><img className="footer-logo" src="src\Assets\images\bu.png" alt=""/></a>
          </div>
          <div className="footer_column">
            <a href="http://www.bu.edu/cgcm/" target="_blank"><img className="footer-logo" src="src\Assets\images\cgcm.png" alt=""/></a>
          </div>
          <div className="footer_column">
            <p> Copyright &copy; {this.state.date} | <a href="http://www.bu.edu/cgcm/" target="_blank">Center for Global Christianity and Mission</a>, <a href="http://www.bu.edu/" target="_blank">Boston University</a>.</p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
