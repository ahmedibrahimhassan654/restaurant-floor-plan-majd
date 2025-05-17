import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Panel from "./panel";
import * as SharedStyle from "../../shared-style";
import { TiPlus, TiDelete } from "react-icons/ti";
import { FaTrash, FaEye, FaLink, FaUnlink } from "react-icons/fa";
import { Map } from "immutable";
import axios from "axios";
import toast from "react-hot-toast";
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

  const orderGroup = (tableID) => {
    console.log("tableID", tableID);
    setLoading(true);

    const urlParams = new URLSearchParams(window.location.search);
    const restaurant = urlParams.get("restaurant");

    const axiosInstance = axios.create({
      baseURL: `${APIURL}/api/v1/restaurant/planner`,
    });

    console.log("Order");
    axiosInstance
      .get(`/select-table?group_id=${tableID}&restaurant_id=${restaurant}`)
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

  if (!VISIBILITY_MODE[mode]) return null;

  return loading === true ? (
    <div className="loading-groub">
      <span className="loader"></span>
    </div>
  ) : (
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
                      onClick={() => orderGroup(groupID)}
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
                !newSelectedHover ? newLayerLableStyle : newLayerLableHoverStyle
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
