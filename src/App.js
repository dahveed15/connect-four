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
      turn: 'red',
      winner: null
    }
  }
  
  updateBoard(loc) {
    //Checklist:
    
    
    let red = <div className="red-circle">
  </div>;
  
   let black = <div className="black-circle">
  </div>;
    
    //check if a move has already been made in a square
    
    //since '' is a falsy value, we can just check if that spot is empty or not
    if(this.state.gameBoard[loc] === red || this.state.gameBoard[loc] === black) {
      //don't do anything if the spot is filled (invalid move)
      return;
    }
    
    let currentGameBoard = this.state.gameBoard;    
    if(this.state.turn === 'red') {
      //replace the empty spot with a red circle
      currentGameBoard.splice(loc, 1, red);
    } else {
      currentGameBoard.splice(loc, 1, black);
    }  
    this.setState({gameBoard: currentGameBoard});
    
    
    //check if the move the player made won/tied the game
    
    //make sure you can't click on any squares after game over
    
    this.setState({turn: (this.state.turn === 'red') ? 'black' : 'red'})
  }
  
  resetBoard(){
    //we need to use the built-in setState method to ensure that state isn't mutated
    this.setState({
      gameBoard: [
        '', '', '', '', '', '', '',
        '', '', '', '', '', '', '',
        '', '', '', '', '', '', '',
        '', '', '', '', '', '', '',
        '', '', '', '', '', '', '',
        '', '', '', '', '', '', ''
      ],
      turn: 'red',
      winner: null
    })
  }
  
  render() {
    return (
      <div className="container">
        <div className="menu">
          <h1 className="text">Connect Four</h1>
          <Announcement winner={this.state.winner}/>
          <ResetButton reset={this.resetBoard.bind(this)}/>
        </div>
          
          {this.state.gameBoard.map((val, idx) => 
            <Tile key={idx}
                  loc={idx}
                  value={val}
                  updateBoard={this.updateBoard.bind(this)}/>
          )}
                    
      </div>
    );
  }
}

export default App;
