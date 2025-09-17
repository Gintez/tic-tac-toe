import React from "react";
import { createUseStyles } from "react-jss";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import clsx from "clsx";

import { Players, Signs, CellIds } from "types";
import { PLAYER_SIGNS } from "types/constants";
import { getCellValue, getCurrentPlayer } from "store/selectors";
import * as actions from "store/actions";
import { State } from "store";

const useStyles = createUseStyles({
  root: {
    height: 150,
    width: 150,
    backgroundColor: "grey",
    border: "1px solid white",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 30,
  },
  disabled: {
    opacity: 0.5,
  },
});

interface DispatchProps {
  actions: typeof actions;
}

interface OwnProps {
  cellId: CellIds;
  isDisabled?: boolean;
  onChange?: () => void;
}

interface StateProps {
  cellValue: Signs;
  currentPlayer: Players;
}

type Props = OwnProps & StateProps & DispatchProps;

export const Cell = (props: Props) => {
  const classes = useStyles();
  const { cellValue, actions, cellId, currentPlayer, isDisabled, onChange } =
    props;

  function setCellValue() {
    actions.setCellValue({
      cellId,
      cellValue: PLAYER_SIGNS[currentPlayer],
    });

    onChange && onChange();
  }

  function handleCellClick() {
    !cellValue && !isDisabled && setCellValue();
  }

  return (
    <div
      data-qa="board-cell"
      onClick={handleCellClick}
      className={clsx(classes.root, { [classes.disabled]: isDisabled })}
    >
      <div>Change something here</div>
      {cellValue || ""}
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  actions: bindActionCreators(actions, dispatch),
});

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => ({
  cellValue: getCellValue(state, { cellId: ownProps?.cellId }),
  currentPlayer: getCurrentPlayer(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
