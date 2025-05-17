import * as Three from "three";
import React from "react";

const RADIUS = 20;
const HEIGHT = 40;

export default {
  name: "one_cher_s",
  prototype: "items",

  info: {
    tag: ["furnishings"],
    title: "",
    description: "one_cher_s",
    image: require("./oneChar.png"),
  },

  properties: {
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
    const WIDTH = 120;
    const DEPTH = 120;
    const HEIGHT = 50;
    let textRotation = 0;
    if (Math.sin((angle * Math.PI) / 180) < 0) {
      textRotation = 180;
    }

    return (
      <g transform={`translate(${-WIDTH / 2},${-DEPTH / 2})`}>
        <rect
          key="1"
          x="-20"
          y="-20"
          width={WIDTH}
          height={DEPTH}
          style={{
            stroke: element.selected ? "#0096fd" : "transparent",
            strokeWidth: "2px",
            fill: "transparent",
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80px"
          height="80px"
          fill="#964B00"
          viewBox="0 0 40 44"
          version="1.1"
        >
          <g id="surface1">
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",

                fillOpacity: "1",
              }}
              d="M 5.835938 1.476562 L 34.164062 1.476562 L 34.164062 7.847656 L 5.835938 7.847656 Z M 5.835938 1.476562 "
            />
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",

                fillOpacity: "1",
              }}
              d="M 35.363281 14.808594 L 38.453125 14.808594 L 38.453125 35.359375 L 35.363281 35.359375 Z M 35.363281 14.808594 "
            />
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",

                fillOpacity: "1",
              }}
              d="M 5.835938 35.34375 C 5.835938 39.300781 9.078125 42.519531 13.058594 42.519531 L 26.941406 42.519531 C 30.921875 42.519531 34.164062 39.300781 34.164062 35.34375 L 34.164062 14.808594 L 5.835938 14.808594 Z M 5.835938 35.34375 "
            />
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",

                fillOpacity: "1",
              }}
              d="M 1.53125 14.808594 L 4.636719 14.808594 L 4.636719 35.359375 L 1.53125 35.359375 Z M 1.53125 14.808594 "
            />
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "rgb(0%,0%,0%)",
                fillOpacity: "1",
              }}
              d="M 20.9375 13.332031 L 20.9375 9.324219 L 35.644531 9.324219 L 35.644531 0 L 4.355469 0 L 4.355469 9.324219 L 19.0625 9.324219 L 19.0625 13.335938 L 0.0664062 13.335938 L 0.0664062 36.835938 L 4.496094 36.835938 C 5.214844 40.90625 8.769531 44.003906 13.058594 44.003906 L 26.941406 44.003906 C 31.230469 44.003906 34.785156 40.910156 35.503906 36.835938 L 39.933594 36.835938 L 39.933594 13.332031 Z M 4.246094 34.96875 L 1.925781 34.96875 L 1.925781 15.199219 L 4.246094 15.199219 Z M 6.230469 7.460938 L 6.230469 1.867188 L 33.773438 1.867188 L 33.773438 7.460938 L 6.226562 7.460938 Z M 33.773438 35.339844 C 33.773438 39.085938 30.71875 42.132812 26.941406 42.132812 L 13.0625 42.132812 C 9.289062 42.132812 6.230469 39.085938 6.230469 35.339844 L 6.230469 15.199219 L 33.777344 15.199219 L 33.777344 35.34375 Z M 38.0625 34.964844 L 35.753906 34.964844 L 35.753906 15.199219 L 38.0625 15.199219 L 38.0625 34.96875 Z M 38.0625 34.964844 "
            />
          </g>
        </svg>
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
