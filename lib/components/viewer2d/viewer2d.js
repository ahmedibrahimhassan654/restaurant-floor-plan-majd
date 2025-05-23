"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Viewer2D;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSvgPanZoom = require("react-svg-pan-zoom");

var _constants = require("../../constants");

var constants = _interopRequireWildcard(_constants);

var _state = require("./state");

var _state2 = _interopRequireDefault(_state);

var _sharedStyle = require("../../shared-style");

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _export = require("./export");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mode2Tool(mode) {
  switch (mode) {
    case constants.MODE_2D_PAN:
      return _reactSvgPanZoom.TOOL_PAN;
    case constants.MODE_2D_ZOOM_IN:
      return _reactSvgPanZoom.TOOL_ZOOM_IN;
    case constants.MODE_2D_ZOOM_OUT:
      return _reactSvgPanZoom.TOOL_ZOOM_OUT;
    case constants.MODE_IDLE:
      return _reactSvgPanZoom.TOOL_AUTO;
    default:
      return _reactSvgPanZoom.TOOL_NONE;
  }
}

function mode2PointerEvents(mode) {
  switch (mode) {
    case constants.MODE_DRAWING_LINE:
    case constants.MODE_DRAWING_HOLE:
    case constants.MODE_DRAWING_ITEM:
    case constants.MODE_DRAGGING_HOLE:
    case constants.MODE_DRAGGING_ITEM:
    case constants.MODE_DRAGGING_LINE:
    case constants.MODE_DRAGGING_VERTEX:
      return { pointerEvents: "none" };

    default:
      return {};
  }
}

function mode2Cursor(mode) {
  switch (mode) {
    case constants.MODE_DRAGGING_HOLE:
    case constants.MODE_DRAGGING_LINE:
    case constants.MODE_DRAGGING_VERTEX:
    case constants.MODE_DRAGGING_ITEM:
      return { cursor: "move" };

    case constants.MODE_ROTATING_ITEM:
      return { cursor: "ew-resize" };

    case constants.MODE_WAITING_DRAWING_LINE:
    case constants.MODE_DRAWING_LINE:
      return { cursor: "crosshair" };
    default:
      return { cursor: "default" };
  }
}

function mode2DetectAutopan(mode) {
  switch (mode) {
    case constants.MODE_DRAWING_LINE:
    case constants.MODE_DRAGGING_LINE:
    case constants.MODE_DRAGGING_VERTEX:
    case constants.MODE_DRAGGING_HOLE:
    case constants.MODE_DRAGGING_ITEM:
    case constants.MODE_DRAWING_HOLE:
    case constants.MODE_DRAWING_ITEM:
      return true;

    default:
      return false;
  }
}

function extractElementData(node) {
  while (!node.attributes.getNamedItem("data-element-root") && node.tagName !== "svg") {
    node = node.parentNode;
  }
  if (node.tagName === "svg") return null;

  return {
    part: node.attributes.getNamedItem("data-part") ? node.attributes.getNamedItem("data-part").value : undefined,
    layer: node.attributes.getNamedItem("data-layer").value,
    prototype: node.attributes.getNamedItem("data-prototype").value,
    selected: node.attributes.getNamedItem("data-selected").value === "true",
    id: node.attributes.getNamedItem("data-id").value
  };
}

