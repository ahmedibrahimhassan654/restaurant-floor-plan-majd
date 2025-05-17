import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import FormNumberInput from "../../../style/form-number-input";
import FormTextInput from "../../../style/form-text-input";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";

import NumbersModel from "../../NumbersModel";
import { APIURL } from "../../../../../demo/src/APIURL";
import axios from "axios";
import toast from "react-hot-toast";

const tableStyle = { width: "100%" };
const firstTdStyle = { width: "6em" };
const inputStyle = { textAlign: "left" };

export default function ItemAttributesEditor(
  { element, onUpdate, attributeFormData, state, ...rest },
  { translator }
) {
  let name = attributeFormData.has("name")
    ? attributeFormData.get("name")
    : element.name;
  let renderedX = attributeFormData.has("x")
    ? attributeFormData.get("x")
    : element.x;
  let renderedY = attributeFormData.has("y")
    ? attributeFormData.get("y")
    : element.y;
  let renderedR = attributeFormData.has("rotation")
    ? attributeFormData.get("rotation")
    : element.rotation;

  const [newEmptyHover, setNewEmptyHover] = useState(false);
  const [newSelectedHover, setNewSelectedHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [vaild, setValid] = useState(true);
  const [groupID, setGroupID] = useState("");

  const use_user_id_popup = localStorage.getItem("use_user_id_popup");
  console.log("use_user_id_popup", use_user_id_popup);

  const handleClose = () => {
    setOpen(false);
    setNumbers([]);
    setValid(true);
  };

  const urlParams = new URLSearchParams(window.location.search);
  const restaurant = urlParams.get("restaurant");
  const axiosInstance = axios.create({
    baseURL: `${APIURL}/api/v1`,
  });
  const orderGroup = (tableID) => {
    console.log("tableID", tableID);
    setLoading(true);
    axiosInstance
      .get(
        `/restaurant/planner/select-table?table_id=${tableID}&restaurant_id=${restaurant}`
      )
      .then((res) => {
        if (res.data.data.url) {
          window.location.replace(res.data.data.url);
        }
      })
      .catch((err) => {
        if (err.response) {
          setLoading(false);
          if (err.response.status == 422) {
            setLoading(false);
            toast.error("Please save your changes first", {
              icon: "⚠️",
              iconTheme: {
                primary: "#000",
                secondary: "#fff",
              },
            });
          }
        }
      });
  };

  const sendUserID = () => {
    setLoading(true);
    axiosInstance
      .post(`/dine-in-orders/check-user-validity`, {
        restaurant_id: restaurant,
        order_taker_number: numbers.join(""),
      })
      .then((res) => {
        console.log("res", res);
        if (res.data.valid) {
          orderGroup(groupID);
          setValid(res.data.valid);
          setOpen(false);
        } else {
          setOpen(true);
          setValid(res.data.valid);
          setLoading(false);
        }

        // if (res.data.data.url) {
        //   window.location.replace(res.data.data.url);
        // }
      })
      .catch((err) => {
        if (err.response) {
          setLoading(false);
          if (err.response.status == 422) {
            setLoading(false);
            setNumbers([]);
            toast.error("Please save your changes first", {
              icon: "⚠️",
              iconTheme: {
                primary: "#000",
                secondary: "#fff",
              },
            });
          }
        }
      });
  };

  const openPopup = (id) => {
    if (use_user_id_popup == "false") {
      orderGroup(id);
    } else {
      if (element.name) {
        setGroupID(id);
        setOpen(true);
        console.log("groupID", id);
      } else {
        toast.error("Please enter the table name and click save");
      }
    }
  };

  const handleDeleteLastNumber = () => {
    const newArray = [...numbers];
    newArray.pop();
    console.log("newNumbers", newArray);
    setNumbers(newArray);
  };

  // tableFour one_cher_s;
  return (
    <React.Fragment>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td style={firstTdStyle}>{translator.t("Name")}</td>
            <td>
              <FormTextInput
                value={name}
                onChange={(event) => onUpdate("name", event.target.value)}
                style={inputStyle}
              />
            </td>
          </tr>
          {/* <tr>
            <td style={firstTdStyle}>X</td>
            <td>
              <FormNumberInput
                value={renderedX}
                onChange={(event) => onUpdate("x", event.target.value)}
                style={inputStyle}
                state={state}
                precision={2}
                {...rest}
              />
            </td>
          </tr>
          <tr>
            <td style={firstTdStyle}>Y</td>
            <td>
              <FormNumberInput
                value={renderedY}
                onChange={(event) => onUpdate("y", event.target.value)}
                style={inputStyle}
                state={state}
                precision={2}
                {...rest}
              />
            </td>
          </tr>
          <tr>
            <td style={firstTdStyle}>{translator.t("Rotation")}</td>
            <td>
              <FormNumberInput
                value={renderedR}
                onChange={(event) => onUpdate("rotation", event.target.value)}
                style={inputStyle}
                state={state}
                precision={2}
                {...rest}
              />
            </td>
          </tr> */}
        </tbody>
      </table>

      {element.type == "sedia" ||
      element.type == "one_cher_s" ||
      element.type == "tableFour" ? null : (
        <button
          onClick={() => openPopup(element.id)}
          style={{ width: "100%", margin: "10px 0", padding: "5px" }}
        >
          Create Order
        </button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please enter the user ID:"}
        </DialogTitle>
        <DialogContent>
          {vaild == false ? (
            <p
              style={{
                color: "#f55353",
                fontSize: "13px",
                margin: "0px",
                marginBottom: "5px",
              }}
            >
              User not found. Please enter a valid user ID
            </p>
          ) : (
            ""
          )}
          <DialogContentText id="alert-dialog-description">
            <Box sx={{ p: 2, background: "#ddd", width: "350px" }}>
              <Grid
                sx={{
                  p: 1,
                  background: "#eee",
                  width: "100%",
                  mb: 2,
                  height: "40px",
                }}
              >
                {numbers.map((item) => {
                  return "*";
                })}
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <NumbersModel
                  number={1}
                  width={"31%"}
                  numbers={numbers}
                  setNumbers={setNumbers}
                />
                <NumbersModel
                  number={2}
                  width={"31%"}
                  numbers={numbers}
                  setNumbers={setNumbers}
                />
                <NumbersModel
                  number={3}
                  width={"31%"}
                  numbers={numbers}
                  setNumbers={setNumbers}
                />
                <NumbersModel
                  number={4}
                  width={"31%"}
                  numbers={numbers}
                  setNumbers={setNumbers}
                />
                <NumbersModel
                  number={5}
                  width={"31%"}
                  numbers={numbers}
                  setNumbers={setNumbers}
                />
                <NumbersModel
                  number={6}
                  width={"31%"}
                  numbers={numbers}
                  setNumbers={setNumbers}
                />
                <NumbersModel
                  number={7}
                  width={"31%"}
                  numbers={numbers}
                  setNumbers={setNumbers}
                />
                <NumbersModel
                  number={8}
                  width={"31%"}
                  numbers={numbers}
                  setNumbers={setNumbers}
                />
                <NumbersModel
                  number={9}
                  width={"31%"}
                  numbers={numbers}
                  setNumbers={setNumbers}
                />
                <NumbersModel
                  number={0}
                  width={"65%"}
                  numbers={numbers}
                  setNumbers={setNumbers}
                />
                <Grid
                  sx={{
                    p: 1,
                    background: "#eee",
                    width: "31%",
                    mb: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    disabled={numbers.length == 0}
                    onClick={handleDeleteLastNumber}
                  >
                    <BackspaceIcon fontSize="18px" />
                  </Button>
                  {/* <span onClick={console.log("number", number)}> {number}</span> */}
                </Grid>
                {/* <NumbersModel number={"*"} width={"31%"} /> */}
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mr: 3 }}>
          <Button onClick={handleClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button
            disabled={numbers.length == 0}
            ml={2}
            onClick={sendUserID}
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

ItemAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  attributeFormData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
};

ItemAttributesEditor.contextTypes = {
  translator: PropTypes.object.isRequired,
};
