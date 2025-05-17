import * as Three from "three";
import React from "react";

const RADIUS = 20;
const HEIGHT = 40;

export default {
  name: "tableFour",
  prototype: "items",

  info: {
    tag: ["furnishings"],
    title: "",
    description: "tableFour",
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
          viewBox="0 0 39 33"
          version="1.1"
        >
          <g id="surface1">
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                // fill: "rgb(100%,84.313725%,86.666667%)",
                fillOpacity: "1",
              }}
              d="M 19.5 7.488281 C 12.847656 7.488281 7.4375 12.976562 7.4375 19.71875 L 7.4375 31.519531 L 31.5625 31.519531 L 31.5625 19.71875 C 31.5625 12.976562 26.152344 7.488281 19.5 7.488281 Z M 19.5 7.488281 "
            />
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "rgb(0%,0%,0%)",
                fillOpacity: "1",
              }}
              d="M 19.5 0.015625 C 8.746094 0.015625 0 9.269531 0 20.648438 C 0 21.148438 0.398438 21.550781 0.890625 21.550781 C 1.382812 21.550781 1.78125 21.144531 1.78125 20.648438 C 1.78125 10.265625 9.730469 1.820312 19.5 1.820312 C 29.265625 1.820312 37.214844 10.265625 37.214844 20.648438 C 37.214844 21.148438 37.613281 21.550781 38.105469 21.550781 C 38.597656 21.550781 38.996094 21.144531 38.996094 20.648438 C 39 9.269531 30.253906 0.015625 19.5 0.015625 Z M 19.5 0.015625 "
            />
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "rgb(0%,0%,0%)",
                fillOpacity: "1",
              }}
              d="M 19.5 6.019531 C 12.042969 6.019531 5.980469 12.171875 5.980469 19.71875 L 5.980469 32.984375 L 33.007812 32.984375 L 33.007812 19.71875 C 33.007812 12.171875 26.941406 6.019531 19.5 6.019531 Z M 31.230469 31.179688 L 7.773438 31.179688 L 7.773438 19.71875 C 7.773438 13.164062 13.035156 7.824219 19.5 7.824219 C 25.964844 7.824219 31.230469 13.160156 31.230469 19.71875 Z M 31.230469 31.179688 "
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
