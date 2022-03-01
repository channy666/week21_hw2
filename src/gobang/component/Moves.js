import styled from "styled-components";

const MoveContainer = styled.ol`
  margin-right: 20px;
  height: 540px;
  overflow: scroll;

  li {
    font-size: 18px;
    margin-top: 10px;
    color: silver;
  }
`;

const Move = styled.button`
  background: none;
  color: IndianRed;
  border: 4px double silver;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  height: 40px;
  width: 125px;
  margin-top: 8px;
  cursor: pointer;

  :hover {
    border: 4px dashed grey;
  }

  ${(props) =>
    props.$active &&
    `
    border: 4px solid grey;
  `}
`;

export default function Moves({
  history,
  currentStep,
  handleJumpToStep,
  scrollIntoViewRef,
}) {
  return (
    <MoveContainer>
      {history.map(
        (history) =>
          history.step !== 0 && (
            <li key={history.step}>
              <Move
                $active={history.step === currentStep}
                ref={history.step === currentStep ? scrollIntoViewRef : null}
                onClick={() => handleJumpToStep(history.step)}
              >{`${history.step % 2 === 0 ? "白棋" : "黑棋"} [${
                history.move[0] + 1
              }, ${history.move[1] + 1}]`}</Move>
            </li>
          )
      )}
    </MoveContainer>
  );
}
