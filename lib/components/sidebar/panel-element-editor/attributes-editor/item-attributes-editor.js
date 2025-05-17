"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = ItemAttributesEditor;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _formNumberInput = require("../../../style/form-number-input");

var _formNumberInput2 = _interopRequireDefault(_formNumberInput);

var _formTextInput = require("../../../style/form-text-input");

var _formTextInput2 = _interopRequireDefault(_formTextInput);

var _material = require("@mui/material");

var _Backspace = require("@mui/icons-material/Backspace");

var _Backspace2 = _interopRequireDefault(_Backspace);

var _NumbersModel = require("../../NumbersModel");

var _NumbersModel2 = _interopRequireDefault(_NumbersModel);

var _APIURL = require("../../../../../demo/src/APIURL");

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _reactHotToast = require("react-hot-toast");

var _reactHotToast2 = _interopRequireDefault(_reactHotToast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var tableStyle = { width: "100%" };
var firstTdStyle = { width: "6em" };
var inputStyle = { textAlign: "left" };

function ItemAttributesEditor(_ref, _ref2) {
  var translator = _ref2.translator;

  var element = _ref.element,
      onUpdate = _ref.onUpdate,
      attributeFormData = _ref.attributeFormData,
      state = _ref.state,
      rest = _objectWithoutProperties(_ref, ["element", "onUpdate", "attributeFormData", "state"]);

  var name = attributeFormData.has("name") ? attributeFormData.get("name") : element.name;
  var renderedX = attributeFormData.has("x") ? attributeFormData.get("x") : element.x;
  var renderedY = attributeFormData.has("y") ? attributeFormData.get("y") : element.y;
  var renderedR = attributeFormData.has("rotation") ? attributeFormData.get("rotation") : element.rotation;

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

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      open = _useState8[0],
      setOpen = _useState8[1];

  var _useState9 = (0, _react.useState)([]),
      _useState10 = _slicedToArray(_useState9, 2),
      numbers = _useState10[0],
      setNumbers = _useState10[1];

  var _useState11 = (0, _react.useState)(true),
      _useState12 = _slicedToArray(_useState11, 2),
      vaild = _useState12[0],
      setValid = _useState12[1];

  var _useState13 = (0, _react.useState)(""),
      _useState14 = _slicedToArray(_useState13, 2),
      groupID = _useState14[0],
      setGroupID = _useState14[1];

  var use_user_id_popup = localStorage.getItem("use_user_id_popup");
  console.log("use_user_id_popup", use_user_id_popup);

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
    axiosInstance.get("/restaurant/planner/select-table?table_id=" + tableID + "&restaurant_id=" + restaurant).then(function (res) {
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
          setNumbers([]);
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
    if (use_user_id_popup == "false") {
      orderGroup(id);
    } else {
      if (element.name) {
        setGroupID(id);
        setOpen(true);
        console.log("groupID", id);
      } else {
        _reactHotToast2.default.error("Please enter the table name and click save");
      }
    }
  };

  var handleDeleteLastNumber = function handleDeleteLastNumber() {
    var newArray = [].concat(_toConsumableArray(numbers));
    newArray.pop();
    console.log("newNumbers", newArray);
    setNumbers(newArray);
  };

  // tableFour one_cher_s;
  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(
      "table",
      { style: tableStyle },
      _react2.default.createElement(
        "tbody",
        null,
        _react2.default.createElement(
          "tr",
          null,
          _react2.default.createElement(
            "td",
            { style: firstTdStyle },
            translator.t("Name")
          ),
          _react2.default.createElement(
            "td",
            null,
            _react2.default.createElement(_formTextInput2.default, {
              value: name,
              onChange: function onChange(event) {
                return onUpdate("name", event.target.value);
              },
              style: inputStyle
            })
          )
        )
      )
    ),
    element.type == "sedia" || element.type == "one_cher_s" || element.type == "tableFour" ? null : _react2.default.createElement(
      "button",
      {
        onClick: function onClick() {
          return openPopup(element.id);
        },
        style: { width: "100%", margin: "10px 0", padding: "5px" }
      },
      "Create Order"
    ),
    _react2.default.createElement(
      _material.Dialog,
      {
        open: open,
        onClose: handleClose,
        "aria-labelledby": "alert-dialog-title",
        "aria-describedby": "alert-dialog-description"
      },
      _react2.default.createElement(
        _material.DialogTitle,
        { id: "alert-dialog-title" },
        "Please enter the user ID:"
      ),
      _react2.default.createElement(
        _material.DialogContent,
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
          _material.DialogContentText,
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
                  _material.Button,
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
        _material.DialogActions,
        { sx: { mr: 3 } },
        _react2.default.createElement(
          _material.Button,
          { onClick: handleClose, variant: "outlined", color: "error" },
          "Cancel"
        ),
        _react2.default.createElement(
          _material.Button,
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
}

ItemAttributesEditor.propTypes = {
  element: _propTypes2.default.object.isRequired,
  onUpdate: _propTypes2.default.func.isRequired,
  attributeFormData: _propTypes2.default.object.isRequired,
  state: _propTypes2.default.object.isRequired
};

ItemAttributesEditor.contextTypes = {
  translator: _propTypes2.default.object.isRequired
};