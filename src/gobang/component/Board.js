import styled from "styled-components";
import { arrayFrom0To18, arrayFrom1To19, newArray } from "../constance";

const BoardContainer = styled.div`
  margin: 20px;
  position: relative;
  height: 660px;
  width: 660px;
`;

const Coordinates = styled.div`
  position: absolute;
  margin-left: 34px;
  display: flex;
  width: 670px;

  ${(props) =>
    props.$direction === "col" &&
    `
    flex-direction: column;
    margin-left: -5px;
    margin-top: 40px;
    width: 30px;
  `};
`;

const Coordinate = styled.div`
  height: 32px;
  width: 32px;
  text-align: center;
  color: silver;
`;

const Squares = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 25px;
  margin-top: 20px;
  padding: 12px;
  background: tan;
`;

const Square = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid black;
  background: tan;

  ${(props) =>
    props.$win &&
    `
    background: gold;
  `}
`;

const Piece = styled.div`
  background: black;
  height: 28px;
  width: 28px;
  border-radius: 50%;
  margin: 1px 0px 0px 1px;

  ${(props) =>
    props.value === "white" &&
    `
    background: white;
  `}
`;

const squaresRow = newArray(arrayFrom0To18);
const squaresColumn = newArray(arrayFrom0To18);
const coordinates = newArray(arrayFrom1To19);

export default function Board({
  currentStep,
  history,
  winningLine,
  handleSquareClick,
}) {
  return (
    <BoardContainer>
      <Coordinates $direction="row">
        {coordinates.map((coordinate) => (
          <Coordinate key={coordinate}>{coordinate}</Coordinate>
        ))}
      </Coordinates>
      <Coordinates $direction="col">
        {coordinates.map((coordinate) => (
          <Coordinate key={coordinate}>{coordinate}</Coordinate>
        ))}
      </Coordinates>
      <Squares>
        {squaresRow.map((row) =>
          squaresColumn.map((column) => (
            <Square
              key={`${row}, ${column}`}
              onClick={() => handleSquareClick(row, column)}
              $win={
                winningLine &&
                winningLine.some(
                  (square) => square[0] === row && square[1] === column
                )
              }
            >
              {history[currentStep].board[row][column] && (
                <Piece value={history[currentStep].board[row][column]} />
              )}
            </Square>
          ))
        )}
      </Squares>
    </BoardContainer>
  );
}
