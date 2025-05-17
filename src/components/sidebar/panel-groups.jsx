import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Panel from "./panel";
import * as SharedStyle from "../../shared-style";
import { TiPlus, TiDelete } from "react-icons/ti";
import { FaTrash, FaEye, FaLink, FaUnlink } from "react-icons/fa";
import { Map } from "immutable";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import BackspaceIcon from "@mui/icons-material/Backspace";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid } from "@mui/material";
import NumbersModel from "./NumbersModel";
import { APIURL } from "../../../demo/src/APIURL";

const VISIBILITY_MODE = {
  MODE_IDLE: "MODE_IDLE",
  MODE_2D_ZOOM_IN: "MODE_2D_ZOOM_IN",
  MODE_2D_ZOOM_OUT: "MODE_2D_ZOOM_OUT",
  MODE_2D_PAN: "MODE_2D_PAN",
  MODE_3D_VIEW: "MODE_3D_VIEW",
  MODE_3D_FIRST_PERSON: "MODE_3D_FIRST_PERSON",
  MODE_WAITING_DRAWING_LINE: "MODE_WAITING_DRAWING_LINE",
  MODE_DRAWING_LINE: "MODE_DRAWING_LINE",
  MODE_DRAWING_HOLE: "MODE_DRAWING_HOLE",
  MODE_DRAWING_ITEM: "MODE_DRAWING_ITEM",
  MODE_DRAGGING_LINE: "MODE_DRAGGING_LINE",
  MODE_DRAGGING_VERTEX: "MODE_DRAGGING_VERTEX",
  MODE_DRAGGING_ITEM: "MODE_DRAGGING_ITEM",
  MODE_DRAGGING_HOLE: "MODE_DRAGGING_HOLE",
  MODE_FITTING_IMAGE: "MODE_FITTING_IMAGE",
  MODE_UPLOADING_IMAGE: "MODE_UPLOADING_IMAGE",
  MODE_ROTATING_ITEM: "MODE_ROTATING_ITEM",
};

const styleEditButton = {
  marginLeft: "5px",
  border: "0px",
  background: "none",
  color: SharedStyle.COLORS.white,
  fontSize: "14px",
  outline: "0px",
};

const tablegroupStyle = {
  width: "100%",
  cursor: "pointer",
  maxHeight: "20em",
  padding: "0 1em",
  marginLeft: "1px",
};

const iconColStyle = { width: "2em", textAlign: "center" };
const styleHoverColor = { color: SharedStyle.SECONDARY_COLOR.main };
const styleEditButtonHover = { ...styleEditButton, ...styleHoverColor };
const styleAddLabel = { fontSize: "10px", marginLeft: "5px" };
const styleEyeVisible = { fontSize: "1.25em" };
const styleEyeHidden = { ...styleEyeVisible, color: "#a5a1a1" };
const newLayerLableStyle = {
  fontSize: "1.3em",
  cursor: "pointer",
  textAlign: "center",
};
const newLayerLableHoverStyle = { ...newLayerLableStyle, ...styleHoverColor };

