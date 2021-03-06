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
    };
  }

  updateBoard(loc) {

    //check if a red or black circle is already in a spot (console logging gameBoard rules!)
    //the this.state.winner portion should take care of not being able to click in additional spots after the game is over
    if(this.state.gameBoard[loc].type === 'div' || this.state.winner) {
      //don't do anything if the spot is filled (invalid move)
      return;
    }

    //this I'm calling the fallInCorrectSlot method in the checkRowWin method, every other method following doesn't need to have fallInCorrectSlot called for its logic
    if(this.checkRowWin(loc) || this.checkColumnWin(loc) || this.checkDownwardDiagonalWin(loc) || this.checkUpwardDiagonalWin(loc)) {
      this.setState({winner: this.state.turn});
    }

    if(this.checkDraw(loc)) {
      this.setState({winner: 'draw'});
    }

    //switch to the next player after the turn is over
    this.setState({turn: (this.state.turn === 'red') ? 'black' : 'red'});
  }

  checkRowWin(loc) {

    this.fallInCorrectSlot(loc);
    let currentGameBoard = this.state.gameBoard;

    let columnIndices = this.getColumnIndices(loc);
    let allSpots = columnIndices.map(el => currentGameBoard[el]);

    let highestFilledSpotPosition;

    //I need this so I can check the row of the last space that I clicked on
    for(let i = 0; i < allSpots.length; i++) {
      if(allSpots[i] !== '') {
        highestFilledSpotPosition = columnIndices[i];
        break;
      }
    }

    let rowIndices = this.getRowIndices(highestFilledSpotPosition);

    //this will give me an array of the descriptions of each circle clicked on for each row
      //(e.g. ['red-circle', 'black-circle', 'black-circle', 'red-circle'] => 'red-circleblack-circleblack-circlered-circle')

    //I map each '' to 'empty' to avoid winning falsely when joining by ''
    let rowValues =
    rowIndices.map(el => this.state.gameBoard[el])
    .map(function(el) {
      if(el === '') {
        return 'empty';
      } else {
        return el.props.className;
      }
    }).join('');

    return rowValues.match('red-circlered-circlered-circlered-circle') || rowValues.match('black-circleblack-circleblack-circleblack-circle');
  }

  checkColumnWin(loc) {

    let columnIndices = this.getColumnIndices(loc);

    let currentGameBoard = this.state.gameBoard;

    let columnValues = columnIndices.map(el => currentGameBoard[el])
    .map(function(el) {
      if(el === '') {
        return 'empty';
      } else {
        return el.props.className;
      }
    }).join('');

    return columnValues.match('red-circlered-circlered-circlered-circle') || columnValues.match('black-circleblack-circleblack-circleblack-circle');

  }

  checkUpwardDiagonalWin(loc) {

    let columnIndices = this.getColumnIndices(loc);

    let currentGameBoard = this.state.gameBoard;

    let allSpots = columnIndices.map(el => currentGameBoard[el]);

    let highestFilledSpotPosition;

    //I need this so I can check the diagonal of the last space that I clicked on
    for(let i = 0; i < allSpots.length; i++) {
      if(allSpots[i] !== '') {
        highestFilledSpotPosition = columnIndices[i];
        break;
      }
    }

    let diagonalIndices = this.getUpwardDiagonalIndices(highestFilledSpotPosition);

    let diagonalValues =
    diagonalIndices.map(el => this.state.gameBoard[el])
    .map(function(el) {
      if(el === '') {
        return 'empty';
      } else {
        return el.props.className;
      }
    }).join('');

    return diagonalValues.match('red-circlered-circlered-circlered-circle') || diagonalValues.match('black-circleblack-circleblack-circleblack-circle');

  }

  checkDownwardDiagonalWin(loc) {

    let columnIndices = this.getColumnIndices(loc);

    let currentGameBoard = this.state.gameBoard;

    let allSpots = columnIndices.map(el => currentGameBoard[el]);

    let highestFilledSpotPosition;

    //I need this so I can check the diagonal of the last space that I clicked on
    for(let i = 0; i < allSpots.length; i++) {
      if(allSpots[i] !== '') {
        highestFilledSpotPosition = columnIndices[i];
        break;
      }
    }

    let diagonalIndices = this.getDownwardDiagonalIndices(highestFilledSpotPosition);

    let diagonalValues =
    diagonalIndices.map(el => this.state.gameBoard[el])
    .map(function(el) {
      if(el === '') {
        return 'empty';
      } else {
        return el.props.className;
      }
    }).join('');

    return diagonalValues.match('red-circlered-circlered-circlered-circle') || diagonalValues.match('black-circleblack-circleblack-circleblack-circle');
  }

  checkDraw(loc){

    let currentGameBoard = this.state.gameBoard;

    if(currentGameBoard.every(el => el !== '')) {
      return true;
    }

  }

  getRowIndices(loc) {
    let rowStarts = [];

    //we need to go up to 42 to get the range up to the last tile, 41
    for(let i = 0; i <= 42; i += 7) {
      rowStarts.push(i);
    }

    let rowRange = [];

    for(let i = 0; i < rowStarts.length; i++) {
      //get the range from the rowStart to the end of that row
      if(loc === rowStarts[i]) {
        rowRange.push(rowStarts[i]);
        rowRange.push(rowStarts[i + 1]);
        break;
      } else if((loc > rowStarts[i]) && (loc < rowStarts[i+1])) {
        //same logic, but this is to check for positions not at the start or end of row
        rowRange.push(rowStarts[i]);
        rowRange.push(rowStarts[i+1]);
        break;
      }
    }

    let rowIndices = [];

    for(let i = rowRange[0]; i < rowRange[1]; i++) {
      rowIndices.push(i);
    }

    return rowIndices;

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

  getUpwardDiagonalIndices(loc) {

    let leftBoundaries = [];

    for(let i = 0; i < 35; i+= 7) {
      leftBoundaries.push(i);
    }

    for(let i = 35; i <= 41; i++) {
      leftBoundaries.push(i);
    }

    let rightBoundaries = [];

    for(let i = 0; i < 6; i++) {
      rightBoundaries.push(i);
    }

    for(let i = 6; i <= 41; i += 7) {
      rightBoundaries.push(i);
    }


    let diagonal = [];
    let temp = loc;
    diagonal.push(temp);

    //this will give me the upward diagonals from the place I clicked on
    while(!rightBoundaries.includes(temp)) {
      temp -= 6;
      diagonal.push(temp);
    }

    //logic to get the diagonals before spot clicked on (if necessary)
    if(leftBoundaries.includes(loc)) {
      //this case is for the top left and bottom right tiles
      return diagonal;
    } else {
      temp = loc;
      while(!leftBoundaries.includes(temp)) {
        //we need all of the tiles from the bottom corners to the location I'm on
        temp += 6;
        diagonal.unshift(temp);
      }
      return diagonal;
    }

  }

  getDownwardDiagonalIndices(loc) {

    let leftBoundaries = [];

    for(let i = 0; i <= 35; i += 7) {
      //left-most column indices
      leftBoundaries.push(i);
    }

    for(let i = 1; i <= 6; i++) {
      //top row indices
      leftBoundaries.push(i);
    }

    let rightBoundaries = [];

    for(let i = 35; i < 41; i++) {
      //bottom row indices
      rightBoundaries.push(i);
    }

    for(let i = 6; i <= 41; i += 7) {
      //right-most column indices
      rightBoundaries.push(i);
    }

    let diagonal = [];
    let temp = loc;
    diagonal.push(temp);

    //this will only give me the tiles from where I clicked to the end
    while(!rightBoundaries.includes(temp)) {
      temp += 8;
      diagonal.push(temp);
    }

    if(leftBoundaries.includes(loc)) {
      //this case is for the bottom left and top right tiles
      return diagonal;
    } else {
      temp = loc;
      while(!leftBoundaries.includes(temp)) {
        //we need all of the tiles from the top corners to the location I'm on
        temp -= 8;
        diagonal.unshift(temp);
      }
      return diagonal;
    }

  }

  fallInCorrectSlot(loc) {
    let red = <div className="red-circle">
  </div>;

   let black = <div className="black-circle">
  </div>;

    let currentGameBoard = this.state.gameBoard;

    //logic to make circles find the lowest empty space
    let columnIndices = this.getColumnIndices(loc);

    let missingSpots = columnIndices.map(el => currentGameBoard[el]).filter(el => el === '');
    let lastMissingSpotPosition = columnIndices[missingSpots.length - 1];

    if(this.state.turn === 'red') {
      //replace the empty spot with a red circle
      currentGameBoard.splice(lastMissingSpotPosition, 1, red);
    } else {
      currentGameBoard.splice(lastMissingSpotPosition, 1, black);
    }

    this.setState({gameBoard: currentGameBoard});

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
    });
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
