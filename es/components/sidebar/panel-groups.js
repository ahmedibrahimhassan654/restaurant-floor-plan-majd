"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _panel = require("./panel");

var _panel2 = _interopRequireDefault(_panel);

var _sharedStyle = require("../../shared-style");

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _ti = require("react-icons/ti");

var _fa = require("react-icons/fa");

var _immutable = require("immutable");

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _reactHotToast = require("react-hot-toast");

var _reactHotToast2 = _interopRequireDefault(_reactHotToast);

var _Button = require("@mui/material/Button");

var _Button2 = _interopRequireDefault(_Button);

var _Backspace = require("@mui/icons-material/Backspace");

var _Backspace2 = _interopRequireDefault(_Backspace);

var _Dialog = require("@mui/material/Dialog");

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogActions = require("@mui/material/DialogActions");

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _DialogContent = require("@mui/material/DialogContent");

var _DialogContent2 = _interopRequireDefault(_DialogContent);

var _DialogContentText = require("@mui/material/DialogContentText");

var _DialogContentText2 = _interopRequireDefault(_DialogContentText);

var _DialogTitle = require("@mui/material/DialogTitle");

var _DialogTitle2 = _interopRequireDefault(_DialogTitle);

var _material = require("@mui/material");

var _NumbersModel = require("./NumbersModel");

var _NumbersModel2 = _interopRequireDefault(_NumbersModel);

var _APIURL = require("../../../demo/src/APIURL");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var VISIBILITY_MODE = {
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
  MODE_ROTATING_ITEM: "MODE_ROTATING_ITEM"
};

var styleEditButton = {
  marginLeft: "5px",
  border: "0px",
  background: "none",
  color: SharedStyle.COLORS.white,
  fontSize: "14px",
  outline: "0px"
};

var tablegroupStyle = {
  width: "100%",
  cursor: "pointer",
  maxHeight: "20em",
  padding: "0 1em",
  marginLeft: "1px"
};

var iconColStyle = { width: "2em", textAlign: "center" };
var styleHoverColor = { color: SharedStyle.SECONDARY_COLOR.main };
var styleEditButtonHover = _extends({}, styleEditButton, styleHoverColor);
var styleAddLabel = { fontSize: "10px", marginLeft: "5px" };
var styleEyeVisible = { fontSize: "1.25em" };
var styleEyeHidden = _extends({}, styleEyeVisible, { color: "#a5a1a1" });
var newLayerLableStyle = {
  fontSize: "1.3em",
  cursor: "pointer",
  textAlign: "center"
};
var newLayerLableHoverStyle = _extends({}, newLayerLableStyle, styleHoverColor);

