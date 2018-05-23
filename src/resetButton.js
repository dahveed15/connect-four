import React from 'react';

export default class ResetButton extends React.Component {

  render() {
    return (
      <div className='reset'>
        <button onClick={this.props.reset}>Reset</button>
      </div>
    );
  }
}
