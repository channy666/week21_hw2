import { useState, useCallback } from "react";

export default function useGame() {
  const [nextPlayerBlack, setNextPlayerBlack] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [history, setHistory] = useState([
    {
      step: 0,
      move: null,
      board: Array(19).fill(Array(19).fill(null)),
    },
  ]);
  const [winningLine, setWinningLine] = useState(false);

  const handleSquareClick = (clickedRow, clickedColumn) => {
    // 點擊已經有棋子的位置或是已經有勝負
    if (history[currentStep].board[clickedRow][clickedColumn] || winningLine)
      return;

    // 有先跳到前面的步數繼續下棋的話，先把 history 資料更新到該步數的狀態
    const currentHistory = history.slice(0, currentStep + 1);

    // 更新下棋後的棋盤
    const newBoard = currentHistory[currentHistory.length - 1].board.map(
      (row, currentRow) => {
        if (currentRow !== clickedRow) return row;

        return row.map((column, currentColumn) => {
          if (currentColumn !== clickedColumn) return column;

          return nextPlayerBlack ? "black" : "white";
        });
      }
    );

    // 更新 history
    setHistory([
      ...currentHistory,
      {
        step: currentStep + 1,
        board: newBoard,
        move: [clickedRow, clickedColumn],
      },
    ]);

    // 下第九顆棋子後開始檢查有沒有人贏
    if (currentStep >= 8) {
      const winningLine = checkWinningLine(clickedRow, clickedColumn, newBoard);

      if (winningLine) {
        setWinningLine(winningLine);
        setCurrentStep((prevstate) => prevstate + 1);
        return;
      }
    }

    setNextPlayerBlack((prevState) => !prevState);
    setCurrentStep((prevState) => prevState + 1);
  };

  const handleJumpToStep = useCallback(
    (step) => {
      setCurrentStep(step);

      // 如果是跳到最新的步數，先檢查有沒有人贏
      if (step === history.length - 1) {
        const winningLine = checkWinningLine(
          history[step].move[0],
          history[step].move[1],
          history[step].board
        );

        if (winningLine) {
          setWinningLine(winningLine);
          setNextPlayerBlack(step % 2 !== 0);
          return;
        }
      }

      setWinningLine(false);
      setNextPlayerBlack(step % 2 === 0);
    },
    [setCurrentStep, history, setWinningLine, setNextPlayerBlack]
  );

  const handleRestartClick = useCallback(() => {
    window.location.reload();
  }, []);

  return {
    history,
    currentStep,
    nextPlayerBlack,
    winningLine,
    handleSquareClick,
    handleJumpToStep,
    handleRestartClick,
  };
}

const checkWinningLine = (row, column, board) => {
  const line1 = countConsecutivePieces(row, column, 1, 0, board).concat(
    countConsecutivePieces(row, column, -1, 0, board)
  );

  const line2 = countConsecutivePieces(row, column, 0, 1, board).concat(
    countConsecutivePieces(row, column, 0, -1, board)
  );

  const line3 = countConsecutivePieces(row, column, -1, -1, board).concat(
    countConsecutivePieces(row, column, 1, 1, board)
  );

  const line4 = countConsecutivePieces(row, column, -1, 1, board).concat(
    countConsecutivePieces(row, column, 1, -1, board)
  );

  // 檢查四個方位分別有沒有連續五個或以上的棋子，沒有就回傳 false
  // 缺點是如果同時有兩條都連續五個（或以上）棋子，只會選到第一條
  const winningLine =
    line1.length > 5
      ? line1
      : false || line2.length > 5
      ? line2
      : false || line3.length > 5
      ? line3
      : false || line4.length > 5
      ? line4
      : false;

  return winningLine;
};

const countConsecutivePieces = (
  row,
  column,
  directionRow,
  directionColumn,
  board
) => {
  const player = board[row][column];
  let winningPieces = [];
  let tempRow = row;
  let tempColumn = column;

  while (
    tempRow >= 0 &&
    tempColumn >= 0 &&
    board[tempRow][tempColumn] === player
  ) {
    winningPieces.push([tempRow, tempColumn]);
    tempRow += directionRow;
    tempColumn += directionColumn;
  }
  return winningPieces;
};