var PanelGroups = function PanelGroups(_ref, context) {
  var mode = _ref.mode,
      groups = _ref.groups,
      layers = _ref.layers;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      newEmptyHover = _useState2[0],
      setNewEmptyHover = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      newSelectedHover = _useState4[0],
      setNewSelectedHover = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];

  var _React$useState = _react2.default.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  var _React$useState3 = _react2.default.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      numbers = _React$useState4[0],
      setNumbers = _React$useState4[1];

  var _React$useState5 = _react2.default.useState(true),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      vaild = _React$useState6[0],
      setValid = _React$useState6[1];

  var _React$useState7 = _react2.default.useState(""),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      groupID = _React$useState8[0],
      setGroupID = _React$useState8[1];

  var handleClose = function handleClose() {
    setOpen(false);
    setNumbers([]);
    setValid(true);
  };

  var urlParams = new URLSearchParams(window.location.search);
  var restaurant = urlParams.get("restaurant");
  var axiosInstance = _axios2.default.create({
    baseURL: _APIURL.APIURL + "/api/v1"
  });
  var orderGroup = function orderGroup(tableID) {
    console.log("tableID", tableID);
    setLoading(true);
    axiosInstance.get("/restaurant/planner/select-table?group_id=" + tableID + "&restaurant_id=" + restaurant).then(function (res) {
      if (res.data.data.url) {
        window.location.replace(res.data.data.url);
      }
    }).catch(function (err) {
      if (err.response) {
        setLoading(false);
        if (err.response.status == 422) {
          setLoading(false);
          _reactHotToast2.default.error("Please save your changes first", {
            icon: "⚠️",
            iconTheme: {
              primary: "#000",
              secondary: "#fff"
            }
          });
        }
      }
    });
  };

  var sendUserID = function sendUserID() {
    setLoading(true);
    axiosInstance.post("/dine-in-orders/check-user-validity", {
      restaurant_id: restaurant,
      order_taker_number: numbers.join("")
    }).then(function (res) {
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
    }).catch(function (err) {
      if (err.response) {
        setLoading(false);
        if (err.response.status == 422) {
          setLoading(false);
          _reactHotToast2.default.error("Please save your changes first", {
            icon: "⚠️",
            iconTheme: {
              primary: "#000",
              secondary: "#fff"
            }
          });
        }
      }
    });
  };

  var openPopup = function openPopup(id) {
    setGroupID(id);
    setOpen(true);
    console.log("groupID", id);
  };

  var handleDeleteLastNumber = function handleDeleteLastNumber() {
    var newArray = [].concat(_toConsumableArray(numbers));
    newArray.pop();
    console.log("newNumbers", newArray);
    setNumbers(newArray);
  };

  if (!VISIBILITY_MODE[mode]) return null;

  return loading === true ? _react2.default.createElement(
    "div",
    { className: "loading-groub" },
    _react2.default.createElement("span", { className: "loader" })
  ) : _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(
      _panel2.default,
      { name: context.translator.t("Groups"), opened: groups.size > 0 },
      groups.size ? _react2.default.createElement(
        "table",
        { style: tablegroupStyle },
        _react2.default.createElement(
          "thead",
          null,
          _react2.default.createElement(
            "tr",
            null,
            _react2.default.createElement("th", { colSpan: "4" }),
            _react2.default.createElement(
              "th",
              null,
              context.translator.t("Elements")
            ),
            _react2.default.createElement(
              "th",
              null,
              context.translator.t("Name")
            )
          )
        ),
        _react2.default.createElement(
          "tbody",
          null,
          groups.entrySeq().map(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
                groupID = _ref3[0],
                group = _ref3[1];

            var selectClick = function selectClick(e) {
              context.groupsActions.selectGroup(groupID);
            };

            var swapVisibility = function swapVisibility(e) {
              e.stopPropagation();
              context.groupsActions.setGroupProperties(groupID, new _immutable.Map({ visible: !group.get("visible") }));
            };

            var chainToGroup = function chainToGroup(e) {
              layers.forEach(function (layer) {
                var layerID = layer.get("id");
                var layerElements = {
                  lines: layer.get("lines"),
                  items: layer.get("items"),
                  holes: layer.get("holes"),
                  areas: layer.get("areas")
                };

                var _loop = function _loop(elementPrototype) {
                  var ElementList = layerElements[elementPrototype];
                  ElementList.filter(function (el) {
                    return el.get("selected");
                  }).forEach(function (element) {
                    console.log("GRIII", context.groupsActions.addToGroup(groupID, layerID, elementPrototype, element.get("id")));
                    context.groupsActions.addToGroup(groupID, layerID, elementPrototype, element.get("id"));
                  });
                };

                for (var elementPrototype in layerElements) {
                  _loop(elementPrototype);
                }
              });

              selectClick(e);
            };

            var isCurrentgroup = group.get("selected");
            var shouldHighlight = isCurrentgroup;
            var rowStyle = !shouldHighlight ? null : styleHoverColor;

            var dimension = group.get("elements").reduce(function (sum, layer) {
              return sum + layer.reduce(function (lSum, elProt) {
                return lSum + elProt.size;
              }, 0);
            }, 0);

            return _react2.default.createElement(
              "tr",
              { key: groupID, style: rowStyle },
              _react2.default.createElement(
                "td",
                {
                  style: iconColStyle,
                  title: context.translator.t("Order This Group")
                },
                _react2.default.createElement(_fa.FaLink, {
                  onClick: function onClick() {
                    return openPopup(groupID);
                  },
                  style: !shouldHighlight ? styleEditButton : styleEditButtonHover
                })
              ),
              _react2.default.createElement("td", null),
              _react2.default.createElement(
                "td",
                {
                  style: iconColStyle,
                  title: context.translator.t("Delete group and all Elements")
                },
                _react2.default.createElement(_fa.FaTrash, {
                  onClick: function onClick(e) {
                    return context.groupsActions.removeGroupAndDeleteElements(groupID);
                  },
                  style: !shouldHighlight ? styleEditButton : styleEditButtonHover
                })
              ),
              _react2.default.createElement("td", null),
              _react2.default.createElement(
                "td",
                {
                  onClick: selectClick,
                  style: { width: "0em", textAlign: "center" }
                },
                dimension
              ),
              _react2.default.createElement("td", null),
              _react2.default.createElement(
                "td",
                { onClick: selectClick },
                group.get("name")
              )
            );
          })
        )
      ) : null,
      _react2.default.createElement(
        "table",
        { style: { width: "100%", marginTop: "0.1em" } },
        _react2.default.createElement(
          "tbody",
          null,
          _react2.default.createElement(
            "tr",
            null,
            _react2.default.createElement(
              "td",
              {
                style: !newEmptyHover ? newLayerLableStyle : newLayerLableHoverStyle,
                onMouseOver: function onMouseOver() {
                  return setNewEmptyHover(true);
                },
                onMouseOut: function onMouseOut() {
                  return setNewEmptyHover(false);
                },
                onClick: function onClick(e) {
                  return context.groupsActions.addGroup();
                }
              },
              _react2.default.createElement(_ti.TiPlus, null),
              _react2.default.createElement(
                "b",
                { style: styleAddLabel },
                context.translator.t("New Empty Group")
              )
            ),
            _react2.default.createElement(
              "td",
              {
                style: !newSelectedHover ? newLayerLableStyle : newLayerLableHoverStyle,
                onMouseOver: function onMouseOver() {
                  return setNewSelectedHover(true);
                },
                onMouseOut: function onMouseOut() {
                  return setNewSelectedHover(false);
                },
                onClick: function onClick(e) {
                  return context.groupsActions.addGroupFromSelected();
                }
              },
              _react2.default.createElement(_ti.TiPlus, null),
              _react2.default.createElement(
                "b",
                { style: styleAddLabel },
                context.translator.t("New Group from selected")
              )
            )
          )
        )
      )
    ),
    _react2.default.createElement(
      _Dialog2.default,
      {
        open: open,
        onClose: handleClose,
        "aria-labelledby": "alert-dialog-title",
        "aria-describedby": "alert-dialog-description"
      },
      _react2.default.createElement(
        _DialogTitle2.default,
        { id: "alert-dialog-title" },
        "Please enter the user ID:"
      ),
      _react2.default.createElement(
        _DialogContent2.default,
        null,
        vaild == false ? _react2.default.createElement(
          "p",
          {
            style: {
              color: "#f55353",
              fontSize: "13px",
              margin: "0px",
              marginBottom: "5px"
            }
          },
          "User not found. Please enter a valid user ID"
        ) : "",
        _react2.default.createElement(
          _DialogContentText2.default,
          { id: "alert-dialog-description" },
          _react2.default.createElement(
            _material.Box,
            { sx: { p: 2, background: "#ddd", width: "350px" } },
            _react2.default.createElement(
              _material.Grid,
              {
                sx: {
                  p: 1,
                  background: "#eee",
                  width: "100%",
                  mb: 2,
                  height: "40px"
                }
              },
              numbers.map(function (item) {
                return "*";
              })
            ),
            _react2.default.createElement(
              _material.Grid,
              {
                sx: {
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap"
                }
              },
              _react2.default.createElement(_NumbersModel2.default, {
                number: 1,
                width: "31%",
                numbers: numbers,
                setNumbers: setNumbers
              }),
              _react2.default.createElement(_NumbersModel2.default, {
                number: 2,
                width: "31%",
                numbers: numbers,
                setNumbers: setNumbers
              }),
              _react2.default.createElement(_NumbersModel2.default, {
                number: 3,
                width: "31%",
                numbers: numbers,
                setNumbers: setNumbers
              }),
              _react2.default.createElement(_NumbersModel2.default, {
                number: 4,
                width: "31%",
                numbers: numbers,
                setNumbers: setNumbers
              }),
              _react2.default.createElement(_NumbersModel2.default, {
                number: 5,
                width: "31%",
                numbers: numbers,
                setNumbers: setNumbers
              }),
              _react2.default.createElement(_NumbersModel2.default, {
                number: 6,
                width: "31%",
                numbers: numbers,
                setNumbers: setNumbers
              }),
              _react2.default.createElement(_NumbersModel2.default, {
                number: 7,
                width: "31%",
                numbers: numbers,
                setNumbers: setNumbers
              }),
              _react2.default.createElement(_NumbersModel2.default, {
                number: 8,
                width: "31%",
                numbers: numbers,
                setNumbers: setNumbers
              }),
              _react2.default.createElement(_NumbersModel2.default, {
                number: 9,
                width: "31%",
                numbers: numbers,
                setNumbers: setNumbers
              }),
              _react2.default.createElement(_NumbersModel2.default, {
                number: 0,
                width: "65%",
                numbers: numbers,
                setNumbers: setNumbers
              }),
              _react2.default.createElement(
                _material.Grid,
                {
                  sx: {
                    p: 1,
                    background: "#eee",
                    width: "31%",
                    mb: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }
                },
                _react2.default.createElement(
                  _Button2.default,
                  {
                    disabled: numbers.length == 0,
                    onClick: handleDeleteLastNumber
                  },
                  _react2.default.createElement(_Backspace2.default, { fontSize: "18px" })
                )
              )
            )
          )
        )
      ),
      _react2.default.createElement(
        _DialogActions2.default,
        { sx: { mr: 3 } },
        _react2.default.createElement(
          _Button2.default,
          { onClick: handleClose, variant: "outlined", color: "error" },
          "Cancel"
        ),
        _react2.default.createElement(
          _Button2.default,
          {
            disabled: numbers.length == 0,
            ml: 2,
            onClick: sendUserID,
            variant: "contained"
          },
          "Submit"
        )
      )
    )
  );
};

PanelGroups.propTypes = {
  mode: _propTypes2.default.string.isRequired,
  groups: _propTypes2.default.object.isRequired,
  layers: _propTypes2.default.object.isRequired
};

PanelGroups.contextTypes = {
  catalog: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired,
  itemsActions: _propTypes2.default.object.isRequired,
  linesActions: _propTypes2.default.object.isRequired,
  holesActions: _propTypes2.default.object.isRequired,
  groupsActions: _propTypes2.default.object.isRequired,
  projectActions: _propTypes2.default.object.isRequired
};

exports.default = PanelGroups;