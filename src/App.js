import React from 'react';
import './App.css';
import Banner from './main_house_berry_orchard.jpg';
import Logo from './BdW_logo_pruple_50.png';

class App extends React.Component {
  
  redirect = () => {
    window.location.href='/berrycheckin';
  };

  home = () => {
    window.location.href='www.bdw.site';
  }

  render() {
    return (
      <div>
        <img src={Logo} className="logo" alt="BdW Logo" onClick={this.home}/>
        <img src={Banner} className="banner" alt="Main house with berry orchard"/>
        <h1 className="pageHeading">By den Weg Internal Portal</h1>
        <div className="Menu">
          <button className="menuButton" onClick={this.redirect}>Berries Receiving</button>
        </div>
        <div>
          <p><h2>Packhouse Overview</h2></p>
          <div className="overviewDiv">
            <div className="tempBox">
              Coldroom 1 Temp
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
