import React from "react";
import PropTypes from "prop-types";
import GridHorizontalStreak from "./grid-horizontal-streak";
import GridVerticalStreak from "./grid-vertical-streak";

export default function Grids({ scene }) {
  let { width, height, grids } = scene;

  let renderedGrids = grids
    .entrySeq()
    .map(([gridID, grid]) => {
      console.log("grid", grid);
      switch (grid.type) {
        case "horizontal-streak":
          return (
            <GridHorizontalStreak
              key={gridID}
              width={1050}
              height={height}
              grid={grid}
              new={grid}
            />
          );

        case "vertical-streak":
          return (
            <GridVerticalStreak
              key={gridID}
              width={1050}
              height={height}
              grid={grid}
              new={grid}
            />
          );

        default:
          console.warn(`grid ${grid.type} not allowed`);
      }
    })
    .toList();

  return <g>{renderedGrids}</g>;
}

Grids.propTypes = {
  scene: PropTypes.object.isRequired,
};
