"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _md = require("react-icons/md");

var _fa = require("react-icons/fa");

var _toolbarButton = require("./toolbar-button");

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

var _toolbarSaveButton = require("./toolbar-save-button");

var _toolbarSaveButton2 = _interopRequireDefault(_toolbarSaveButton);

var _toolbarLoadButton = require("./toolbar-load-button");

var _toolbarLoadButton2 = _interopRequireDefault(_toolbarLoadButton);

var _reactIf = require("../../utils/react-if");

var _reactIf2 = _interopRequireDefault(_reactIf);

var _constants = require("../../constants");

var _sharedStyle = require("../../shared-style");

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _APIURL = require("../../../demo/src/APIURL");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconTextStyle = {
  fontSize: "19px",
  textDecoration: "none",
  fontWeight: "bold",
  margin: "0px",
  userSelect: "none"
};

var Icon2D = function Icon2D(_ref) {
  var style = _ref.style;
  return _react2.default.createElement(
    "p",
    { style: _extends({}, iconTextStyle, style) },
    "2D"
  );
};
var Icon3D = function Icon3D(_ref2) {
  var style = _ref2.style;
  return _react2.default.createElement(
    "p",
    { style: _extends({}, iconTextStyle, style) },
    "3D"
  );
};
var sortButtonsCb = function sortButtonsCb(a, b) {
  if (a.index === undefined || a.index === null) {
    a.index = Number.MAX_SAFE_INTEGER;
  }

  if (b.index === undefined || b.index === null) {
    b.index = Number.MAX_SAFE_INTEGER;
  }

  return a.index - b.index;
};

var mapButtonsCb = function mapButtonsCb(el, ind) {
  return _react2.default.createElement(
    _reactIf2.default,
    { key: ind, condition: el.condition, style: { position: "relative" } },
    el.dom
  );
};

var ASIDE_STYLE = {
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  padding: "10px"
};

