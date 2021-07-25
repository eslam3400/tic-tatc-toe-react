import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = (props) => (
  <button className="square" onClick={props.onClick}>
    {props.value}
  </button>
);

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: Array(9).fill(null),
      xTurn: true
    };
  }

  winner(fields) {
    const condetions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 8],
    ];
    const limit = condetions.length
    for (let index = 0; index < limit; index++) {
      const [a, b, c] = condetions[index];
      if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) return fields[a];
    }
    return null;
  }

  handleClick(i) {
    const fields = [...this.state.fields];
    if (this.winner(fields) || fields[i]) return;
    fields[i] = this.state.xTurn ? 'X' : 'O';
    this.setState({ fields, xTurn: !this.state.xTurn });
  }

  renderSquare(i) {
    return <Square value={this.state.fields[i]} onClick={() => this.handleClick(i)} />;
  }

  render() {
    const winner = this.winner(this.state.fields)
    let status = winner ? `Winner: ${winner}` : 'Next player: ' + (this.state.xTurn ? 'X' : 'O')
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
