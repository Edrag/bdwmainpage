import React from 'react';
import './App.css';
import Banner from './main_house_berry_orchard.jpg';
import Logo from './BdW_logo_pruple_50.png';

let intervalTimer
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      tempSens1Deg:'',
      tempSens1Time:'',
      intervalId:false
    }
    this.getTempSensor1= this.getTempSensor1.bind(this);
    this.handleInterval = this.handleInterval.bind(this);
  }
  
  redirect = () => {
    window.location.href='/berrycheckin';
  };

  home = () => {
    window.location.href='/';
  };

  componentDidMount = () => {
    this.getTempSensor1();
    this.handleInterval();
    console.log(this.state.intervalId);
  };

  componentWillUnmount = () => {
    this.handleInterval()
  };

  handleInterval = () =>  {
    if(!this.state.intervalId) {
      intervalTimer = setInterval(this.getTempSensor1,60000)
      this.setState({
        intervalId: true
      }) 
    } else  {
      clearInterval(intervalTimer)
    };
  }

  getTempSensor1 = async () => {
    try {
      const response = await fetch(`http://192.168.1.250:1880/temp`);
      const responseJSON = await response.json();
      if(response.ok) {
        console.log(responseJSON);
        this.setState({
          tempSens1Deg:responseJSON.Temp,
          tempSens1Time:responseJSON.Time
        })
      }

    } catch(error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <div className="logoDiv">
          <img src={Logo} className="logo" alt="BdW Logo" onClick={this.home}/>
        </div>        
        <div className="bannerDiv">
          <img src={Banner} className="banner" alt="Main house with berry orchard"/>
        </div>        
        <h1 className="pageHeading">By den Weg Internal Portal</h1>
        <div className="Menu">
          <button className="menuButton" onClick={this.redirect}>Berries Receiving</button>
        </div>
        <div>
          <h2>Packhouse Overview</h2>
          <div className="overviewDiv">
            <div className="tempBox">
              Coldroom 1 Temp
              <table>
                <tbody>
                  <tr>
                    <td>Temp:</td>
                    <td className="dataCell">{this.state.tempSens1Deg}&deg;C</td>
                  </tr>
                  <tr>
                    <td>Updated:</td>
                    <td className="dataCell">{this.state.tempSens1Time}</td>
                  </tr>
                </tbody>                
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