function Viewer2D(_ref, _ref2) {
  var state = _ref.state,
      width = _ref.width,
      height = _ref.height;
  var viewer2DActions = _ref2.viewer2DActions,
      linesActions = _ref2.linesActions,
      holesActions = _ref2.holesActions,
      verticesActions = _ref2.verticesActions,
      itemsActions = _ref2.itemsActions,
      areaActions = _ref2.areaActions,
      projectActions = _ref2.projectActions,
      catalog = _ref2.catalog;
  var viewer2D = state.viewer2D,
      mode = state.mode,
      scene = state.scene;

  var layerID = scene.selectedLayer;

  var mapCursorPosition = function mapCursorPosition(_ref3) {
    var x = _ref3.x,
        y = _ref3.y;

    return { x: x, y: -y + scene.height };
  };

  var Viewer = (0, _react.useRef)(null);
  (0, _react.useLayoutEffect)(function () {
    Viewer.current.fitToViewer();
  }, []);

  var onPointerDown = function onPointerDown(viewerEvent) {
    var event = viewerEvent.originalEvent;

    var _mapCursorPosition = mapCursorPosition(viewerEvent),
        x = _mapCursorPosition.x,
        y = _mapCursorPosition.y;

    if (mode === constants.MODE_IDLE) {
      var elementData = extractElementData(event.target);
      if (!elementData || !elementData.selected) return;

      switch (elementData.prototype) {
        case "items":
          if (elementData.part === "rotation-anchor") {
            itemsActions.beginRotatingItem(elementData.layer, elementData.id, x, y);
          } else {
            itemsActions.beginDraggingItem(elementData.layer, elementData.id, x, y);
          }
          break;

        // Handle other prototypes as needed
      }
    }
    event.stopPropagation();
  };

  // Ensure correct transformations during dragging
  var onPointerMove = function onPointerMove(viewerEvent) {
    var _mapCursorPosition2 = mapCursorPosition(viewerEvent),
        x = _mapCursorPosition2.x,
        y = _mapCursorPosition2.y;

    switch (mode) {
      case constants.MODE_DRAGGING_ITEM:
        itemsActions.updateDraggingItem(x, y);
        break;

      case constants.MODE_ROTATING_ITEM:
        itemsActions.updateRotatingItem(x, y);
        break;

      // Handle other modes as needed
    }

    viewerEvent.originalEvent.stopPropagation();
  };

  // Verify item state and transformations after double-click
  var onDoubleClick = function onDoubleClick(viewerEvent) {
    var event = viewerEvent.originalEvent;
    var elementData = extractElementData(event.target);

    if (elementData && elementData.prototype === "items") {
      // Handle double-click on item
      console.log("Double-clicked item:", elementData);
      // Ensure state and transformations are correctly updated
    }

    event.stopPropagation();
  };

  var onPointerUp = function onPointerUp(viewerEvent) {
    var event = viewerEvent.originalEvent;

    var evt = new Event("mouseup-planner-event");
    evt.viewerEvent = viewerEvent;
    document.dispatchEvent(evt);

    var _mapCursorPosition3 = mapCursorPosition(viewerEvent),
        x = _mapCursorPosition3.x,
        y = _mapCursorPosition3.y;

    switch (mode) {
      case constants.MODE_IDLE:
        var elementData = extractElementData(event.target);

        if (elementData && elementData.selected) return;

        switch (elementData ? elementData.prototype : "none") {
          case "areas":
            areaActions.selectArea(elementData.layer, elementData.id);
            break;

          case "lines":
            linesActions.selectLine(elementData.layer, elementData.id);
            break;

          case "holes":
            holesActions.selectHole(elementData.layer, elementData.id);
            break;

          case "items":
            itemsActions.selectItem(elementData.layer, elementData.id);
            break;

          case "none":
            projectActions.unselectAll();
            break;
        }
        break;

      case constants.MODE_WAITING_DRAWING_LINE:
        linesActions.beginDrawingLine(layerID, x, y, state.snapMask);
        break;

      case constants.MODE_DRAWING_LINE:
        linesActions.endDrawingLine(x, y, state.snapMask);
        linesActions.beginDrawingLine(layerID, x, y, state.snapMask);
        break;

      case constants.MODE_DRAWING_HOLE:
        holesActions.endDrawingHole(layerID, x, y);
        break;

      case constants.MODE_DRAWING_ITEM:
        itemsActions.endDrawingItem(layerID, x, y);
        break;

      case constants.MODE_DRAGGING_LINE:
        linesActions.endDraggingLine(x, y, state.snapMask);
        break;

      case constants.MODE_DRAGGING_VERTEX:
        verticesActions.endDraggingVertex(x, y, state.snapMask);
        break;

      case constants.MODE_DRAGGING_ITEM:
        itemsActions.endDraggingItem(x, y);
        break;

      case constants.MODE_DRAGGING_HOLE:
        holesActions.endDraggingHole(x, y);
        break;

      case constants.MODE_ROTATING_ITEM:
        itemsActions.endRotatingItem(x, y);
        break;
    }

    event.stopPropagation();
  };

  var onChangeValue = function onChangeValue(value) {
    var a = value.a,
        d = value.d,
        e = value.e;
    if (a == 1 && d == 1) {
      a = 0.44174275666802476;
      d = 0.44174275666802476;
      e = 21.12733766928222;
    }
    projectActions.updateZoomScale(value.a);
    return viewer2DActions.updateCameraView(_extends({}, value, { a: a, d: d, e: e }));
  };

  var onChangeTool = function onChangeTool(tool) {
    switch (tool) {
      case _reactSvgPanZoom.TOOL_NONE:
        projectActions.selectToolEdit();
        break;

      case _reactSvgPanZoom.TOOL_PAN:
        viewer2DActions.selectToolPan();
        break;

      case _reactSvgPanZoom.TOOL_ZOOM_IN:
        viewer2DActions.selectToolZoomIn();
        break;

      case _reactSvgPanZoom.TOOL_ZOOM_OUT:
        viewer2DActions.selectToolZoomOut();
        break;
    }
  };

  var _state$get$toJS = state.get("viewer2D").toJS(),
      e = _state$get$toJS.e,
      f = _state$get$toJS.f,
      SVGWidth = _state$get$toJS.SVGWidth,
      SVGHeight = _state$get$toJS.SVGHeight;

  var rulerSize = 15; //px
  var rulerUnitPixelSize = 100;
  var rulerBgColor = SharedStyle.PRIMARY_COLOR.main;
  var rulerFnColor = SharedStyle.COLORS.white;
  var rulerMkColor = SharedStyle.SECONDARY_COLOR.main;
  var sceneWidth = SVGWidth || state.getIn(["scene", "width"]);
  var sceneHeight = SVGHeight || state.getIn(["scene", "height"]);
  var sceneZoom = state.zoom || 1;
  var rulerXElements = Math.ceil(sceneWidth / rulerUnitPixelSize) + 1;
  var rulerYElements = Math.ceil(sceneHeight / rulerUnitPixelSize) + 1;

  return _react2.default.createElement(
    "div",
    {
      style: {
        margin: 0,
        padding: 0,
        display: "grid",
        gridRowGap: "0",
        gridColumnGap: "0",
        gridTemplateColumns: rulerSize + "px " + (width - rulerSize) + "px",
        gridTemplateRows: rulerSize + "px " + (height - rulerSize) + "px",
        position: "relative",
        background: "#28292d"
      }
    },
    _react2.default.createElement("div", {
      style: { gridColumn: 1, gridRow: 1, backgroundColor: rulerBgColor }
    }),
    _react2.default.createElement(
      _reactSvgPanZoom.ReactSVGPanZoom,
      {
        style: { gridColumn: 2, gridRow: 2 },
        width: width - rulerSize,
        ref: Viewer,
        height: height - rulerSize,
        value: viewer2D.isEmpty() ? null : viewer2D.toJS(),
        onChangeValue: onChangeValue,
        tool: mode2Tool(mode),
        onChangeTool: onChangeTool,
        detectAutoPan: mode2DetectAutopan(mode),
        onMouseDown: onPointerDown,
        onMouseMove: onPointerMove,
        onMouseUp: onPointerUp,
        onTouchStart: onPointerUp,
        onTouchMove: onPointerUp,
        onTouchEnd: onPointerUp,
        miniaturePosition: "none",
        toolbarPosition: "none"
      },
      _react2.default.createElement(
        "svg",
        { width: scene.width, height: scene.height },
        _react2.default.createElement(
          "defs",
          null,
          _react2.default.createElement(
            "pattern",
            {
              id: "diagonalFill",
              patternUnits: "userSpaceOnUse",
              width: "4",
              height: "4",
              fill: "#FFF"
            },
            _react2.default.createElement("rect", { x: "0", y: "0", width: "4", height: "4", fill: "#FFF" }),
            _react2.default.createElement("path", {
              d: "M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2",
              style: { stroke: "#8E9BA2", strokeWidth: 1 }
            })
          )
        ),
        _react2.default.createElement(
          "g",
          { style: Object.assign(mode2Cursor(mode), mode2PointerEvents(mode)) },
          _react2.default.createElement(_state2.default, { state: state, catalog: catalog })
        )
      )
    )
  );
}

Viewer2D.propTypes = {
  state: _propTypes2.default.object.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired
};

Viewer2D.contextTypes = {
  viewer2DActions: _propTypes2.default.object.isRequired,
  linesActions: _propTypes2.default.object.isRequired,
  holesActions: _propTypes2.default.object.isRequired,
  verticesActions: _propTypes2.default.object.isRequired,
  itemsActions: _propTypes2.default.object.isRequired,
  areaActions: _propTypes2.default.object.isRequired,
  projectActions: _propTypes2.default.object.isRequired,
  catalog: _propTypes2.default.object.isRequired
};