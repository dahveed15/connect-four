import React from 'react';
import './announcement.css';

export default class Announcement extends React.Component {
  render() {
    return (
      <div className={this.props.winner ? 'visible text' : 'hidden'}>
        <h2>Game Over</h2>
      </div>
    );
  }
}
