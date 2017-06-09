import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <h1 className="text-center">reactr</h1>
        <hr />
      </div>
    );
  }
}

export default Header;
