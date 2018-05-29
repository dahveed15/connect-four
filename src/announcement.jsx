import React from 'react';
import './announcement.css';

export default class Announcement extends React.Component {


  render() {
    let gameWinner;

    if(this.props.winner) {
      if(this.props.winner === 'draw') {
        gameWinner = 'Draw!';
      } else {
        gameWinner = this.props.winner[0].toUpperCase() + this.props.winner.slice(1, this.props.winner.length) + ' wins!';
      }
    }

    return (
      <div className={this.props.winner ? 'visible text' : 'hidden'}>
        <h2>{gameWinner}</h2>
      </div>
    );
  }
}
