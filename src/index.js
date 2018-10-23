import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

  render() {
    return (
      <button className="square" onClick={() => this.props.onSquareClick()}>
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

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.state.squares) !== JSON.stringify(prevState.squares)) {
      this.props.onBoardChange();
    }
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onSquareClick={() => this.onSquareClick(i)}/>;
  }

  onSquareClick(i) {
    this.setState((state, props) => {
      const copiedSquares = state.squares.slice();

      if (copiedSquares[i] === null) {
        copiedSquares[i] = this.props.content;
        return {squares : copiedSquares};
      }
      return null;
    })
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  render() {

    const winner = this.calculateWinner(this.state.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + this.props.content;
    }
    
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
    if (this.state.turn % 2 === 0) {
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
