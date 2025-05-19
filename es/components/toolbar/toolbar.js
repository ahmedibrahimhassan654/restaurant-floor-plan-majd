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

var _Cat = require("./Cat.json");

var _Cat2 = _interopRequireDefault(_Cat);

var _constants = require("../../constants");

var _sharedStyle = require("../../shared-style");

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _getJson = require("./getJson");

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

var ASIDE_STYLE = {
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  padding: "10px"
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

  var sorter = [
  // {
  //   index: 0,
  //   condition: allowProjectFileSupport,
  //   dom: (
  //     <ToolbarButton
  //       active={false}
  //       tooltip={translator.t("New project")}
  //       onClick={(event) =>
  //         confirm(translator.t("Would you want to start a new Project?"))
  //           ? projectActions.newProject()
  //           : null
  //       }
  //     >
  //       <FaFile />
  //     </ToolbarButton>
  //   ),
  // },
  {
    index: 1,
    condition: allowProjectFileSupport,
    dom: _react2.default.createElement(_toolbarSaveButton2.default, { state: state })
  },
  // {
  //   index: 2,
  //   condition: allowProjectFileSupport,
  //   dom: <ToolbarLoadButton state={state} />,
  // },
  {
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
  },
  // {
  //   index: 4,
  //   condition: true,
  //   dom: (
  //     <ToolbarButton
  //       active={[MODE_3D_VIEW].includes(mode)}
  //       tooltip={translator.t("3D View")}
  //       onClick={(event) => viewer3DActions.selectTool3DView()}
  //     >
  //       <Icon3D />
  //     </ToolbarButton>
  //   ),
  // },
  // {
  //   index: 5,
  //   condition: true,
  //   dom: (
  //     <ToolbarButton
  //       active={[MODE_IDLE].includes(mode)}
  //       tooltip={translator.t("2D View")}
  //       onClick={(event) => projectActions.setMode(MODE_IDLE)}
  //     >
  //       {[MODE_3D_FIRST_PERSON, MODE_3D_VIEW].includes(mode) ? (
  //         <Icon2D style={{ color: alterateColor }} />
  //       ) : (
  //         <FaMousePointer style={{ color: alterateColor }} />
  //       )}
  //     </ToolbarButton>
  //   ),
  // },
  // {
  //   index: 6,
  //   condition: true,
  //   dom: (
  //     <ToolbarButton
  //       active={[MODE_3D_FIRST_PERSON].includes(mode)}
  //       tooltip={translator.t("3D First Person")}
  //       onClick={(event) => viewer3DActions.selectTool3DFirstPerson()}
  //     >
  //       <MdDirectionsRun />
  //     </ToolbarButton>
  //   ),
  // },
  {
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

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var urlParams = new URLSearchParams(window.location.search); // This was commented out
  var restaurant = urlParams.get("restaurant"); // This was commented out
  // var restaurant = "4"; // Here the restaurant_id is statically set to "4"
  //const domain = urlParams.get("domain");
  console.log("restaurant", restaurant);

  var axiosInstance = _axios2.default.create({
    baseURL: _APIURL.APIURL + "/api/v1/restaurant/planner"
  });

  var getPlanner = function getPlanner() {
    // The 'restaurant' variable used below will be "4"
    axiosInstance.get("/get?restaurant_id=" + restaurant).then(function (res) {
      console.log("res", res); // This is the line you highlighted
      console.log("res", res.data.status == 404);
      localStorage.setItem("backend_img", res.data.backend_img || "https://start-tech.ae/plan-1.jpg");
      if (res.data.status == 404) {
        projectActions.newProject();
        setLoading(false);
        console.log("ceate");
      } else if (res.data.status == 200) {
        setLoading(false);
        console.log("res", res);
        localStorage.setItem("orders", res.data.items_have_order);
        localStorage.setItem("use_user_id_popup", res.data.use_user_id_popup);

        console.log("load");

        // console.log("data", res.data.data.url);
        console.log("Cat", _Cat2.default);
        console.log("dataaaaaaaa", res.data.data);
        // projectActions.loadProject(Cat);
        projectActions.loadProject(res.data.data);
      }
    }).catch(function (err) {
      console.log("error", err.response.status);
      if (err.response) {
        if (err.response.status == 422) {
          setError("Enter Resturant ID");
          setLoading(false);
        }
      }
    });
  };
  (0, _react.useEffect)(function () {
    getPlanner();
  }, []);
  // console.log("errrrrrrrror", error);
  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    loading ? _react2.default.createElement(
      "div",
      { className: "loading" },
      _react2.default.createElement("span", { "class": "loader" })
    ) : error ? _react2.default.createElement(
      "div",
      { className: "loading" },
      _react2.default.createElement(
        "div",
        { className: "error" },
        _react2.default.createElement(
          "h4",
          null,
          "Error!!"
        ),
        _react2.default.createElement(
          "p",
          null,
          error
        )
      )
    ) : _react2.default.createElement(
      "aside",
      {
        style: _extends({}, ASIDE_STYLE, { maxWidth: width, maxHeight: height }),
        className: "toolbar"
      },
      sorter.sort(sortButtonsCb).map(mapButtonsCb)
    )
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