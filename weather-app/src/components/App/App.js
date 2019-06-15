import React from 'react';
import './App.css';
import SearchBar from '../SearchBar';

class App extends React.Component {
  render () {  
    return (
      <div className="App">
        <header className="App-header">
          <h2>Weather App</h2>
          <SearchBar/>
        </header>
      </div>
    );
  }
}

export default App;
