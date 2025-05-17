import * as Three from "three";
import React from "react";
import { Button } from "@mui/material";

const RADIUS = 20;
const HEIGHT = 40;

export default {
  name: "table-with-one",
  prototype: "items",

  info: {
    tag: ["furnishings"],
    title: "Sofa",
    description: "table-with-one",
    image: require("./oneTable.png"),
  },

  properties: {
    width: {
      label: "width",
      type: "length-measure",
      defaultValue: {
        length: 300,
        unit: "cm",
      },
    },
    depth: {
      label: "depth",
      type: "length-measure",
      defaultValue: {
        length: 200,
        unit: "cm",
      },
    },
    height: {
      label: "height",
      type: "length-measure",
      defaultValue: {
        length: 80,
        unit: "cm",
      },
    },
    altitude: {
      label: "altitude",
      type: "length-measure",
      defaultValue: {
        length: 0,
        unit: "cm",
      },
    },
  },
  render2D: function (element, layer, scene) {
    let angle = element.rotation + 90;
    // const WIDTH = 150;
    // const DEPTH = 160;
    const HEIGHT = 50;
    let textRotation = 0;
    if (Math.sin((angle * Math.PI) / 180) < 0) {
      textRotation = 180;
    }
    let WIDTH = element.properties.get("width").get("length");
    let DEPTH = element.properties.get("depth").get("length");

    return (
      <g
        transform={`translate(${-WIDTH / 2},${-DEPTH / 2})`}
        // onClick={() => alert(`hoiiiiiiii ${element.id}`)}
      >
        <span>{element.name}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={WIDTH}
          height={DEPTH}
          viewBox="0 0 199 150"
          version="1.1"
          fill="#964B00"
        >
          <g id="surface1">
            <path
              className="order_table"
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "rgb(62.352941%,53.333333%,43.529412%)",
                fillOpacity: "1",
              }}
              d="M 75.773438 70.359375 L 141.582031 70.359375 L 141.582031 115.019531 L 75.773438 115.019531 Z M 75.773438 70.359375 "
            />
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "rgb(64.313725%,65.490196%,72.54902%)",
                fillOpacity: "1",
              }}
              d="M 12.09375 117.714844 C 12.09375 125.136719 14.390625 137.765625 29.765625 139.027344 L 49.488281 139.027344 L 49.488281 100.523438 L 12.09375 100.523438 Z M 12.09375 117.714844 "
            />
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "rgb(64.313725%,65.490196%,72.54902%)",
                fillOpacity: "1",
              }}
              d="M 29.105469 140.726562 C 17.167969 139.539062 10.316406 131.179688 10.316406 117.714844 L 10.316406 100.523438 L 2.144531 100.523438 L 2.144531 121.367188 C 2.144531 136.058594 14.050781 148 28.699219 148 L 49.484375 148 L 49.484375 140.792969 L 29.101562 140.792969 L 29.101562 140.722656 Z M 29.105469 140.726562 "
            />
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "rgb(64.313725%,65.490196%,72.54902%)",
                fillOpacity: "1",
              }}
              d="M 2.144531 51.25 L 10.316406 51.25 L 10.316406 98.75 L 2.144531 98.75 Z M 2.144531 51.25 "
            />
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "rgb(64.313725%,65.490196%,72.54902%)",
                fillOpacity: "1",
              }}
              d="M 12.09375 51.25 L 49.488281 51.25 L 49.488281 98.75 L 12.09375 98.75 Z M 12.09375 51.25 "
            />
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "rgb(64.313725%,65.490196%,72.54902%)",
                fillOpacity: "1",
              }}
              d="M 12.09375 32.285156 L 12.09375 49.476562 L 49.488281 49.476562 L 49.488281 10.953125 L 29.765625 10.953125 C 14.390625 12.214844 12.09375 24.847656 12.09375 32.285156 Z M 12.09375 32.285156 "
            />
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "rgb(64.313725%,65.490196%,72.54902%)",
                fillOpacity: "1",
              }}
              d="M 2.144531 28.609375 L 2.144531 49.472656 L 10.316406 49.472656 L 10.316406 32.277344 C 10.316406 18.789062 17.160156 10.453125 29.105469 9.25 L 29.105469 9.175781 L 49.488281 9.175781 L 49.488281 1.992188 L 28.703125 1.992188 C 14.054688 1.992188 2.144531 13.933594 2.144531 28.609375 Z M 2.144531 28.609375 "
            />
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "rgb(64.313725%,65.490196%,72.54902%)",
                fillOpacity: "1",
              }}
              d="M 51.257812 1.992188 L 98.613281 1.992188 L 98.613281 9.179688 L 51.257812 9.179688 Z M 51.257812 1.992188 "
            />
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "rgb(64.313725%,65.490196%,72.54902%)",
                fillOpacity: "1",
              }}
              d="M 51.257812 10.953125 L 98.613281 10.953125 L 98.613281 49.476562 L 51.257812 49.476562 Z M 51.257812 10.953125 "
            />
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "rgb(64.313725%,65.490196%,72.54902%)",
                fillOpacity: "1",
              }}
              d="M 100.382812 10.953125 L 147.71875 10.953125 L 147.71875 49.476562 L 100.382812 49.476562 Z M 100.382812 10.953125 "
            />
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "rgb(64.313725%,65.490196%,72.54902%)",
                fillOpacity: "1",
              }}
              d="M 100.382812 1.992188 L 147.71875 1.992188 L 147.71875 9.179688 L 100.382812 9.179688 Z M 100.382812 1.992188 "
            />
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "rgb(64.313725%,65.490196%,72.54902%)",
                fillOpacity: "1",
              }}
              d="M 170.296875 1.992188 L 149.492188 1.992188 L 149.492188 9.179688 L 169.894531 9.179688 L 169.894531 9.253906 C 181.832031 10.460938 188.683594 18.804688 188.683594 32.285156 L 188.683594 49.476562 L 196.855469 49.476562 L 196.855469 28.613281 C 196.855469 13.941406 184.949219 2 170.300781 2 Z M 170.296875 1.992188 "
            />
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "rgb(64.313725%,65.490196%,72.54902%)",
                fillOpacity: "1",
              }}
              d="M 169.234375 10.953125 L 149.492188 10.953125 L 149.492188 49.476562 L 186.90625 49.476562 L 186.90625 32.285156 C 186.90625 24.851562 184.609375 12.214844 169.234375 10.953125 Z M 169.234375 10.953125 "
            />
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "rgb(0%,0%,0%)",
                fillOpacity: "1",
              }}
              d="M 73.785156 117.011719 L 143.578125 117.011719 L 143.578125 68.359375 L 73.785156 68.359375 Z M 141.363281 70.582031 L 141.363281 114.796875 L 76 114.796875 L 76 70.582031 Z M 141.363281 70.582031 "
            />
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "rgb(0%,0%,0%)",
                fillOpacity: "1",
              }}
              d="M 170.296875 0 L 28.699219 0 C 12.964844 0 0.15625 12.832031 0.15625 28.609375 L 0.15625 121.367188 C 0.15625 137.15625 12.964844 149.992188 28.699219 149.992188 L 51.476562 149.992188 L 51.476562 51.472656 L 198.84375 51.472656 L 198.84375 28.609375 C 198.84375 12.832031 186.035156 0 170.296875 0 Z M 170.113281 9.050781 L 170.113281 8.953125 L 149.710938 8.953125 L 149.710938 2.21875 L 170.296875 2.21875 C 184.816406 2.21875 196.628906 14.0625 196.628906 28.613281 L 196.628906 49.257812 L 188.894531 49.257812 L 188.894531 32.285156 C 188.894531 18.804688 182.054688 10.34375 170.113281 9.050781 Z M 186.6875 32.285156 L 186.6875 49.257812 L 149.710938 49.257812 L 149.710938 11.175781 L 169.214844 11.175781 C 184.414062 12.421875 186.6875 24.9375 186.6875 32.285156 Z M 147.503906 11.175781 L 147.503906 49.25 L 100.605469 49.25 L 100.605469 11.175781 Z M 147.503906 2.214844 L 147.503906 8.953125 L 100.605469 8.953125 L 100.605469 2.21875 L 147.503906 2.21875 Z M 98.398438 11.175781 L 98.398438 49.25 L 51.484375 49.25 L 51.484375 11.175781 Z M 98.398438 2.214844 L 98.398438 8.953125 L 51.484375 8.953125 L 51.484375 2.21875 L 98.398438 2.21875 Z M 2.371094 98.527344 L 2.371094 51.472656 L 10.105469 51.472656 L 10.105469 98.527344 Z M 49.269531 51.472656 L 49.269531 98.527344 L 12.3125 98.527344 L 12.3125 51.472656 Z M 28.886719 140.929688 L 28.886719 141.019531 L 49.269531 141.019531 L 49.269531 147.78125 L 28.703125 147.78125 C 14.183594 147.78125 2.371094 135.929688 2.371094 121.367188 L 2.371094 100.742188 L 10.105469 100.742188 L 10.105469 117.710938 C 10.105469 131.203125 16.945312 139.652344 28.894531 140.921875 Z M 49.269531 100.742188 L 49.269531 138.800781 L 29.785156 138.800781 C 14.585938 137.558594 12.316406 125.050781 12.316406 117.710938 L 12.316406 100.742188 L 49.273438 100.742188 Z M 28.699219 2.21875 L 49.261719 2.21875 L 49.261719 8.960938 L 28.882812 8.960938 L 28.882812 9.058594 C 16.941406 10.347656 10.09375 18.804688 10.09375 32.289062 L 10.09375 49.265625 L 2.371094 49.265625 L 2.371094 28.621094 C 2.371094 14.054688 14.183594 2.21875 28.699219 2.21875 Z M 49.261719 11.179688 L 49.261719 49.257812 L 12.3125 49.257812 L 12.3125 32.285156 C 12.3125 24.9375 14.582031 12.421875 29.761719 11.175781 L 49.261719 11.175781 Z M 49.261719 11.179688 "
            />
          </g>
        </svg>
        <rect
          key="1"
          x="0"
          y="0"
          width={WIDTH + 30}
          height={DEPTH + 30}
          style={{
            stroke: element.selected ? "#0096fd" : "transparent",
            strokeWidth: "2px",
            fill: "transparent",
          }}
        />
        <text
          style={{ transform: "rotateX(180deg)" }}
          transform="rotateX(180deg)"
          fill="#fff"
          fontWeight={"bold"}
          fontSize={50}
          x={135}
          y={-105}
          width={"100"}
        >
          {/* 15 */}
          {element.name}
        </text>
      </g>
    );
  },

  render3D: function (element, layer, scene) {
    let newAltitude = element.properties.get("altitude").get("length");

    var grey = new Three.MeshLambertMaterial({ color: 0xdddddd });
    grey.side = Three.DoubleSide;

    var cestino = new Three.Object3D();

    var cylinderGeometry1 = new Three.CylinderGeometry(0.25, 0.25, 0.0001, 80);
    var p1 = new Three.Mesh(cylinderGeometry1, grey);
    cestino.add(p1);

    var cylinderGeometry2 = new Three.CylinderGeometry(
      0.3,
      0.25,
      0.002,
      80,
      80,
      true
    );
    var p2 = new Three.Mesh(cylinderGeometry2, grey);
    p2.position.set(0, 0.001, 0);
    p1.add(p2);

    let value = new Three.Box3().setFromObject(cestino);

    let deltaX = Math.abs(value.max.x - value.min.x);
    let deltaY = Math.abs(value.max.y - value.min.y);
    let deltaZ = Math.abs(value.max.z - value.min.z);

    if (element.selected) {
      let bbox = new Three.BoxHelper(cestino, 0x99c3fb);
      bbox.material.linewidth = 5;
      bbox.renderOrder = 100;
      bbox.material.depthTest = false;
      cestino.add(bbox);
    }

    cestino.position.y += HEIGHT / 16 + newAltitude;
    cestino.scale.set(
      (1.5 * RADIUS) / deltaX,
      HEIGHT / deltaY,
      (1.5 * RADIUS) / deltaZ
    );

    return Promise.resolve(cestino);
  },
};
