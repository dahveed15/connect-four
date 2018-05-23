import React, { Component } from 'react';
import './App.css';
import Announcement from './announcement';
import ResetButton from './resetButton';
import Tile from './tile';


//we need to bind the context of this to updateboard so the tile component can know that this refers to app component

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
      ],
      turn: 'red'
    }
  }
  
  updateBoard(loc, player) {
    //Checklist:
    
    //check if a move has already been made in a square
    //check if the move the player made won/tied the game
    //allow the player to reset the board if they choose to when game is won and make sure you can't click on any squares after game over
      
  }
  
  render() {
    return (
      <div className="container">
        <div className="menu">
          <h1 className="text">Connect Four</h1>
          <Announcement/>
          <ResetButton />
        </div>
          
          {this.state.gameBoard.map((val, idx) => 
            <Tile key={idx}
                  loc={idx}
                  val={val}
                  updateBoard={this.updateBoard.bind(this)}
                  turn={this.state.turn}/>
          )}
          
      </div>
    );
  }
}

export default App;
