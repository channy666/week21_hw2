import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import Board from "./gobang/component/Board";
import Moves from "./gobang/component/Moves";
import useGame from "./gobang/useGame";

const Container = styled.div`
  margin: 0 auto;
  width: 920px;
`;

const Title = styled.div`
  margin: 0 auto;
  text-align: center;
  color: IndianRed;
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 2px;
  padding: 20px 0px;
`;

const Game = styled.div`
  display: flex;
`;

const GameInfo = styled.div`
  margin-left: 10px;
`;

const NextPlayer = styled.div`
  display: flex;
  width: 110px;
  height: 60px;
  border: 5px double grey;
  padding: 0px 13px;
  justify-content: space-between;
  align-items: center;
  background: tan;
  margin-left: 25px;
`;

const Player = styled.div`
  background: black;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: 1px 1px 1px 1px grey;

  ${(props) =>
    props.$white &&
    `
    background: white;
  `}

  ${(props) =>
    props.$active &&
    `
    border: 4px solid gold;
  `}
`;

const Restart = styled.div`
  margin: 0 auto;
  text-align: center;

  button {
    color: IndianRed;
    background: none;
    font-size: 20px;
    font-weight: bold;
    border: 4px double silver;
    width: 120px;
    height: 45px;
    border-radius: 5px;
    cursor: pointer;
    letter-spacing: 1.5px;

    :hover {
      border: 4px dashed grey;
    }
  }
`;

const Winner = styled.div`
  color: gold;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  padding: 0px 0px 5px 20px;

  ${(props) =>
    !props.$winner &&
    `
    color: white;
  `}
`;

function App() {
  const {
    history,
    currentStep,
    nextPlayerBlack,
    winningLine,
    handleRestartClick,
    handleJumpToStep,
    handleSquareClick,
  } = useGame();

  const scrollIntoViewRef = useRef();

  useEffect(() => {
    // 希望 Moves 的 scroll bar 可以自動下滑，顯示出當前的步數
    // 但是不確定用 useRef 存取當前步數的 DOM 元素適不適合 QQ，感覺好像跟 useRef 的原意不一樣(?)，有空再想想其他方法
    if (scrollIntoViewRef.current) {
      scrollIntoViewRef.current.scrollIntoView();
    }
  }, [currentStep, scrollIntoViewRef]);

  return (
    <Container>
      <Title>- 五子棋對戰 -</Title>
      <Game>
        <Board
          currentStep={currentStep}
          handleSquareClick={handleSquareClick}
          history={history}
          winningLine={winningLine}
        />
        <GameInfo>
          <Winner $winner={winningLine}>{`${
            nextPlayerBlack ? "黑棋" : "白棋"
          } 獲勝！`}</Winner>
          <NextPlayer>
            <Player $black $active={nextPlayerBlack}></Player>
            <Player $white $active={!nextPlayerBlack}></Player>
          </NextPlayer>
          <Moves
            history={history}
            handleJumpToStep={handleJumpToStep}
            currentStep={currentStep}
            scrollIntoViewRef={scrollIntoViewRef}
          />
        </GameInfo>
      </Game>
      <Restart>
        <button onClick={handleRestartClick}>重新開始</button>
      </Restart>
    </Container>
  );
}

export default App;
