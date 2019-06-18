import React from 'react';
import './App.css';
import WeatherReport from '../WeatherReport';

class App extends React.Component {
  render () {  
    return (
      <div className="app">
        <header>
          <h2>Weather App</h2>
          <WeatherReport/>
        </header>
      </div>
    );
  }
}

export default App;
