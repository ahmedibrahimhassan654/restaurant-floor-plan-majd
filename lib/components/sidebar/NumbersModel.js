"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _material = require("@mui/material");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var NumbersModel = function NumbersModel(_ref) {
  var number = _ref.number,
      width = _ref.width,
      numbers = _ref.numbers,
      setNumbers = _ref.setNumbers;

  var logFunction = function logFunction(number) {
    setNumbers([].concat(_toConsumableArray(numbers), [number]));
    console.log("logFunc", number);
  };
  return _react2.default.createElement(
    _material.Grid,
    {
      sx: {
        p: 1,
        background: "#eee",
        width: width,
        mb: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }
    },
    _react2.default.createElement(
      _material.Button,
      { fullWidth: true, onClick: function onClick() {
          return logFunction(number);
        } },
      number
    )
  );
};

exports.default = NumbersModel;