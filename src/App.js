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
    
    //check if a red or black circle is already in a spot (console logging gameboard rules!)
    if(this.state.gameBoard[loc].type === 'div') {
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
    //don't show whose turn it is if the game is over
    let turnMessage = '';
    if(!this.state.winner) {
      //capitalize the string
      turnMessage = this.state.turn[0].toUpperCase() + this.state.turn.slice(1, this.state.turn.length) + "'s turn";
    }
    return (
      <div className="container">
        <div className="menu">
          <h1 className="text">Connect Four</h1>
          <h2 className="text">{turnMessage}</h2>
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
