"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ToolbarSaveButton;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fa = require("react-icons/fa");

var _toolbarButton = require("./toolbar-button");

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

var _browser = require("../../utils/browser");

var _export = require("../../class/export");

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _reactHotToast = require("react-hot-toast");

var _reactHotToast2 = _interopRequireDefault(_reactHotToast);

var _APIURL = require("../../../demo/src/APIURL");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ToolbarSaveButton(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator;

  var urlParams = new URLSearchParams(window.location.search);
  var restaurant = urlParams.get("restaurant");
  // const domain = urlParams.get("domain");
  console.log("restaurant", restaurant);

  var axiosInstance = _axios2.default.create({
    baseURL: _APIURL.APIURL + "/api/v1/restaurant/planner"
  });

  var saveProject = function saveProject() {};

  var saveProjectToFile = function saveProjectToFile(e) {
    e.preventDefault();
    state = _export.Project.unselectAll(state).updatedState;

    var formData = new FormData();
    var jsonData = JSON.stringify(state.get("scene").toJS());
    var blob = new Blob([jsonData], {
      type: "application/json"
    });
    formData.append("file", blob, "data.json");
    var url = URL.createObjectURL(blob);

    axiosInstance.post("/save", {
      restaurant_id: restaurant,
      file: blob
      // file: JSON.stringify(state.get("scene").toJS()),
    }, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(function (res) {
      console.log("res", res);
      _reactHotToast2.default.success("Saved successfully");
    });
    // browserDownload(state.get("scene").toJS());
    console.log("jsss", state.get("scene").toJS());
  };

  return _react2.default.createElement(
    _toolbarButton2.default,
    {
      active: false,
      tooltip: translator.t("Save project"),
      onClick: saveProjectToFile
    },
    _react2.default.createElement(_fa.FaSave, null)
  );
}

ToolbarSaveButton.propTypes = {
  state: _propTypes2.default.object.isRequired
};

ToolbarSaveButton.contextTypes = {
  translator: _propTypes2.default.object.isRequired
};