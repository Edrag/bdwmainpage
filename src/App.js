import React from 'react';
import {LineChart, Line} from 'recharts';

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
      tempSens2Deg:'',
      tempSens2Time:'',
      tempSens3Deg:'',
      tempSens3Time:'',
      tempSens4Deg:'',
      tempSens4Time:'',
      tempSens5Deg:'',
      tempSens5Time:'',
      tempHist:'',
      intervalId:false
    }
    this.getTempSensors= this.getTempSensors.bind(this);
    this.handleInterval = this.handleInterval.bind(this);

  }
  
  redirect = () => {
    window.location.href='/berrycheckin';
  };

  home = () => {
    window.location.href='/';
  };

  componentDidMount = () => {
    this.getTempSensors();
    this.handleInterval();
    console.log(this.state.intervalId);
  };

  componentWillUnmount = () => {
    this.handleInterval()
  };

  handleInterval = () =>  {
    if(!this.state.intervalId) {
      intervalTimer = setInterval(this.getTempSensors,60000)
      this.setState({
        intervalId: true
      }) 
    } else  {
      clearInterval(intervalTimer)
    };
  }

  getTempSensors = async () => {
    try {
      let response = await fetch(`http://192.168.1.250:1880/packhouse/temp/packroom`);
      let responseJSON = await response.json();
      if(response.ok) {
        console.log(responseJSON);
        this.setState({
          tempSens1Deg:responseJSON.Temp,
          tempSens1Time:responseJSON.Time
        })
      }
      response = await fetch(`http://192.168.1.250:1880/packhouse/temp/rte`);
      responseJSON = await response.json();
      if(response.ok) {
        console.log(responseJSON);
        this.setState({
          tempSens2Deg:responseJSON.Temp,
          tempSens2Time:responseJSON.Time
        })
      }
      response = await fetch(`http://192.168.1.250:1880/packhouse/temp/dispatch`);
      responseJSON = await response.json();
      if(response.ok) {
        console.log(responseJSON);
        this.setState({
          tempSens3Deg:responseJSON.Temp,
          tempSens3Time:responseJSON.Time
        })
      }
      response = await fetch(`http://192.168.1.250:1880/packhouse/temp/freezer`);
      responseJSON = await response.json();
      if(response.ok) {
        console.log(responseJSON);
        this.setState({
          tempSens4Deg:responseJSON.Temp,
          tempSens4Time:responseJSON.Time
        })
      }
      response = await fetch(`http://192.168.1.250:1880/packhouse/temp/rawmaterial`);
      console.log(response);
      responseJSON = await response.json();
      if(response.ok) {
        console.log(responseJSON);
        this.setState({
          tempSens5Deg:responseJSON.Temp,
          tempSens5Time:responseJSON.Time
        })
      }
      response = await fetch(`http://192.168.1.250:1880/packhouse/temp/rawmaterial/history`);
      console.log(response);
      responseJSON = await response.json();
      if(response.ok) {
        console.log(responseJSON);
        this.setState({
          tempHist:responseJSON
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
            <div className="tempBox" onClick={()=>{window.location.href=`http://192.168.1.250:1880/packhouse/temp/packroom/history`}}>
              Packroom Temp
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
            <div className="tempBox" onClick={()=>{window.location.href=`http://192.168.1.250:1880/packhouse/temp/rte/history`}}>
              RTE Temp
              <table>
                <tbody>
                  <tr>
                    <td>Temp:</td>
                    <td className="dataCell">{this.state.tempSens2Deg}&deg;C</td>
                  </tr>
                  <tr>
                    <td>Updated:</td>
                    <td className="dataCell">{this.state.tempSens2Time}</td>
                  </tr>
                </tbody>                
              </table>
            </div>
            <div className="tempBox" onClick={()=>{window.location.href=`http://192.168.1.250:1880/packhouse/temp/dispatch/history`}}>
            Dispatch Temp
              <table>
                <tbody>
                  <tr>
                    <td>Temp:</td>
                    <td className="dataCell">{this.state.tempSens3Deg}&deg;C</td>
                  </tr>
                  <tr>
                    <td>Updated:</td>
                    <td className="dataCell">{this.state.tempSens3Time}</td>
                  </tr>
                </tbody>                
              </table>
            </div>
            <div className="tempBox" onClick={()=>{window.location.href=`http://192.168.1.250:1880/packhouse/temp/freezer/history`}}>
              Freezer Temp
              <table>
                <tbody>
                  <tr>
                    <td>Temp:</td>
                    <td className="dataCell">{this.state.tempSens4Deg}&deg;C</td>
                  </tr>
                  <tr>
                    <td>Updated:</td>
                    <td className="dataCell">{this.state.tempSens4Time}</td>
                  </tr>
                </tbody>                
              </table>
            </div>
            <div className="tempBox" onClick={()=>{window.location.href=`http://192.168.1.250:1880/packhouse/temp/rawmaterial/history`}}>
              Raw Material Temp
              <table>
                <tbody>
                  <tr>
                    <td>Temp:</td>
                    <td className="dataCell">{this.state.tempSens5Deg}&deg;C</td>
                  </tr>
                  <tr>
                    <td>Updated:</td>
                    <td className="dataCell">{this.state.tempSens5Time}</td>
                  </tr>
                </tbody>                
              </table>
            </div>            
          </div>
          <div  className="tempBox"  >
              <LineChart width={400} height={400} data={this.state.tempHist}>
                <Line type="monotone" dataKey="Temp" stroke="#8884d8" />
              </LineChart>
            </div>
        </div>
      </div>
    );
  }

}

export default App;
