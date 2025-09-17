import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { Players, BoardValues } from "types";
import * as actions from "store/actions";
import { getBoardValues, getWinner, getCurrentPlayer } from "store/selectors";
import checkForWinner from "helpers/check-for-winner";
import { State } from "store";

import Board from "./board";
import GameLogging from "./game-logging";
import CurrentPlayer from "./current-player";
import EndGameButton from "./end-game-button";

interface StateProps {
  boardValues: BoardValues;
  currentWinner: Players;
  currentPlayer: Players;
}

interface DispatchProps {
  actions: typeof actions;
}

type Props = StateProps & DispatchProps;

const Game = (props: Props) => {
  const { boardValues, actions, currentWinner, currentPlayer } = props;

  useEffect(() => {
    handleGameChange();
  }, [boardValues]);

  function handleGameChange() {
    const winner = checkForWinner(boardValues);

    if (winner && !currentWinner) {
      actions.setWinner(winner as Players);
    }
  }

  function tooglePlayer() {
    const nextPlayer =
      currentPlayer == Players.PLAYER_1 ? Players.PLAYER_2 : Players.PLAYER_1;

    actions.setCurrentPlayer(nextPlayer);
  }

  return (
    <div data-qa="game">
      <CurrentPlayer />
      <Board isDisabled={!!currentWinner} onCellChange={tooglePlayer} />
      <EndGameButton />
      <GameLogging />
      <div>needed som title here as well</div>
    </div>
  );
};

const mapStateToProps = (state: State): StateProps => ({
  boardValues: getBoardValues(state),
  currentWinner: getWinner(state),
  currentPlayer: getCurrentPlayer(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
