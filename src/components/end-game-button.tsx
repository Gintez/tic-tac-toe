import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import * as actions from "store/actions";

import Button from "./button";

interface DispatchProps {
  actions: typeof actions;
}

type Props = DispatchProps;

const EndGameButton = (props: Props) => {
  const { actions } = props;

  function handleEndGame() {
    actions.endGame();
  }

  return <Button onClick={handleEndGame}>End Game NOW</Button>;
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(null, mapDispatchToProps)(EndGameButton);
