import React from "react";
import PropTypes from "prop-types";
import If from "../../utils/react-if";

const STYLE_LINE = {
  fill: "#0096fd",
  stroke: "#0096fd",
};

const STYLE_CIRCLE = {
  fill: "#0096fd",
  stroke: "#0096fd",
  cursor: "ew-resize",
};

const STYLE_CIRCLE2 = {
  fill: "none",
  stroke: "#0096fd",
  cursor: "ew-resize",
};

export default function Item({ layer, item, scene, catalog }) {
  let { x, y, rotation } = item;

  // Add a check to see if the item type exists in the catalog
  let renderedItem = null;
  try {
    if (catalog.hasElement(item.type)) {
      renderedItem = catalog.getElement(item.type).render2D(item, layer, scene);
    } else {
      console.warn(`Element ${item.type} does not exist in catalog`);
      // Render a placeholder for missing elements
      renderedItem = (
        <g>
          <rect width="50" height="50" fill="#f0ad4e" stroke="#000" strokeWidth="2" />
          <text x="25" y="25" textAnchor="middle" dominantBaseline="middle" fill="#000">
            Missing: {item.type}
          </text>
        </g>
      );
    }
  } catch (error) {
    console.error(`Error rendering item ${item.type}:`, error);
    // Fallback rendering for error cases
    renderedItem = (
      <g>
        <rect width="50" height="50" fill="#d9534f" stroke="#000" strokeWidth="2" />
        <text x="25" y="25" textAnchor="middle" dominantBaseline="middle" fill="#fff">
          Error
        </text>
      </g>
    );
  }

  // console.log("item", item);
  const orders = localStorage.getItem("orders");
  console.log("orders", orders && orders.includes("LY2KCi7yu"));
  return (
    <g
      data-element-root
      data-prototype={item.prototype}
      data-id={item.id}
      data-fill={item.id}
      data-selected={item.selected}
      data-layer={layer.id}
      className={`${orders && orders.includes(item.id) ? "is_order" : "not_order"}`}
      style={
        item.selected
          ? { cursor: "move", fill: "#ddd" }
          : orders && orders.includes(item.id)
          ? { fill: "#fd4040" }
          : { fill: "#b9ddd6" }
      }
      transform={`translate(${x},${y}) rotate(${rotation})`}
    >
      {renderedItem}
      <If condition={item.selected}>
        <g
          data-element-root
          data-prototype={item.prototype}
          data-id={item.id}
          data-fill={item.id}
          data-selected={item.selected}
          data-layer={layer.id}
          data-part="rotation-anchor"
        >
          <circle cx="0" cy="150" r="10" style={STYLE_CIRCLE} />
          <circle cx="0" cy="0" r="150" style={STYLE_CIRCLE2} />
        </g>
      </If>
    </g>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
  scene: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
};
