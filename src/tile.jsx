import React from 'react';
import './tile.css';

export default class Tile extends React.Component {

  //border-collapse:collapse

  tileClick(props) {
    this.props.updateBoard(this.props.loc);
  }

  render() {
    return (
      <div className={"tile " + this.props.loc} onClick={() => this.tileClick(this.props)}>
          {this.props.value}
      </div>
    );
  }

}