var Toolbar = function Toolbar(_ref3, context) {
  var state = _ref3.state,
      width = _ref3.width,
      height = _ref3.height,
      toolbarButtons = _ref3.toolbarButtons,
      allowProjectFileSupport = _ref3.allowProjectFileSupport;
  var projectActions = context.projectActions,
      viewer3DActions = context.viewer3DActions,
      translator = context.translator;


  var mode = state.get("mode");
  var alterate = state.get("alterate");
  var alterateColor = alterate ? SharedStyle.MATERIAL_COLORS[500].orange : "";

  var sorter = [{
    index: 0,
    condition: allowProjectFileSupport,
    dom: _react2.default.createElement(
      _toolbarButton2.default,
      {
        active: false,
        tooltip: translator.t("New project"),
        onClick: function onClick(event) {
          return confirm(translator.t("Would you want to start a new Project?")) ? projectActions.newProject() : null;
        }
      },
      _react2.default.createElement(_fa.FaFile, null)
    )
  }, {
    index: 1,
    condition: allowProjectFileSupport,
    dom: _react2.default.createElement(_toolbarSaveButton2.default, null)
  }, {
    index: 2,
    condition: allowProjectFileSupport,
    dom: _react2.default.createElement(_toolbarLoadButton2.default, { state: state })
  }, {
    index: 3,
    condition: true,
    dom: _react2.default.createElement(
      _toolbarButton2.default,
      {
        active: [_constants.MODE_VIEWING_CATALOG].includes(mode),
        tooltip: translator.t("Open catalog"),
        onClick: function onClick(event) {
          return projectActions.openCatalog();
        }
      },
      _react2.default.createElement(_fa.FaPlus, null)
    )
  }, {
    index: 4,
    condition: true,
    dom: _react2.default.createElement(
      _toolbarButton2.default,
      {
        active: [_constants.MODE_3D_VIEW].includes(mode),
        tooltip: translator.t("3D View"),
        onClick: function onClick(event) {
          return viewer3DActions.selectTool3DView();
        }
      },
      _react2.default.createElement(Icon3D, null)
    )
  }, {
    index: 5,
    condition: true,
    dom: _react2.default.createElement(
      _toolbarButton2.default,
      {
        active: [_constants.MODE_IDLE].includes(mode),
        tooltip: translator.t("2D View"),
        onClick: function onClick(event) {
          return projectActions.setMode(_constants.MODE_IDLE);
        }
      },
      [_constants.MODE_3D_FIRST_PERSON, _constants.MODE_3D_VIEW].includes(mode) ? _react2.default.createElement(Icon2D, { style: { color: alterateColor } }) : _react2.default.createElement(_fa.FaMousePointer, { style: { color: alterateColor } })
    )
  }, {
    index: 6,
    condition: true,
    dom: _react2.default.createElement(
      _toolbarButton2.default,
      {
        active: [_constants.MODE_3D_FIRST_PERSON].includes(mode),
        tooltip: translator.t("3D First Person"),
        onClick: function onClick(event) {
          return viewer3DActions.selectTool3DFirstPerson();
        }
      },
      _react2.default.createElement(_md.MdDirectionsRun, null)
    )
  }, {
    index: 7,
    condition: true,
    dom: _react2.default.createElement(
      _toolbarButton2.default,
      {
        active: false,
        tooltip: translator.t("Undo (CTRL-Z)"),
        onClick: function onClick(event) {
          return projectActions.undo();
        }
      },
      _react2.default.createElement(_md.MdUndo, null)
    )
  }, {
    index: 8,
    condition: true,
    dom: _react2.default.createElement(
      _toolbarButton2.default,
      {
        active: [_constants.MODE_CONFIGURING_PROJECT].includes(mode),
        tooltip: translator.t("Configure project"),
        onClick: function onClick(event) {
          return projectActions.openProjectConfigurator();
        }
      },
      _react2.default.createElement(_md.MdSettings, null)
    )
  }];

  sorter = sorter.concat(toolbarButtons.map(function (Component, key) {
    return Component.prototype //if is a react component
    ? {
      condition: true,
      dom: _react2.default.createElement(Component, { mode: mode, state: state, key: key })
    } : {
      //else is a sortable toolbar button
      index: Component.index,
      condition: Component.condition,
      dom: _react2.default.createElement(Component.dom, { mode: mode, state: state, key: key })
    };
  }));

  var urlParams = new URLSearchParams(window.location.search);
  var restaurant = urlParams.get("restaurant");
  // const domain = urlParams.get("domain");
  console.log("restaurant", restaurant);

  var axiosInstance = _axios2.default.create({
    baseURL: _APIURL.APIURL + "/api/v1/restaurant/planner"
  });

  var getPlanner = function getPlanner() {
    axiosInstance.get("/get?restaurant_id=" + restaurant).then(function (res) {
      console.log("res", res.data.status == 404);
      if (res.data.status == 404) {
        projectActions.newProject();
      }
    });
  };
  (0, _react.useEffect)(function () {
    getPlanner();
  }, []);

  var saveProject = function saveProject() {
    console.log("Save");
  };
  return _react2.default.createElement(
    "aside",
    {
      style: _extends({}, ASIDE_STYLE, { maxWidth: width, maxHeight: height }),
      className: "toolbar"
    },
    sorter.sort(sortButtonsCb).map(mapButtonsCb)
  );
};

Toolbar.propTypes = {
  state: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  allowProjectFileSupport: _propTypes2.default.bool.isRequired,
  toolbarButtons: _propTypes2.default.array
};

Toolbar.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  viewer2DActions: _propTypes2.default.object.isRequired,
  viewer3DActions: _propTypes2.default.object.isRequired,
  linesActions: _propTypes2.default.object.isRequired,
  holesActions: _propTypes2.default.object.isRequired,
  itemsActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};

exports.default = Toolbar;