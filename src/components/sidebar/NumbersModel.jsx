import { Button, Grid } from "@mui/material";
import React from "react";

const NumbersModel = ({ number, width, numbers, setNumbers }) => {
  const logFunction = (number) => {
    setNumbers([...numbers, number]);
    console.log("logFunc", number);
  };
  return (
    <Grid
      sx={{
        p: 1,
        background: "#eee",
        width: width,
        mb: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button fullWidth onClick={() => logFunction(number)}>
        {number}
      </Button>
      {/* <span onClick={console.log("number", number)}> {number}</span> */}
    </Grid>
  );
};

export default NumbersModel;
