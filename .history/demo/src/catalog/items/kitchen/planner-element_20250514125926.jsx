import * as Three from "three";
import React from "react";

const RADIUS = 20;
const HEIGHT = 40;

export default {
  name: "onetableradus",
  prototype: "items",

  info: {
    tag: ["furnishings"],
    title: "",
    description: "onetableradus",
    image: require("./oneTable.png"),
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
    const WIDTH = 150;
    const DEPTH = 160;
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
          id="Layer_2"
          data-name="Layer 2"
          xmlns="http://www.w3.org/2000/svg"
          fill="#964B00"
        >
          <g id="Furniture">
            <path
              className="cls-1"
              d="m104.08,29.34c-6.95-13.05-18.54-22.6-32.64-26.9-5.28-1.62-10.73-2.44-16.2-2.44-9.1,0-17.82,2.19-25.92,6.51C16.31,13.46,6.76,25.05,2.43,39.17c-4.3,14.16-2.86,29.12,4.08,42.11,6.97,13.06,18.56,22.61,32.65,26.89,5.33,1.63,10.78,2.43,16.2,2.43,8.94,0,17.8-2.2,25.93-6.52,13.04-6.94,22.59-18.54,26.89-32.64,4.31-14.1,2.86-29.06-4.09-42.11Z"
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