const PanelGroups = ({ mode, groups, layers }, context) => {
  const [newEmptyHover, setNewEmptyHover] = useState(false);
  const [newSelectedHover, setNewSelectedHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [numbers, setNumbers] = React.useState([]);
  const [vaild, setValid] = React.useState(true);
  const [groupID, setGroupID] = React.useState("");

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
        `/restaurant/planner/select-table?group_id=${tableID}&restaurant_id=${restaurant}`
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
    setGroupID(id);
    setOpen(true);
    console.log("groupID", id);
  };

  const handleDeleteLastNumber = () => {
    const newArray = [...numbers];
    newArray.pop();
    console.log("newNumbers", newArray);
    setNumbers(newArray);
  };

  if (!VISIBILITY_MODE[mode]) return null;

  return loading === true ? (
    <div className="loading-groub">
      <span className="loader"></span>
    </div>
  ) : (
    <React.Fragment>
      <Panel name={context.translator.t("Groups")} opened={groups.size > 0}>
        {groups.size ? (
          <table style={tablegroupStyle}>
            <thead>
              <tr>
                <th colSpan="4"></th>
                <th>{context.translator.t("Elements")}</th>
                <th>{context.translator.t("Name")}</th>
              </tr>
            </thead>
            <tbody>
              {groups.entrySeq().map(([groupID, group]) => {
                const selectClick = (e) => {
                  context.groupsActions.selectGroup(groupID);
                };

                const swapVisibility = (e) => {
                  e.stopPropagation();
                  context.groupsActions.setGroupProperties(
                    groupID,
                    new Map({ visible: !group.get("visible") })
                  );
                };

                const chainToGroup = (e) => {
                  layers.forEach((layer) => {
                    const layerID = layer.get("id");
                    const layerElements = {
                      lines: layer.get("lines"),
                      items: layer.get("items"),
                      holes: layer.get("holes"),
                      areas: layer.get("areas"),
                    };

                    for (const elementPrototype in layerElements) {
                      const ElementList = layerElements[elementPrototype];
                      ElementList.filter((el) => el.get("selected")).forEach(
                        (element) => {
                          console.log(
                            "GRIII",
                            context.groupsActions.addToGroup(
                              groupID,
                              layerID,
                              elementPrototype,
                              element.get("id")
                            )
                          );
                          context.groupsActions.addToGroup(
                            groupID,
                            layerID,
                            elementPrototype,
                            element.get("id")
                          );
                        }
                      );
                    }
                  });

                  selectClick(e);
                };

                const isCurrentgroup = group.get("selected");
                const shouldHighlight = isCurrentgroup;
                const rowStyle = !shouldHighlight ? null : styleHoverColor;

                const dimension = group.get("elements").reduce((sum, layer) => {
                  return (
                    sum + layer.reduce((lSum, elProt) => lSum + elProt.size, 0)
                  );
                }, 0);

                return (
                  <tr key={groupID} style={rowStyle}>
                    <td
                      style={iconColStyle}
                      title={context.translator.t("Order This Group")}
                    >
                      <FaLink
                        onClick={() => openPopup(groupID)}
                        style={
                          !shouldHighlight
                            ? styleEditButton
                            : styleEditButtonHover
                        }
                      />
                    </td>
                    <td></td>
                    <td
                      style={iconColStyle}
                      title={context.translator.t(
                        "Delete group and all Elements"
                      )}
                    >
                      <FaTrash
                        onClick={(e) =>
                          context.groupsActions.removeGroupAndDeleteElements(
                            groupID
                          )
                        }
                        style={
                          !shouldHighlight
                            ? styleEditButton
                            : styleEditButtonHover
                        }
                      />
                    </td>
                    <td></td>
                    <td
                      onClick={selectClick}
                      style={{ width: "0em", textAlign: "center" }}
                    >
                      {dimension}
                    </td>
                    <td></td>
                    <td onClick={selectClick}>{group.get("name")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}

        <table style={{ width: "100%", marginTop: "0.1em" }}>
          <tbody>
            <tr>
              <td
                style={
                  !newEmptyHover ? newLayerLableStyle : newLayerLableHoverStyle
                }
                onMouseOver={() => setNewEmptyHover(true)}
                onMouseOut={() => setNewEmptyHover(false)}
                onClick={(e) => context.groupsActions.addGroup()}
              >
                <TiPlus />
                <b style={styleAddLabel}>
                  {context.translator.t("New Empty Group")}
                </b>
              </td>
              <td
                style={
                  !newSelectedHover
                    ? newLayerLableStyle
                    : newLayerLableHoverStyle
                }
                onMouseOver={() => setNewSelectedHover(true)}
                onMouseOut={() => setNewSelectedHover(false)}
                onClick={(e) => context.groupsActions.addGroupFromSelected()}
              >
                <TiPlus />
                <b style={styleAddLabel}>
                  {context.translator.t("New Group from selected")}
                </b>
              </td>
            </tr>
          </tbody>
        </table>
      </Panel>
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
};

PanelGroups.propTypes = {
  mode: PropTypes.string.isRequired,
  groups: PropTypes.object.isRequired,
  layers: PropTypes.object.isRequired,
};

PanelGroups.contextTypes = {
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  groupsActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
};

export default PanelGroups;
