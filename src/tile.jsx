import React from 'react';
import './tile.css';

export default class Tile extends React.Component {

  //come back to this
  tileClick(props) {
    props.updateBoard(props.loc);
  }

  //come back to this
  render() {
    return (
      <div className={"tile " + this.props.loc} onClick={() => this.tileClick(this.props)}>
        <p>{this.props.value}</p>
      </div>
    );
  }

}
