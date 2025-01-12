import React, { useState, useEffect } from 'react';

// Kazanma kombinasyonlarını kontrol eden fonksiyon
const checkWinner = (board) => {
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
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

// Minimax algoritması ile AI'nın en iyi hamlesini bulma
const minimax = (board, depth, isMaximizing) => {
  const winner = checkWinner(board);
  if (winner === 'X') return -10;
  if (winner === 'O') return 10;
  if (board.every(cell => cell !== null)) return 0; // Beraberlik

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = 'O';
        const score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = 'X';
        const score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

const getBestMove = (board) => {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'O'; // AI'nın hamlesi
      const score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
};

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // 9 hücreli tahta
  const [isXNext, setIsXNext] = useState(true); // Oyuncunun sırası
  const [winner, setWinner] = useState(null); // Kazanan

  const handleClick = (index) => {
    if (board[index] || winner) return; // Eğer hücre doluysa veya oyun bitmişse
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O'; // Hamleyi tahta üzerine yaz
    setBoard(newBoard);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win); // Kazanan belirle
    } else {
      setIsXNext(!isXNext); // Sıra değiştir
    }
  };

  useEffect(() => {
    if (!isXNext && winner === null) {
      const aiMove = getBestMove(board); // AI'nin en iyi hamlesini al
      handleClick(aiMove); // AI hamlesini yap
    }
  }, [board, isXNext, winner]);

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  const renderStatus = () => {
    if (winner) return `Kazanan: ${winner}`;
    if (board.every(cell => cell !== null)) return 'Beraberlik!';
    return `Sıra: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className="game">
      <div className="board">
        <div className="row">
          {renderSquare(0)} {renderSquare(1)} {renderSquare(2)}
        </div>
        <div className="row">
          {renderSquare(3)} {renderSquare(4)} {renderSquare(5)}
        </div>
        <div className="row">
          {renderSquare(6)} {renderSquare(7)} {renderSquare(8)}
        </div>
      </div>
      <div className="status">
        {renderStatus()}
      </div>
    </div>
  );
};

export default TicTacToe;
