import React, { useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  ReactSVGPanZoom,
  TOOL_NONE,
  TOOL_PAN,
  TOOL_ZOOM_IN,
  TOOL_ZOOM_OUT,
  TOOL_AUTO,
} from "react-svg-pan-zoom";
import * as constants from "../../constants";
import State from "./state";
import * as SharedStyle from "../../shared-style";
import { RulerX, RulerY } from "./export";

function mode2Tool(mode) {
  switch (mode) {
    case constants.MODE_2D_PAN:
      return TOOL_PAN;
    case constants.MODE_2D_ZOOM_IN:
      return TOOL_ZOOM_IN;
    case constants.MODE_2D_ZOOM_OUT:
      return TOOL_ZOOM_OUT;
    case constants.MODE_IDLE:
      return TOOL_AUTO;
    default:
      return TOOL_NONE;
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
  while (
    !node.attributes.getNamedItem("data-element-root") &&
    node.tagName !== "svg"
  ) {
    node = node.parentNode;
  }
  if (node.tagName === "svg") return null;

  return {
    part: node.attributes.getNamedItem("data-part")
      ? node.attributes.getNamedItem("data-part").value
      : undefined,
    layer: node.attributes.getNamedItem("data-layer").value,
    prototype: node.attributes.getNamedItem("data-prototype").value,
    selected: node.attributes.getNamedItem("data-selected").value === "true",
    id: node.attributes.getNamedItem("data-id").value,
  };
}

export default function Viewer2D(
  { state, width, height },
  {
    viewer2DActions,
    linesActions,
    holesActions,
    verticesActions,
    itemsActions,
    areaActions,
    projectActions,
    catalog,
  }
) {
  let { viewer2D, mode, scene } = state;
  let layerID = scene.selectedLayer;

  let mapCursorPosition = ({ x, y }) => {
    return { x, y: -y + scene.height };
  };

  const Viewer = useRef(null);
  useLayoutEffect(() => {
    Viewer.current.fitToViewer();
  }, []);

  let onPointerDown = (viewerEvent) => {
    let event = viewerEvent.originalEvent;
    let { x, y } = mapCursorPosition(viewerEvent);

    if (mode === constants.MODE_IDLE) {
      let elementData = extractElementData(event.target);
      if (!elementData || !elementData.selected) return;

      switch (elementData.prototype) {
        case "items":
          if (elementData.part === "rotation-anchor") {
            itemsActions.beginRotatingItem(
              elementData.layer,
              elementData.id,
              x,
              y
            );
          } else {
            itemsActions.beginDraggingItem(
              elementData.layer,
              elementData.id,
              x,
              y
            );
          }
          break;

        // Handle other prototypes as needed
      }
    }
    event.stopPropagation();
  };

  // Ensure correct transformations during dragging
  let onPointerMove = (viewerEvent) => {
    let { x, y } = mapCursorPosition(viewerEvent);

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
  let onDoubleClick = (viewerEvent) => {
    let event = viewerEvent.originalEvent;
    let elementData = extractElementData(event.target);

    if (elementData && elementData.prototype === "items") {
      // Handle double-click on item
      console.log("Double-clicked item:", elementData);
      // Ensure state and transformations are correctly updated
    }

    event.stopPropagation();
  };

  let onPointerUp = (viewerEvent) => {
    let event = viewerEvent.originalEvent;

    let evt = new Event("mouseup-planner-event");
    evt.viewerEvent = viewerEvent;
    document.dispatchEvent(evt);

    let { x, y } = mapCursorPosition(viewerEvent);

    switch (mode) {
      case constants.MODE_IDLE:
        let elementData = extractElementData(event.target);

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

  let onChangeValue = (value) => {
    let a = value.a,
      d = value.d,
      e = value.e;
    if (a == 1 && d == 1) {
      a = 0.44174275666802476;
      d = 0.44174275666802476;
      e = 21.12733766928222;
    }
    projectActions.updateZoomScale(value.a);
    return viewer2DActions.updateCameraView({ ...value, a, d, e });
  };

  let onChangeTool = (tool) => {
    switch (tool) {
      case TOOL_NONE:
        projectActions.selectToolEdit();
        break;

      case TOOL_PAN:
        viewer2DActions.selectToolPan();
        break;

      case TOOL_ZOOM_IN:
        viewer2DActions.selectToolZoomIn();
        break;

      case TOOL_ZOOM_OUT:
        viewer2DActions.selectToolZoomOut();
        break;
    }
  };

  let { e, f, SVGWidth, SVGHeight } = state.get("viewer2D").toJS();
  let rulerSize = 15; //px
  let rulerUnitPixelSize = 100;
  let rulerBgColor = SharedStyle.PRIMARY_COLOR.main;
  let rulerFnColor = SharedStyle.COLORS.white;
  let rulerMkColor = SharedStyle.SECONDARY_COLOR.main;
  let sceneWidth = SVGWidth || state.getIn(["scene", "width"]);
  let sceneHeight = SVGHeight || state.getIn(["scene", "height"]);
  let sceneZoom = state.zoom || 1;
  let rulerXElements = Math.ceil(sceneWidth / rulerUnitPixelSize) + 1;
  let rulerYElements = Math.ceil(sceneHeight / rulerUnitPixelSize) + 1;

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        display: "grid",
        gridRowGap: "0",
        gridColumnGap: "0",
        gridTemplateColumns: `${rulerSize}px ${width - rulerSize}px`,
        gridTemplateRows: `${rulerSize}px ${height - rulerSize}px`,
        position: "relative",
        background: "#28292d",
      }}
    >
      <div
        style={{ gridColumn: 1, gridRow: 1, backgroundColor: rulerBgColor }}
      ></div>
      <ReactSVGPanZoom
        style={{ gridColumn: 2, gridRow: 2 }}
        width={width - rulerSize}
        ref={Viewer}
        height={height - rulerSize}
        value={viewer2D.isEmpty() ? null : viewer2D.toJS()}
        onChangeValue={onChangeValue}
        tool={mode2Tool(mode)}
        onChangeTool={onChangeTool}
        detectAutoPan={mode2DetectAutopan(mode)}
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onTouchStart={onPointerUp}
        onTouchMove={onPointerUp}
        onTouchEnd={onPointerUp}
        miniaturePosition="none"
        toolbarPosition="none"
      >
        <svg width={scene.width} height={scene.height}>
          <defs>
            <pattern
              id="diagonalFill"
              patternUnits="userSpaceOnUse"
              width="4"
              height="4"
              fill="#FFF"
            >
              <rect x="0" y="0" width="4" height="4" fill="#FFF" />
              <path
                d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2"
                style={{ stroke: "#8E9BA2", strokeWidth: 1 }}
              />
            </pattern>
          </defs>
          <g style={Object.assign(mode2Cursor(mode), mode2PointerEvents(mode))}>
            <State state={state} catalog={catalog} />
          </g>
        </svg>
      </ReactSVGPanZoom>
    </div>
  );
}

Viewer2D.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

Viewer2D.contextTypes = {
  viewer2DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  verticesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  areaActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
};
