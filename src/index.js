import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

  handleClick() {
    this.props.onSquareClick();
  }

  render() {
    return (
      <button className="square" onClick={() => this.handleClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares : Array(9).fill(null),
    }
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onSquareClick={() => this.onSquareClick(i)}/>;
  }

  onSquareClick(i) {
    this.setState((state, props) => {
      const newSquares = state.squares.slice();
      newSquares[i] = this.props.content;
      return {squares : newSquares};
    })
    this.props.onBoardChange();
  }

  render() {
    const status = 'Next player: ' + this.props.content;

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

  players = {
    X : 'X',
    O : 'O'
  };

  constructor(props) {
    super(props);
    this.state = {
      turn : 0,
    };
  }

  handlePlayerMove() {
    this.setState((state, props) => {
      return {turn : state.turn + 1};
    });
  }

  render() {
    let nextPlayer;
    if (this.state.turn % 2 == 0) {
      nextPlayer = this.players.O;
    } else {
      nextPlayer = this.players.X;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board content={nextPlayer} onBoardChange={() => this.handlePlayerMove()}/>
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
