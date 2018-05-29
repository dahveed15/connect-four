import React from 'react';
import './announcement.css';

export default class Announcement extends React.Component {


  render() {
    let gameWinner;

    if(this.props.winner) {
      gameWinner = this.props.winner[0].toUpperCase() + this.props.winner.slice(1, this.props.winner.length);
    }

    return (
      <div className={this.props.winner ? 'visible text' : 'hidden'}>
        <h2>{gameWinner} wins!</h2>
      </div>
    );
  }
}
