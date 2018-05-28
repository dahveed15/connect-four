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
    
    //check if a move has already been made in a square
    
    //check if a red or black circle is already in a spot (console logging gameBoard rules!)
    //the this.state.winner portion should take care of not being able to click in additional spots after the game is over
    if(this.state.gameBoard[loc].type === 'div' || this.state.winner) {
      //don't do anything if the spot is filled (invalid move)
      return;
    }
    
    this.fallInCorrectSlot(loc);
    
    //check if the move the player made won/tied the game
    
    //switch to the next player after the turn is over
    this.setState({turn: (this.state.turn === 'red') ? 'black' : 'red'})
  }
  
  checkRowWin(loc) {
    
  }
  
  
  fallInCorrectSlot(loc) {
    let red = <div className="red-circle">
  </div>;
  
   let black = <div className="black-circle">
  </div>;
    
    let currentGameBoard = this.state.gameBoard; 
    
    //logic to make circles fall into the lowest empty space
    if(this.state.turn === 'red') {
      let columnIndices = this.getColumnIndices(loc);
      let missingSpots = columnIndices.map(el => currentGameBoard[el]).filter(el => el === '');
      let lastMissingSpotPosition = columnIndices[missingSpots.length - 1]; 
      
      //replace the empty spot with a red circle
      currentGameBoard.splice(lastMissingSpotPosition, 1, red);
    } else {
      let columnIndices = this.getColumnIndices(loc);
      
      let missingSpots = columnIndices.map(el => currentGameBoard[el]).filter(el => el === '');
      let lastMissingSpotPosition = columnIndices[missingSpots.length - 1]; 
      
      currentGameBoard.splice(lastMissingSpotPosition, 1, black);
    }  
    this.setState({gameBoard: currentGameBoard});
    // console.log(this.state.gameBoard);
  }
  
  
  getColumnIndices(loc) {
    let lastRow = [];
    for(let i = 35; i <= 41; i++) {
      //now I have a row of indices of the last row
      lastRow.push(i);
    }
    
    let column = [];
    let temp = loc;
    
    //this is to check if the position clicked on is in the last row already
    //this way, we won't even have to enter the loop
    column.push(temp);
    
    //iterate from the location clicked to one of the spots in last row and add the results to column
    while(!lastRow.includes(temp)) {
      temp += 7;
      column.push(temp);
    }
    
    
    return column;
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
