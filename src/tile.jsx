import React from 'react';
import './tile.css';

export default class Tile extends React.Component {

  //come back to this
  tileClick(props) {
    this.props.updateBoard(this.props.loc);
  }

  //come back to this
  render() {
    return (
      <div className={"tile " + this.props.loc} onClick={() => this.tileClick(this.props)}>
          {this.props.value}
      </div>
    );
  }

}
