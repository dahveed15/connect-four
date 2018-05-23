import React, { Component } from 'react';
import './App.css';
import ResetButton from './resetButton';
import Tile from './tile';

// {this.state.gameBoard.map((val, idx) => 
//   <Tile />
// )}

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gameBoard: [
        '', '', '', '', '', '', '',
        '', '', '', '', '', '', '',
        '', '', '', '', '', '', '',
        '', '', '', '', '', '', '',
        '', '', '', '', '', '', '',
        '', '', '', '', '', '', ''
      ]
    }
  }
  
  render() {
    return (
      <div className="container">
        <div className="menu">
          <h1>Connect Four</h1>
        </div>
      
      </div>
    );
  }
}

export default App;
