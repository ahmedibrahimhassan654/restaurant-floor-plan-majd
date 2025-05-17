"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Item;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIf = require("../../utils/react-if");

var _reactIf2 = _interopRequireDefault(_reactIf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE_LINE = {
  fill: "#0096fd",
  stroke: "#0096fd"
};

var STYLE_CIRCLE = {
  fill: "#0096fd",
  stroke: "#0096fd",
  cursor: "ew-resize"
};

var STYLE_CIRCLE2 = {
  fill: "none",
  stroke: "#0096fd",
  cursor: "ew-resize"
};

function Item(_ref) {
  var layer = _ref.layer,
      item = _ref.item,
      scene = _ref.scene,
      catalog = _ref.catalog;
  var x = item.x,
      y = item.y,
      rotation = item.rotation;


  var renderedItem = catalog.getElement(item.type).render2D(item, layer, scene);
  // console.log("item", item);
  var orders = localStorage.getItem("orders");
  console.log("orders", orders.includes("LY2KCi7yu"));
  return _react2.default.createElement(
    "g",
    {
      "data-element-root": true,
      "data-prototype": item.prototype,
      "data-id": item.id,
      "data-fill": item.id,
      "data-selected": item.selected,
      "data-layer": layer.id,
      className: "" + (orders.includes(item.id) ? "is_order" : "not_order"),
      style: item.selected ? { cursor: "move", fill: "#ddd" } : orders.includes(item.id) ? { fill: "#fd4040" } : { fill: "#b9ddd6" },
      transform: "translate(" + x + "," + y + ") rotate(" + rotation + ")"
    },
    renderedItem,
    _react2.default.createElement(
      _reactIf2.default,
      { condition: item.selected },
      _react2.default.createElement(
        "g",
        {
          "data-element-root": true,
          "data-prototype": item.prototype,
          "data-id": item.id,
          "data-fill": item.id,
          "data-selected": item.selected,
          "data-layer": layer.id,
          "data-part": "rotation-anchor"
        },
        _react2.default.createElement("circle", { cx: "0", cy: "150", r: "10", style: STYLE_CIRCLE }),
        _react2.default.createElement("circle", { cx: "0", cy: "0", r: "150", style: STYLE_CIRCLE2 })
      )
    )
  );
}

Item.propTypes = {
  item: _propTypes2.default.object.isRequired,
  layer: _propTypes2.default.object.isRequired,
  scene: _propTypes2.default.object.isRequired,
  catalog: _propTypes2.default.object.isRequired
};