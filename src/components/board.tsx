import React from "react";
import { createUseStyles } from "react-jss";

import { ROWS } from "types/constants";

import Cell from "./cell";

const useStyles = createUseStyles({
  root: {
    padding: 5,
  },
  row: {
    display: "flex",
  },
});

interface OwnProps {
  isDisabled?: boolean;
  onCellChange?: () => void;
}

type Props = OwnProps;

export const Board = (props: Props) => {
  const classes = useStyles();
  const { isDisabled, onCellChange } = props;

  return (
    <div className={classes.root}>
      <div>Add A title</div>
      {ROWS.map((row, index) => (
        <div data-qa="board-row" key={index} className={classes.row}>
          {row.map((cellId) => (
            <Cell
              key={cellId}
              cellId={cellId}
              isDisabled={isDisabled}
              onChange={onCellChange}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
