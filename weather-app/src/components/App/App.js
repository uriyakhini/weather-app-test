import React from 'react';
import './App.css';
import SearchBar from '../SearchBar';
import WeatherReport from '../WeatherReport';

class App extends React.Component {
  constructor() {
    super();
    this.handleLocation = this.handleLocation.bind(this);
    this.state = {
      location: ''
    }
  }

  handleLocation(location) {
    this.setState({location: location});
  }

  render () {  
    return (
      <div className="App">
        <header className="App-header">
          <h2>Weather App</h2>
          <SearchBar onEnter={this.handleLocation}/>
          <WeatherReport location={this.state.location}/>
        </header>    
      </div>
    );
  }
}

export default App;
