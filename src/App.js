import React from 'react';
import './App.css';

class App extends React.Component {
  
  redirect = () => {
    window.location.href='/berrycheckin';
  };

  render() {
    return (
      <div className="App">
        <button className="mainMenu" onClick={this.redirect}>Check Berries In</button>
      </div>
    );
  }

}

export default App;
