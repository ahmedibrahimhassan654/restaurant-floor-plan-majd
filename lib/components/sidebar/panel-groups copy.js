"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var _constants = require("../../constants");

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _reactHotToast = require("react-hot-toast");

var _reactHotToast2 = _interopRequireDefault(_reactHotToast);

var _APIURL = require("../../../demo/src/APIURL");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VISIBILITY_MODE = {
  MODE_IDLE: _constants.MODE_IDLE,
  MODE_2D_ZOOM_IN: _constants.MODE_2D_ZOOM_IN,
  MODE_2D_ZOOM_OUT: _constants.MODE_2D_ZOOM_OUT,
  MODE_2D_PAN: _constants.MODE_2D_PAN,
  MODE_3D_VIEW: _constants.MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON: _constants.MODE_3D_FIRST_PERSON,
  MODE_WAITING_DRAWING_LINE: _constants.MODE_WAITING_DRAWING_LINE,
  MODE_DRAWING_LINE: _constants.MODE_DRAWING_LINE,
  MODE_DRAWING_HOLE: _constants.MODE_DRAWING_HOLE,
  MODE_DRAWING_ITEM: _constants.MODE_DRAWING_ITEM,
  MODE_DRAGGING_LINE: _constants.MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX: _constants.MODE_DRAGGING_VERTEX,
  MODE_DRAGGING_ITEM: _constants.MODE_DRAGGING_ITEM,
  MODE_DRAGGING_HOLE: _constants.MODE_DRAGGING_HOLE,
  MODE_FITTING_IMAGE: _constants.MODE_FITTING_IMAGE,
  MODE_UPLOADING_IMAGE: _constants.MODE_UPLOADING_IMAGE,
  MODE_ROTATING_ITEM: _constants.MODE_ROTATING_ITEM
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

var PanelGroups = function (_Component) {
  _inherits(PanelGroups, _Component);

  function PanelGroups(props, context) {
    _classCallCheck(this, PanelGroups);

    var _this = _possibleConstructorReturn(this, (PanelGroups.__proto__ || Object.getPrototypeOf(PanelGroups)).call(this, props, context));

    _this.state = {
      newEmptyHover: false,
      newSelectedHover: false,
      loading: false
    };
    return _this;
  }

  _createClass(PanelGroups, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.groups.hashCode() !== nextProps.groups.hashCode() || this.props.layers.hashCode() !== nextProps.layers.hashCode() || this.props.mode !== nextProps.mode;
    }
  }, {
    key: "orderGroup",
    value: function orderGroup(tableID) {
      var _this2 = this;

      console.log("tableID", tableID);

      var urlParams = new URLSearchParams(window.location.search);
      var restaurant = urlParams.get("restaurant");
      // const domain = urlParams.get("domain");
      console.log("restaurant", restaurant);

      var axiosInstance = _axios2.default.create({
        baseURL: _APIURL.APIURL + "/api/v1/restaurant/planner"
      });

      console.log("Order");
      axiosInstance.get("/select-table?group_id=" + tableID.groupID + "&restaurant_id=" + restaurant).then(function (res) {
        // console.log("res", res.data);
        _this2.setState({ loading: true });
        if (res.data.data.url) {
          window.location.replace(res.data.data.url);
        }
      }).catch(function (err) {
        if (err.response) {
          _this2.setState({ loading: false });
          if (err.response.status == 422) {
            _this2.setState({ loading: false });
            _reactHotToast2.default.error("Please save your changes first", {
              icon: "⚠️",

              // Change colors of success/error/loading icon
              iconTheme: {
                primary: "#000",
                secondary: "#fff"
              }
            });
          }
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          mode = _props.mode,
          groups = _props.groups,
          layers = _props.layers;
      var loading = this.state.loading;


      console.log("laod", loading);

      if (!VISIBILITY_MODE[mode]) return null;

      return loading == true ? _react2.default.createElement(
        "div",
        { className: "loading-groub" },
        _react2.default.createElement("span", { "class": "loader" })
      ) : _react2.default.createElement(
        _panel2.default,
        {
          name: this.context.translator.t("Groups"),
          opened: groups.size > 0
        },
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
                this.context.translator.t("Elements")
              ),
              _react2.default.createElement(
                "th",
                null,
                this.context.translator.t("Name")
              )
            )
          ),
          _react2.default.createElement(
            "tbody",
            null,
            groups.entrySeq().map(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  groupID = _ref2[0],
                  group = _ref2[1];

              var selectClick = function selectClick(e) {
                _this3.context.groupsActions.selectGroup(groupID);

                // console.log(
                //   "iddddgroupd",
                //   this.context.groupsActions.selectGroup(groupID)
                // );
              };

              var swapVisibility = function swapVisibility(e) {
                e.stopPropagation();
                _this3.context.groupsActions.setGroupProperties(groupID, new _immutable.Map({ visible: !group.get("visible") }));
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
                      console.log("GRIII", _this3.context.groupsActions.addToGroup(groupID, layerID, elementPrototype, element.get("id")));
                      _this3.context.groupsActions.addToGroup(groupID, layerID, elementPrototype, element.get("id"));
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
                    title: _this3.context.translator.t("Order This Group")
                  },
                  _react2.default.createElement(_fa.FaLink, {
                    onClick: function onClick() {
                      return _this3.orderGroup(_this3.context.groupsActions.selectGroup(groupID));
                    },
                    style: !shouldHighlight ? styleEditButton : styleEditButtonHover
                  })
                ),
                _react2.default.createElement("td", null),
                _react2.default.createElement(
                  "td",
                  {
                    style: iconColStyle,
                    title: _this3.context.translator.t("Delete group and all Elements")
                  },
                  _react2.default.createElement(_fa.FaTrash, {
                    onClick: function onClick(e) {
                      return _this3.context.groupsActions.removeGroupAndDeleteElements(groupID);
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
                  style: !this.state.newEmptyHover ? newLayerLableStyle : newLayerLableHoverStyle,
                  onMouseOver: function onMouseOver() {
                    return _this3.setState({ newEmptyHover: true });
                  },
                  onMouseOut: function onMouseOut() {
                    return _this3.setState({ newEmptyHover: false });
                  },
                  onClick: function onClick(e) {
                    return _this3.context.groupsActions.addGroup();
                  }
                },
                _react2.default.createElement(_ti.TiPlus, null),
                _react2.default.createElement(
                  "b",
                  { style: styleAddLabel },
                  this.context.translator.t("New Empty Group")
                )
              ),
              _react2.default.createElement(
                "td",
                {
                  style: !this.state.newSelectedHover ? newLayerLableStyle : newLayerLableHoverStyle,
                  onMouseOver: function onMouseOver() {
                    return _this3.setState({ newSelectedHover: true });
                  },
                  onMouseOut: function onMouseOut() {
                    return _this3.setState({ newSelectedHover: false });
                  },
                  onClick: function onClick(e) {
                    return _this3.context.groupsActions.addGroupFromSelected();
                  }
                },
                _react2.default.createElement(_ti.TiPlus, null),
                _react2.default.createElement(
                  "b",
                  { style: styleAddLabel },
                  this.context.translator.t("New Group from selected")
                )
              )
            )
          )
        )
      );
    }
  }]);

  return PanelGroups;
}(_react.Component);

exports.default = PanelGroups;


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